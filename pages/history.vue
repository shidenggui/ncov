<template>
  <div class="p-4 bg-gray-100 h-full min-h-screen">
    <div v-if="!travels.length"
         class="pt-10 text-center text-3xl text-gray-400">
      暂无通知
    </div>
    <ncov-travel v-for="travel in travels"
                 :plain-travel="travel"
                 :key="travel.place"
                 :show-icon="false"
    ></ncov-travel>
  </div>
</template>

<script>
  // 历史订阅通知界面
  import NcovTravel from '../components/ncov-travel';
  import { SubscriptionRepository } from '../domains/travel-query/repositories/subscription';
  import { UiService } from '../domains/infrastructure/presentation/ui-service';

  export default {
    components: {NcovTravel},
    data() {
      return {
        travels: [],
      }
    },
    async onShow() {
      UiService.showLoading()
      this.travels = await SubscriptionRepository.notifyHistory()
      UiService.hideLoading()

      console.log(this.travels)
    },
    methods: {}
  }
</script>

<style>
</style>
