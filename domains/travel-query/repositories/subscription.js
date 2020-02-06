import { CloudService } from '../../infrastructure/requests/cloud';
import { Travel } from '../value-objects/travel';

export class SubscriptionRepository {
  static async subscriptions() {
    let {results: rawTravels} = await CloudService.travelSubscriptions()
    console.log(rawTravels)
    return rawTravels.map(t => new Travel({place: t.place}))
  }

  static async subscribe(travel) {
    let result = await CloudService.subscribeTravel(travel)
    console.log(result)
  }

  static async unsubscribe(travel) {
    let result = await CloudService.unsubscribeTravel(travel)
    console.log(result)
  }

  static async isSubscribed(travel) {
    let {subscribed} = await CloudService.isTravelSubscribed(travel)
    return subscribed
  }

  static async notifyHistory() {
    let {results: history} = await CloudService.notifyHistory()
    console.log(history)
    return history.map(h => new Travel({place: h.place}))
  }
}
