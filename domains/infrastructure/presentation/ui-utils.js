export class UiUtils {
  // 2020-02-06T14:55:12.825Z => 02-06
  static Date(time) {
    return time.toISOString().slice(5, 10)
  }
}
