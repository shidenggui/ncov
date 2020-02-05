<template>
  <div class="ncov-travel mb-4 bg-white rounded">
    <div class="relative flex justify-center p-4 shadow text-2xl">
      <div class="text-gray-700">
        {{ displayOfPlace }}
      </div>
      <div v-if="showIcon" class="absolute right-0 pt-1 pr-4 w-6 h-6"
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
  import NcovPatientTravel from '../components/ncov-patient-travel';
  import { UiService } from '../domains/infrastructure/presentation/ui-service';
  import { TravelService } from '../domains/travel-query/services/travel';
  import { SubscriptionRepository } from '../domains/travel-query/repositories/subscription';

  export default {
    props: {
      plainTravel: {
        required: true
      },
      showIcon: {
        default: true
      },
      showUnsubscribeIcon: {
        default: true
      }
    },
    components: {NcovPatientTravel},
    data() {
      return {
        travel: null,
        subscribed: false
      };
    },
    created() {
      this.travel = new Travel(this.plainTravel)
      SubscriptionRepository.isSubscribed(this.travel).then(subscribed => this.subscribed = subscribed)
      console.log(this.travel)
    },
    methods: {
      async toggleSubscribe() {
        if (this.subscribed) {
          await SubscriptionRepository.unsubscribe(this.travel)
          this.$emit('unsubscribe', {travel: this.travel})
          UiService.showToast('取消订阅成功')
        } else {
          try {
            await TravelService.subscribe(this.travel)
          } catch (e) {
            UiService.showToast('订阅失败')
            return
          }
          UiService.showToast('订阅成功')
        }

        this.subscribed = !this.subscribed
      }
    },
    computed: {
      displayOfPlace() {
        return this.travel.place.toUpperCase()
      },
      overlapPatientTravels() {
        return TravelService.overlappedPatientTravels(this.travel)
      },
      src() {
        return this.subscribed ? (this.showUnsubscribeIcon ? "/static/cancel.png" : "") : "/static/subscribe.png"
      }
    }
  };
</script>

<style scoped lang="less">
</style>
