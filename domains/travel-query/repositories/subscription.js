// 订阅相关数据的存储层
import { CloudService } from '../../infrastructure/requests/cloud';
import { Travel } from '../value-objects/travel';

export class SubscriptionRepository {
  // 获取订阅记录
  static async subscriptions() {
    let {results: rawTravels} = await CloudService.travelSubscriptions()
    console.log(rawTravels)
    return rawTravels.map(t => new Travel({place: t.place}))
  }

  // 订阅对应的行程通知
  static async subscribe(travel) {
    let result = await CloudService.subscribeTravel(travel)
    console.log(result)
  }

  // 取消订阅对应的行程
  static async unsubscribe(travel) {
    let result = await CloudService.unsubscribeTravel(travel)
    console.log(result)
  }

  // 查询行程是否订阅
  static async isSubscribed(travel) {
    let {subscribed} = await CloudService.isTravelSubscribed(travel)
    return subscribed
  }

  // 获取历史订阅通知
  static async notifyHistory() {
    let {results: history} = await CloudService.notifyHistory()
    console.log(history)
    return history.map(h => new Travel({place: h.place}))
  }
}
