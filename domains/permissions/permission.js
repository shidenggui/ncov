import { SUBSCRIPTION_TEMPLATE_ID } from '../infrastructure/settings';

export class PermissionService {
  static requireSubscribe() {
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
}
