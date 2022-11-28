<template>
  <!--begin::Mixed Widget 1-->
  <div class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-${widgetColor}`" class="card-header border-0 pt-5 pb-20">
      <!--begin::Heading-->
      <div class="d-flex flex-stack">
        <div class="d-flex align-items-center">
          <!--begin:Image-->
          <div class="symbol symbol-60px me-5">
            <span :class="`bg-${widgetColor}-light`" class="symbol-label">
              <img
                v-if="lavorazioneDetails.img_data"
                :src="`data:image/jpeg;base64,${lavorazioneDetails.img_data}`"
                class="img-fluid align-self-center"
                alt=""
              />
              <img
                v-else
                src="media/svg/blank.svg"
                class="img-fluid align-self-center"
                alt=""
              />
            </span>
          </div>
          <!--end:Image-->

          <!--begin:Info-->
          <div class="d-flex flex-column flex-grow-1 my-lg-0 my-2 pr-3">
            <!--begin:Title-->
            <a href="#" class="text-dark fw-bold text-hover-gray-300 fs-5">
              {{ lavorazioneDetails.ana_desc1 }}
            </a>
            <!--end:Title-->
            <!--begin:Date-->
            <span class="text-gray-800 fw-semibold">
              {{
                "Data di creazione: " +
                dateFormatting(lavorazioneDetails.lav_created_at)
              }}
            </span>
            <!--end:Date-->
            <!--begin:Date-->
            <span
              v-if="lavorazioneDetails.lav_ord_num != 0"
              class="text-warning fw-bold fs-5"
            >
              {{ "N. Ordine: " + lavorazioneDetails.lav_ord_num }}
            </span>
            <!--end:Date-->
          </div>
          <!--end:Info-->
        </div>
      </div>
      <div class="d-flex mt-5 w-100">
        <h4 class="fw-normal text-white">
          {{ lavorazioneDetails.lav_rtf }}
        </h4>
      </div>
      <div class="row w-100 mt-5">
        <div class="col-6">
          <h1 class="text-white fs-6">
            Quantità: {{ lavorazioneDetails.lav_art_qta }}
          </h1>
        </div>
        <div class="col-6">
          <h1 class="text-white fs-6 text-end">
            Colli: {{ lavorazioneDetails.lav_art_colli }}
          </h1>
        </div>
      </div>
      <div class="d-flex w-100" v-if="lavorazioneDetails.lav_start">
        <h4 class="fw-normal text-gray-800 fs-7">
          Data di inizio: {{ dateFormatting(lavorazioneDetails.lav_start) }}
        </h4>
      </div>
      <!--end::Heading-->
    </div>

    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Actions-->
      <div class="card-p mt-n12 position-relative mx-n3">
        <!--begin::Row-->
        <div class="row m-0 gap-4">
          <div class="col d-grid me-0 mb-7 p-0 bg-light-warning rounded-2">
            <button
              type="button"
              class="btn btn-light-warning px-3 ripple py-8 rounded-2"
              :disabled="lavorazioneDetails.lav_ord_num != 0"
              :class="
                lavorazioneDetails.lav_ord_num != 0
                  ? 'active disabled-class'
                  : 'btn-secondary'
              "
              @click="richiediPrelievo"
            >
              <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <inline-svg src="media/icons/duotune/ecommerce/ecm001.svg" />
              </span>
              Richiedi Prelievo
            </button>
          </div>
          <div class="col d-grid mb-7 p-0 bg-light-primary rounded-2">
            <router-link
              :to="'/menu/lavorazioni/operatori/' + apiParams"
              class="btn px-3 py-8 rounded-2"
              :class="
                isStopped
                  ? 'btn-light-primary active disabled-class'
                  : !isStarted
                  ? 'btn-light-secondary disabled-class'
                  : 'btn-light-primary'
              "
            >
              <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Inserisci Operatori
            </router-link>
          </div>
          <div class="col d-grid mb-7 p-0 bg-light-info rounded-2">
            <router-link
              :to="'/menu/lavorazioni/articoli/' + apiParams"
              class="btn px-3 py-8 rounded-2"
              :class="
                isStopped
                  ? 'btn-light-info active disabled-class'
                  : !isStarted
                  ? 'btn-light-secondary disabled-class'
                  : 'btn-light-info'
              "
              :disabled="!isStarted || isStopped"
            >
              <span class="svg-icon svg-icon-3x svg-icon-info d-block my-2">
                <inline-svg src="media/icons/duotune/electronics/elc001.svg" />
              </span>
              Articoli
            </router-link>
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0 gap-7">
          <div class="col d-grid me-0 p-0 bg-light-success rounded-2">
            <button
              type="button"
              class="btn px-6 py-8 rounded-2"
              :class="
                !isStartable
                  ? 'btn-light-secondary disabled-class'
                  : isStarted
                  ? 'active btn-light-success disabled-class'
                  : 'btn-light-success'
              "
              :disabled="!isStartable || isStarted"
              @click="startLavorazione"
            >
              <span class="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                <inline-svg src="media/icons/duotune/arrows/arr027.svg" />
              </span>
              Avvia
            </button>
          </div>

          <div class="col d-grid p-0 bg-light-danger rounded-2">
            <button
              type="button"
              class="btn px-6 py-8 btn-light-secondary rounded-2"
              :disabled="true"
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
      <!--end::Actions-->
      <!--end::Body-->
    </div>
    <!--end::Mixed Widget 1-->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  PropType,
  watch,
  onMounted
} from "vue";
import { rsaConsoleLog, dateFormatting } from "@/core/helpers/utility";
import { ILavorazione as LavorazioneDetails } from "@/core/data/lavorazioni";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "card-lavorazione",
  components: {},
  props: {
    widgetClasses: String,
    strokeColor: String,
    lavorazione: {
      type: Object as PropType<LavorazioneDetails>,
      required: true
    }
  },

  setup(props) {
    const lavorazioneDetails = ref<LavorazioneDetails>({
      lav_tipo: 0,
      lav_anno: 0,
      lav_rtf: "",
      lav_art: "",
      ana_desc1: "",
      img_data: null,
      lav_art_colli: 0,
      lav_art_qta: 0,
      lav_created_at: null,
      lav_ord_num: 0
    });

    onMounted(() => {
      if (props.lavorazione.lav_codice != 0)
        lavorazioneDetails.value = props.lavorazione;
      rsaConsoleLog(
        "CardLavorazione onMouted codice ->",
        lavorazioneDetails.value.lav_codice
      );
    });

    const apiParams = computed(() => {
      return `${lavorazioneDetails.value.lav_tipo}/${lavorazioneDetails.value.lav_anno}/${lavorazioneDetails.value.lav_codice}`;
    });

    const widgetColor = computed(() => {
      return lavorazioneDetails.value.lav_start != null
        ? "success"
        : lavorazioneDetails.value.lav_stop != null
        ? "danger"
        : "primary";
    });

    const isStartable = computed(() => {
      return lavorazioneDetails.value.lav_ord_num != 0;
    });

    const isStarted = computed(() => {
      return lavorazioneDetails.value.lav_start != null;
    });

    const isStoppable = computed(() => {
      return (
        lavorazioneDetails.value.lav_ord_num != 0 &&
        lavorazioneDetails.value.lav_start == null
      );
    });

    const isStopped = computed(() => {
      return lavorazioneDetails.value.lav_stop != null;
    });

    watch(
      () => props.lavorazione,
      (newValue) => {
        lavorazioneDetails.value = newValue;
      }
    );

    const richiediPrelievo = () => {
      const obj = {
        RecordsTotal: 1,
        Data: [lavorazioneDetails.value]
      };
      const url = `lavorazioni/prelievo/${apiParams.value}`;

      ApiService.setSendHeader();
      ApiService.put(url, obj)
        .then(({ data }) => {
          rsaConsoleLog("***LavorazioniEdit Post Result -> ", data);
          if (data.RecordsTotal > 0) {
            lavorazioneDetails.value = data.Data[0];
          }
        })
        .catch(({ response }) => {
          //TODO: Gestione Errori Swal -Andrea
          rsaConsoleLog("Error--------------- ", response);
        });
    };

    const startLavorazione = () => {
      lavorazioneDetails.value.lav_start = dateFormatting(new Date(), "en-EN");
      const obj = {
        RecordsTotal: 1,
        Data: [lavorazioneDetails.value]
      };
      const url = `lavorazioni/start/${apiParams.value}`;

      ApiService.setSendHeader();
      ApiService.put(url, obj)
        .then(({ data }) => {
          rsaConsoleLog("***LavorazioniEdit Post Result -> ", data);
          if (data.RecordsTotal > 0) {
            lavorazioneDetails.value = data.Data[0];
          }
        })
        .catch(({ response }) => {
          rsaConsoleLog("Error--------------- ", response);
          lavorazioneDetails.value.lav_start = null;
        });
    };

    return {
      richiediPrelievo,
      startLavorazione,
      isStartable,
      isStarted,
      isStoppable,
      isStopped,
      dateFormatting,
      lavorazioneDetails,
      apiParams,
      widgetColor
    };
  }
});
</script>
<style>
.disabled-class {
  opacity: 0.4 !important;
  pointer-events: none;
}
</style>
