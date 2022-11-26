<template>
  <!--begin::Campaigns toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Title-->
    <h2 class="fw-semobold my-2">
      <span class="fs-4 text-gray-400 ms-1"></span>
    </h2>
    <!--end::Title-->

    <!--begin::Controls-->
    <div class="d-flex align-items-center my-2 gap-3">
      <router-link
        :to="'/menu/lavorazioni/modifica/' + apiParams"
        class="btn btn-primary align-self-center"
        @click="onEdit = true"
        >Aggiungi Lavorazione</router-link
      >
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Campaigns toolbar-->
  <!--begin::Row-->
  <div class="row g-5 g-xl-8">
    <!--begin::Col-->
    <div
      v-for="(lavorazione, index) in lavorazioniList"
      :key="index"
      class="col-xl-4 col-md-6"
    >
      <CardLavorazione
        widget-classes="card-xl-stretch mb-xl-8"
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
import { defineComponent, ref, computed, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { rsaConsoleLog } from "@/core/helpers/utility";
import { useRouter, useRoute } from "vue-router";
import CardLavorazione from "@/components/lavorazioni/CardLavorazione.vue";

export default defineComponent({
  name: "lavorazioni-list",
  emits: ["updateLavorazione"],
  components: { CardLavorazione },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const onEdit = computed(() => {
      return route.path.indexOf("/list") == -1;
    });

    const lavTipoDefault = ref(0);
    const lavAnnoDefault = ref(2022);
    const lavCodiceDefault = ref(0); //nuova lavorazione

    const apiParams = ref(
      `${lavTipoDefault.value}/${lavAnnoDefault.value}/${lavCodiceDefault.value}`
    );

    const lavorazioniList = ref<Array<any>>([]);

    onMounted(async () => {
      lavorazioniList.value = await getLavorazioni();
    });

    const getLavorazioni = async () => {
      ApiService.setHeader();
      const result = await ApiService.get("lavorazioni/getjoined");
      try {
        rsaConsoleLog("***LavorazioniList Result -> ", result.data);
        if (result.data.RecordsTotal > 0) {
          return result.data.Data;
        }
      } catch {
        rsaConsoleLog("Error--------------- ", result);
        return null;
      }
      return null;
    };
    return { lavorazioniList, onEdit, apiParams };
  }
});
</script>
