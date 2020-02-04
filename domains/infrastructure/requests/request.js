export class RequestService {
  static get(url) {
    return uni.request({
      url: url,
      method: "GET",
      data: {},
    }).then(([_, {data}]) => data);
  }
}
