// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 订阅行程
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const subscriptionCollection = cloud.database().collection('subscriptions')

  const deleteConditions = {
    userId: openid,
    place: event.place
  }
  const result = await subscriptionCollection.where(deleteConditions).remove()

  return {
    result,
  }
}
