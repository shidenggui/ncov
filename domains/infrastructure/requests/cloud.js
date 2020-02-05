export class CloudService {
  static callFunction(name, params) {
    return wx.cloud.callFunction({
      name: name,
      data: params
    }).then(r => r.result)
  }

  static subscribeTravel(travel) {
    return this.callFunction('subscribeTravel', travel)
  }

  static unsubscribeTravel(travel) {
    return this.callFunction('unsubscribeTravel', travel)
  }

  static isTravelSubscribed(travel) {
    return this.callFunction('isTravelSubscribed', travel)
  }

  static travelSubscriptions() {
    return this.callFunction('travelSubscriptions')
  }

  static notifyHistory() {
    return this.callFunction('notifyHistory')
  }
}
