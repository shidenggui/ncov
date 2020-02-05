import { LocalStorage } from '../../infrastructure/storage/local-storage';
import { Travel } from '../value-objects/travel';
import { CloudService } from '../../infrastructure/requests/cloud';

export class TravelRepository {
  static TRAVELS_KEY = 'travels'

  static list() {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    return rawTravels.map(t => new Travel(t))
  }

  static replaceAll(travels) {
    LocalStorage.setJson(this.TRAVELS_KEY, travels)
  }

  static create(travel) {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    rawTravels = [travel, ...rawTravels]
    LocalStorage.setJson(this.TRAVELS_KEY, rawTravels)
  }

  static delete(travel) {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    rawTravels = rawTravels.filter(t => t.place !== travel.place)
    LocalStorage.setJson(this.TRAVELS_KEY, rawTravels)
  }

  static async subscriptions() {
    let rawTravels = await CloudService.travelSubscriptions()
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
    let result = await CloudService.isTravelSubscribed(travel)
    console.log(result)
    return result
  }
}
