import { TravelRepository } from '../repositories/travel';

export class TravelService {
  static TRAVELS_KEY = 'travels'


  static create(createdTravel) {
    let exists = false
    let travels = TravelRepository.list()
    if (travels.filter(t => t.place === createdTravel.place).length) {
      exists = true
      TravelRepository.delete(createdTravel)
    }


    TravelRepository.create(createdTravel)
    return [exists, TravelRepository.list()]
  }
}
