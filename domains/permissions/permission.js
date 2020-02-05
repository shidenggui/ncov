import { SUBSCRIPTION_TEMPLATE_ID } from '../infrastructure/settings';

export class PermissionService {
  static requireSubscribe() {
    return new Promise((resolve, reject) => {
      console.log('Start require subscribe')
      wx.requestSubscribeMessage({
        tmplIds: [SUBSCRIPTION_TEMPLATE_ID],
        success(res) {
          if (res.errMsg === 'requestSubscribeMessage:ok') {
            resolve()
          } else {
            console.log(res)
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
