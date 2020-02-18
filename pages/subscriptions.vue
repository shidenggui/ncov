<template>
  <div class="p-4 bg-gray-100 h-full min-h-screen">
    <div v-if="!travels.length"
         class="pt-10 text-center text-3xl text-gray-400">
      暂无订阅
    </div>
    <ncov-travel v-for="travel in travels"
                 :plain-travel="travel"
                 :key="travel.place"
                 @unsubscribe="unsubscribe"
    ></ncov-travel>
  </div>
</template>

<script>
  // 订阅页，可查看以及取消订阅
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
      this.travels = await SubscriptionRepository.subscriptions()
      UiService.hideLoading()
      console.log('[subscriptions] Init travels:')
      console.log(this.travels)
    },
    methods: {
      async unsubscribe(event) {
        console.log(event)
        this.travels = this.travels.filter(t => t.place !== event.travel.place)
        await SubscriptionRepository.unsubscribe(event.travel)
      }
    }
  }
</script>

<style>
</style>
