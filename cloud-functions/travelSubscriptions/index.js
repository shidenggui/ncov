// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 获取用户所有订阅
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const subscriptionCollection = cloud.database().collection('subscriptions')

  const searchConditions = {
    userId: openid,
  }
  const {data: subscriptions} = await subscriptionCollection.where(searchConditions).orderBy('createdAt', 'desc').get()

  return {
    results: subscriptions,
  }
}
