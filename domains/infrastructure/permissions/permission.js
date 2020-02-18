import { SUBSCRIPTION_TEMPLATE_ID } from '../../../settings';

export class PermissionService {
  static async requireSubscribe() {
    // if permission has acquired
    if (await this._hasAcquired(SUBSCRIPTION_TEMPLATE_ID)) {
      console.log('Subscribe permission already acquired')
      return true
    }

    return new Promise((resolve, reject) => {
      console.log('Start require subscribe permission')
      wx.requestSubscribeMessage({
        tmplIds: [SUBSCRIPTION_TEMPLATE_ID],
        success(res) {
          console.log(res)
          if (res.errMsg === 'requestSubscribeMessage:ok' && res[SUBSCRIPTION_TEMPLATE_ID] === 'accept') {
            resolve()
          } else {
            reject(res)
          }
        },
        fail(res) {
          console.log(res)
          reject(res)
        }
      });
    })
  }

  static async _hasAcquired(permission) {
    const acquired = await this._acquiredPermission()
    console.log(`Acquired permissions: ${JSON.stringify(acquired)}`)
    return acquired[permission] === 'accept'
  }

  static _acquiredPermission() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          console.log(res)
          if (!res.subscriptionsSetting || !res.subscriptionsSetting.mainSwitch) resolve({})
          resolve(res.subscriptionsSetting.itemSettings || {})
        },
        fail(res) {
          console.log(res)
          reject(res)
        }
      })
    })
  }
}
