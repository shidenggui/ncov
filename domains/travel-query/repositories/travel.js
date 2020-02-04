import { LocalStorage } from '../../infrastructure/storage/local-storage';
import { Travel } from '../value-objects/travel';

export class TravelRepository {
  static TRAVELS_KEY = 'travels'

  static list() {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    return rawTravels.map(t => new Travel(t))
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
}
