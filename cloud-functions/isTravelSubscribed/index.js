// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 查询是否订阅行程
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const subscriptionCollection = cloud.database().collection('subscriptions')

  const searchConditions = {
    userId: openid,
    place: event.place
  }
  const {total} = await subscriptionCollection.where(searchConditions).count()

  return {
    subscribed: Boolean(total)
  }
}
