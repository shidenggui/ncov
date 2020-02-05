// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 订阅行程
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const notifyHistoryCollection = cloud.database().collection('notify_history')

  const {data: history} = await notifyHistoryCollection.where({
    userId: openid
  }).orderBy('createdAt', 'desc').get()

  return {
    results: history,
  }
}
