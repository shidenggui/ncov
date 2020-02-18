// 用户查询行程的存储层
import { LocalStorage } from '../../infrastructure/storage/local-storage';
import { Travel } from '../value-objects/travel';

export class TravelRepository {
  static TRAVELS_KEY = 'travels'

  // 获取用户查询过的所有行程
  static list() {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    return rawTravels.map(t => new Travel(t))
  }

  // 设置用户查询的历史行程
  static replaceAll(travels) {
    LocalStorage.setJson(this.TRAVELS_KEY, travels)
  }

  // 创建查询行程
  static create(travel) {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    rawTravels = [travel, ...rawTravels]
    LocalStorage.setJson(this.TRAVELS_KEY, rawTravels)
  }

  // 删除查询行程
  static delete(travel) {
    let rawTravels = LocalStorage.getJson(this.TRAVELS_KEY)
    rawTravels = rawTravels.filter(t => t.place !== travel.place)
    LocalStorage.setJson(this.TRAVELS_KEY, rawTravels)
  }
}
