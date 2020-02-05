// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const PATIENT_TRAVELS_API = 'https://2019ncov.nosugartech.com/data.json'
const DATE_LENGTH = 10
const MAX_RECORD_LIMIT = 1000
const MAX_TEMPLATE_MESSAGE = 20
const SUBSCRIPTIONS_PAGE = '/pages/subscriptions'
const SUBSCRIPTION_TEMPLATE_ID = 'MCzQFLhTOFQuyfzKtzTKqw8pfPulOSQlhC7EIWa40g0'

async function fetchPatientTravels() {
  const response = await axios.get(PATIENT_TRAVELS_API)
  return response.data.data
}

class NotifyService {
  constructor(cloud, travelsCollection) {
    this.cloud = cloud
    this.travelsCollection = travelsCollection
  }

  async notifyBySubscriptions(subscriptions, patientTravelsMap) {
    // Convert subscription to place => subscription map
    const subscriptionMap = new Map();
    for (const subscription of subscriptions) {
      const key = subscription.place.toLowerCase()
      if (!subscriptionMap.has(key)) subscriptionMap.set(key, [])
      subscriptionMap.get(key).push(subscription)
    }

    // Notify subscribers
    const tasks = []
    for (const subscribedPlace of subscriptionMap.keys()) {
      for (const patientPlace of patientTravelsMap.keys()) {
        if (patientPlace.includes(subscribedPlace)) {
          for (const subscription of subscriptionMap.get(subscribedPlace)) {
            tasks.push(this.notifySubscriber(subscription, patientTravelsMap.get(patientPlace)))
          }
        }
      }
    }
    await Promise.all(tasks)
  }

  async notifySubscriber(subscription, patientTravel) {
    try {
      await this._sendTemplateMessage(subscription, patientTravel)
    } catch (e) {
      console.log(e)
      return
    }

    this.travelsCollection.where({
      userId: subscription.userId,
      place: subscription.place
    }).update({
      data: {
        notifiedAt: new Date()
      }
    })
  }

  // 发送订阅消息
  async _sendTemplateMessage(subscription, patientTravel) {
    const templateData = {
      thing1: {
        value: `${subscription.place.toUpperCase()} 发生疫情`
      },
      time2: {
        value: new Date(patientTravel.t_date).toISOString().replace('T', ' ').slice(0, 19)
      },
      thing3: {
        value: this._constructNotifyDetail(patientTravel)
      }
    }

    await this.cloud.openapi.subscribeMessage.send({
      touser: subscription.userId,
      page: SUBSCRIPTIONS_PAGE,
      data: templateData,
      templateId: SUBSCRIPTION_TEMPLATE_ID,
    });
  }

  _constructNotifyDetail(patientTravel) {
    let detail = ''
    if (patientTravel.t_pos_start)
      detail += patientTravel.t_pos_start + '-' + patientTravel.t_pos_end + ' '

    if (patientTravel.t_no_sub)
      detail += patientTravel.t_no_sub + ' '

    detail += patientTravel.t_memo
    return detail ? detail.slice(0, MAX_TEMPLATE_MESSAGE) : '无'
  }


}

// 根据患病患者行程通知订阅用户
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const travelsCollection = db.collection('travels')

  // Fetch today patient travels
  const now = new Date()
  const today = now.toISOString().slice(0, DATE_LENGTH)
  let patientTravels = await fetchPatientTravels()
  patientTravels = patientTravels.filter(t => t.created_at.replace('/', '-').slice(0, DATE_LENGTH) >= today)

  // Convert to place => travel map
  const patientTravelsMap = new Map();
  for (const patientTravel of patientTravels) {
    patientTravelsMap.set(patientTravel.t_no.toLowerCase(), patientTravel)
  }


  // Notify User
  const notifyService = new NotifyService(cloud, travelsCollection)
  const {total} = await travelsCollection.count()
  const batch = Math.ceil(total / 1000)
  for (let i = 0; i < batch; i++) {
    const {data: subscriptions} = await travelsCollection.skip(i * MAX_RECORD_LIMIT).limit(MAX_RECORD_LIMIT).get()
    await notifyService.notifyBySubscriptions(subscriptions, patientTravelsMap)
  }
}
