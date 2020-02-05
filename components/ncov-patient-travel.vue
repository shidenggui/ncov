<template>
  <div class="ncov-patient-travel p-2 pt-8 pb-4 text-gray-700 bg-blue-100 shadow leading-relaxed"
       @click="copy"
  >
    <div class="flex justify-between mb-2 text-lg font-medium">
      <div class="w-1--2 text-center whitespace-no-wrap">
        {{ displayOfTime }}
      </div>
      <div class="w-1--2 text-center">
        {{ displayOfPlace }}
      </div>
    </div>
    <div class="detail text-sm text-gray-600 text-center">
      {{ patientTravel.detail }}
    </div>
    <div class="source mt-1 ml-10 text-right text-xs text-green-600">
      {{ patientTravel.source }}
    </div>
  </div>
</template>

<script>

  import { PatientTravel } from '../domains/travel-query/value-objects/patient-travel';
  import { UiService } from '../domains/infrastructure/presentation/ui-service';

  export default {
    props: ["plainPatientTravel"],
    data() {
      return {patientTravel: null};
    },
    created() {
      this.patientTravel = new PatientTravel(this.plainPatientTravel)
    },
    methods: {
      async copy() {
        UiService.setClipboardData(this.patientTravel.link)
        setTimeout(
          () => UiService.showToast('来源链接已经复制到剪切板，可粘贴到浏览器打开'),
          100
        )
      }
    },
    computed: {
      displayOfTime() {
        return this.patientTravel.time.toISOString().slice(5, 10)
      },
      displayOfPlace() {
        return this.patientTravel.place
      }
    }
  };
</script>

<style scoped lang="less">
</style>
