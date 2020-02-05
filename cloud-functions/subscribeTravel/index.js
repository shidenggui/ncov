// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 订阅行程
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const travelsCollection = cloud.database().collection('travels')

  const createConditions = {
    userId: openid,
    place: event.place
  }

  let result = null;
  const {total} = await travelsCollection.where(createConditions).count()
  if (!total) {
    const now = new Date()
    result = await travelsCollection.add({
      data: {
        ...createConditions,
        createdAt: now,
        notifiedAt: now,
      }
    })
  }

  return {
    result,
    openid: openid
  }
}
