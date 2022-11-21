<template>
  <!--begin::Mixed Widget 1-->
  <div class="card card-xxl-stretch">
    <!--begin::Header-->
    <div
      :class="`bg-${widgetColor}` + ` bg-${active}`"
      class="card-header border-0 pt-5 pb-20"
    >
      <!--begin::Heading-->
      <div class="d-flex flex-stack">
        <!--begin:Info-->
        <div class="d-flex align-items-center">
          <!--begin:Image-->
          <div class="symbol symbol-60px me-5">
            <span :class="`bg-${widgetColor}-light`" class="symbol-label">
              <img
                :src="lavorazione.img_data"
                class="h-50 align-self-center"
                alt=""
              />
            </span>
          </div>
          <!--end:Image-->

          <!--begin:Title-->
          <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
            <a href="#" class="text-dark fw-bold text-hover-gray-300 fs-5">
              {{ lavorazione.ana_desc1 }}
            </a>

            <span class="text-gray-800 fw-semobold">
              {{ "Data di creazione: " + lavorazione.lav_created_at }}
            </span>
          </div>
          <!--end:Title-->
        </div>
        <!--begin:Info-->
      </div>
      <!--end::Heading-->
      <h3 class="card-title fw-bold text-white">{{ lavorazione.lav_desc }}</h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Stats-->
      <div class="card-p mt-n12 position-relative mx-n3">
        <!--begin::Row-->
        <div class="row m-0 gap-4">
          <div class="col d-grid me-0 mb-7 p-0">
            <button
              type="button"
              class="btn btn-light-warning px-3 ripple py-8 rounded-2"
              :disabled="true"
              @click="richiediPrelievo"
            >
              <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <inline-svg src="media/icons/duotune/ecommerce/ecm001.svg" />
              </span>
              Richiedi Prelievo
            </button>
          </div>
          <div class="col d-grid mb-7 p-0">
            <button
              type="button"
              class="btn btn-light-primary px-3 py-8 rounded-2"
            >
              <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Inserisci Operatori
            </button>
          </div>
          <div class="col d-grid mb-7 p-0">
            <button
              type="button"
              class="btn btn-light-info px-3 py-8 rounded-2"
            >
              <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <inline-svg src="media/icons/duotune/electronics/elc001.svg" />
              </span>
              Articoli
            </button>
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0 gap-7">
          <div class="col d-grid me-0 p-0">
            <button
              type="button "
              :class="
                'btn btn-light-success px-6 py-8 rounded-2 ' +
                (active == 'success' ? 'success-btn' : '')
              "
              @click="active = 'success'"
            >
              <span class="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                <inline-svg src="media/icons/duotune/arrows/arr027.svg" />
              </span>
              Avvia
            </button>
          </div>

          <div class="col d-grid p-0">
            <button
              type="button"
              class="btn btn-light-danger px-6 py-8 rounded-2"
              @click="active = 'danger'"
            >
              <span class="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                <inline-svg src="media/icons/duotune/abstract/abs006.svg" />
              </span>
              Fine
            </button>
          </div>
        </div>
        <!--end::Row-->
      </div>
      <!--end::Stats-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onBeforeMount } from "vue";
import { rsaConsoleLog } from "@/core/helpers/utility";
import { ILavorazione as LavorazioneDetails } from "@/core/data/lavorazioni";
import ApiService from "@/core/services/ApiService";
import { useStore } from "vuex";

export default defineComponent({
  name: "card-lavorazione",
  components: {},
  props: {
    widgetClasses: String,
    widgetColor: {
      type: String,
      default: "secondary"
    },
    strokeColor: String,
    lavorazione: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const active = ref("primary");
    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    const lavorazioneDetails = ref<LavorazioneDetails>({
      lav_codice: 0,
      ana_desc1: "",
      lav_anno: 0,
      lav_rtf: "",
      lav_ord_num: 0
    });

    const richiediPrelievo = () => {
      const obj = {
        RecordsTotal: 1,
        Data: [lavorazioneDetails.value]
      };
      ApiService.setSendHeader();
      ApiService.post("lavorazioni/prelievo/tipo/anno/codice", obj)
        .then(({ data }) => {
          rsaConsoleLog("***LavorazioniEdit Post Result -> ", data);
          if (data.RecordsTotal > 0) {
            lavorazioneDetails.value = {
              lav_codice: 1,
              ana_desc1: "",
              lav_anno: 0,
              lav_rtf: ""
            };
          }
        })
        .catch(({ response }) => {
          rsaConsoleLog("Error--------------- ", response);
        });
    };

    return {
      active,
      richiediPrelievo
    };
  }
});
</script>
<style>
.success-btn {
  opacity: 0.5;
  pointer-events: none;
}
</style>
