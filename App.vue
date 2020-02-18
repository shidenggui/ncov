<script>

  import * as settings from './settings';

  export default {
    onLaunch: function () {
      console.log('App Launch')
      wx.cloud.init({
        env: settings.CLOUD_ENV,
        traceUser: true,
      })
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    }
  }
</script>

<style>
  /*每个页面公共css */
  @import "theme/tailwind/tailwind.css";
</style>
