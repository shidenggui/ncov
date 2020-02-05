// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


// 订阅行程
exports.main = async (event, context) => {
  const {OPENID: openid} = cloud.getWXContext()
  const subscriptionCollection = cloud.database().collection('subscriptions')

  const createConditions = {
    userId: openid,
    place: event.place
  }

  let result = null;
  const {total} = await subscriptionCollection.where(createConditions).count()
  if (!total) {
    result = await subscriptionCollection.add({
      data: {
        ...createConditions,
        createdAt: new Date(),
      }
    })
  }

  return {
    result,
    openid: openid
  }
}
