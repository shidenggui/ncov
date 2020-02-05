// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 查询是否订阅行程
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const travelsCollection = cloud.database().collection('travels')

  const searchConditions = {
    userId: openid,
    place: event.place
  }
  const {total} = await travelsCollection.where(searchConditions).count()

  return {
    subscribed: Boolean(total)
  }
}
