export class LocalStorage {
  static set(key, data) {
    uni.setStorageSync(key, data)
  }

  static get(key) {
    return uni.getStorageSync(key)
  }

  static setJson(key, data) {
    uni.setStorageSync(key, JSON.stringify(data))
  }

  static getJson(key) {
    try {
      return JSON.parse(uni.getStorageSync(key))
    } catch (e) {
      console.log('GetJson from LocalStorage error')
      console.log(e)
      return []
    }
  }
}
