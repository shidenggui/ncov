import { TravelRepository } from '../repositories/travel';
import { PermissionService } from '../../permissions/permission';
import { SubscriptionRepository } from '../repositories/subscription';

export class TravelService {
  static TRAVELS_KEY = 'travels'
  static MAX_SEARCH_HISTORY = 10

  static create(createdTravel) {
    let travels = TravelRepository.list()

    // if createdTravel already exists, move it to head
    travels = travels.filter(t => t.place !== createdTravel.place)
    travels = [createdTravel, ...travels].slice(0, this.MAX_SEARCH_HISTORY)

    TravelRepository.replaceAll(travels)
    return travels
  }

  static async subscribe(travel) {
    await PermissionService.requireSubscribe()
    await SubscriptionRepository.subscribe(travel)
  }
}
