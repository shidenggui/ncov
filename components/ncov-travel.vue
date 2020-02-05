<template>
  <div class="ncov-travel mb-4 bg-white rounded">
    <div class="relative flex justify-center p-4 shadow text-2xl">
      <div class="text-gray-700">
        {{ displayOfPlace }}
      </div>
      <div class="absolute right-0 pt-1 pr-4 w-6 h-6"
           @click="toggleSubscribe">
        <image class="w-full h-full" :src="src"></image>
      </div>
    </div>
    <div>
      <ncov-patient-travel
          v-for="patientTravel of overlapPatientTravels"
          :plain-patient-travel="patientTravel"
      ></ncov-patient-travel>
    </div>
  </div>
</template>

<script>

  import { Travel } from '../domains/travel-query/value-objects/travel';
  import { OverlapTravelQuery } from '../domains/travel-query/services/overlap-travel-query';
  import NcovPatientTravel from '../components/ncov-patient-travel';
  import { TravelRepository } from '../domains/travel-query/repositories/travel';

  export default {
    props: ["plainTravel"],
    components: {NcovPatientTravel},
    data() {
      return {
        travel: null,
        subscribed: false
      };
    },
    created() {
      this.travel = new Travel(this.plainTravel)
      TravelRepository.isSubscribed(this.travel).then(subscribed => this.subscribed = subscribed)
      console.log(this.travel)
    },
    methods: {
      remove() {
        this.$emit('remove', this.travel)
      },
      async toggleSubscribe() {
        if (this.subscribed) {
          TravelRepository.unsubscribe(this.travel)
        } else {
          TravelRepository.subscribe(this.travel)
        }

        this.subscribed = !this.subscribed
        this.$emit('toggle-subscribe', {subscribe: this.subscribed, travel: this.travel})
      }
    },
    computed: {
      displayOfPlace() {
        return this.travel.place.toUpperCase()
      },
      overlapPatientTravels() {
        return OverlapTravelQuery.query(this.travel)
      },
      src() {
        return this.subscribed ? "/static/cancel.png" : "/static/subscribe.png"
      }
    }
  };
</script>

<style scoped lang="less">
</style>
