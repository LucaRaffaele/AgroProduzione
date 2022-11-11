<template>
  <!--begin::Campaigns toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Title-->
    <h2 class="fw-semobold my-2">
      <span class="fs-4 text-gray-400 ms-1"></span>
    </h2>
    <!--end::Title-->

    <!--begin::Controls-->
    <div class="d-flex align-items-center my-2">
      <button
        type="button"
        class="btn btn-primary er fs-6 px-8 py-4"
        data-bs-toggle="modal"
        :data-bs-target="`#${modalId}`"
      >
        Aggiungi Lavorazione
      </button>
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Campaigns toolbar-->

  <!--begin::Row-->
  <div class="row g-5 g-xl-8">
    <!--begin::Col-->
    <div
      v-for="(lavorazione, index) of lavorazioniList"
      :key="index"
      class="col-xl-4"
    >
      <CardLavorazione
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="primary"
        chart-height="200"
        stroke-color="#4e12c4"
        :lavorazione="lavorazione"
      ></CardLavorazione>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";
import CardLavorazione from "@/components/lavorazioni/CardLavorazione.vue";

export default defineComponent({
  name: "ProduzioneView",
  components: { CardLavorazione },
  setup() {
    const modalId = ref("modal_add_lavorazione");
    const lavorazioniFake = ref([
      {
        lav_desc: "Pomodori",
        lav_data: "12 Dicembre 2022",
        img_data: null
      },
      {
        lav_desc: "Arance",
        lav_data: "13 Dicembre 2022",
        img_data: null
      },
      {
        lav_desc: "Limoni",
        lav_data: "14 Dicembre 2022",
        img_data: null
      }
    ]);

    const lavorazioniList = ref<Array<any>>([]);

    onMounted(async () => {
      lavorazioniList.value = await getLavorazioni();
      if (!lavorazioniList.value) lavorazioniList.value = lavorazioniFake.value;
    });

    const getLavorazioni = async () => {
      ApiService.setHeader();
      const result = await ApiService.get("lavorazioni/getjoined");
      try {
        rsaConsoleLog("***LavoraziniView Result -> ", result.data);
        if (result.data.RecordsTotal > 0) {
          return result.data.Data;
        }
      } catch {
        rsaConsoleLog("Error--------------- ", result);
        return null;
      }
      return null;
    };
    return { modalId, lavorazioniList };
  }
});
</script>
