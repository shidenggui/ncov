<template>
  <div class="p-4 bg-gray-100 h-full min-h-screen">
    <ncov-travel v-for="travel in travels"
                 :plain-travel="travel"
                 :key="travel.place"
                 @toggle-subscribe="unsubscribe"
    ></ncov-travel>
  </div>
</template>

<script>
  import NcovTravel from '../components/ncov-travel';
  import { TravelRepository } from '../domains/travel-query/repositories/travel';

  export default {
    components: {NcovTravel},
    data() {
      return {
        travels: [],
      }
    },
    async onShow() {
      this.travels = await TravelRepository.subscriptions()
      console.log('[subscriptions] Init travels:')
      console.log(travels)
    },
    methods: {
      async unsubscribe(event) {
        console.log(event)
        await TravelRepository.unsubscribe(event.travel)
        this.travels = this.travels.filter(t => t.place !== event.travel.place)
      }
    }
  }
</script>

<style>
</style>
