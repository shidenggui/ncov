<template>
  <div class="p-4 bg-gray-100 h-full min-h-screen">

    <div class="flex mb-4">
      <div class="w-full border border-solid border-gray-400 border-r-0 rounded-l">
        <input class="ml-2 w-full h-full" :placeholder="placeHolder"
               v-model="place"
               type="text"
               confirm-type="done"
               @confirm="addTravel"
        >
      </div>
      <div class="pl-4 pr-4 pt-3 pb-3 bg-green-600 text-white whitespace-no-wrap rounded-r"
           @click="addTravel">查询
      </div>
    </div>

    <ncov-travel v-for="travel in travels"
                 :plain-travel="travel"
                 :key="travel.place"
                 :show-unsubscribe-icon="false"
    ></ncov-travel>
  </div>
</template>

<script>
  import NcovTravel from '../components/ncov-travel';
  import { Travel } from '../domains/travel-query/value-objects/travel';
  import { UiService } from '../domains/infrastructure/presentation/ui-service';
  import { TravelRepository } from '../domains/travel-query/repositories/travel';
  import { TravelService } from '../domains/travel-query/services/travel';
  import { PatientTravelRepository } from '../domains/travel-query/repositories/patient-travel';

  export default {
    components: {NcovTravel},
    data() {
      return {
        place: '',
        travels: TravelRepository.list(),
        placeHolder: '高铁、航班、公交、地铁、地点'
      }
    },
    onShareAppMessage() {
      let travels = this.travels.slice(0, 3).map(t => t.place).reverse().join(',')
      let queryString = ''
      if (travels.length) {
        queryString = `?travels=${travels}`
      }
      console.log(`Forward query string: ${queryString}`)
      return {
        title: '快来查查有没有跟肺炎患者接触过',
        path: `/pages/index${queryString}`
      }
    },
    async onLoad(params) {
      UiService.showLoading()
      try {
        await PatientTravelRepository.reload()
      } finally {
        UiService.hideLoading()
      }
      if (params.travels) {
        params.travels.split(',').slice(0, 3).map(
          t => TravelService.create(new Travel({place: t})
          ))
        this.travels = TravelRepository.list()
      }
    },
    methods: {
      addTravel() {
        if (this.place === '') return
        this.travels = TravelService.create(new Travel({place: this.place.trim()}))
        this.place = ''
        console.log(this.travels)
      }
    }
  }
</script>

<style>
</style>
