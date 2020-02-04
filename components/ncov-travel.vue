<template>
  <div class="ncov-travel mb-4 bg-white rounded">
    <div class="relative flex justify-center p-4 shadow text-2xl">
      <div class="text-gray-700">
        {{ displayOfPlace }}
      </div>
      <div class="absolute right-0 pt-1 pr-4 w-6 h-6"
           @click="remove">
        <image class="w-full h-full" src="/static/delete.png"></image>
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

  export default {
    props: ["plainTravel"],
    components: {NcovPatientTravel},
    data() {
      return {travel: null};
    },
    created() {
      this.travel = new Travel(this.plainTravel)
      console.log(this.travel)
    },
    methods: {
      remove() {
        this.$emit('remove', this.travel)
      }
    },
    computed: {
      displayOfPlace() {
        return this.travel.place.toUpperCase()
      },
      overlapPatientTravels() {
        return OverlapTravelQuery.query(this.travel)
      }
    }
  };
</script>

<style scoped lang="less">
</style>
