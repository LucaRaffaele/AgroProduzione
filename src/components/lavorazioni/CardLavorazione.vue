<template>
  <!--begin::Mixed Widget 1-->
  <div class="card card-xxl-stretch">
    <!--begin::Header-->
    <div :class="`bg-${widgetColor}`" class="card-header border-0 pt-5 pb-20">
      <!--begin::Heading-->
      <div class="d-flex flex-stack">
        <!--begin:Info-->
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
        </div>
        <!--begin:Info-->
      </div>
      <!--end::Heading-->
      <h3 class="card-title fw-bold text-white">
        {{ lavorazioneDetails.lav_desc }}
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Stats-->
      <div class="card-p mt-n12 position-relative mx-n3">
        <!--begin::Row-->
        <div class="row m-0 gap-4">
          <div class="col d-grid me-0 mb-7 p-0 bg-light-warning rounded-2">
            <button
              type="button"
              class="btn px-3 ripple py-8 rounded-2"
              :disabled="lavorazioneDetails.lav_ord_num != 0"
              @click="richiediPrelievo"
            >
              <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <inline-svg src="media/icons/duotune/ecommerce/ecm001.svg" />
              </span>
              Richiedi Prelievo
            </button>
          </div>
          <div class="col d-grid mb-7 p-0 bg-light-primary rounded-2">
            <button
              type="button"
              class="btn px-3 py-8 rounded-2"
              :disabled="true"
            >
              <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
              </span>
              Inserisci Operatori
            </button>
          </div>
          <div class="col d-grid mb-7 p-0 bg-light-info rounded-2">
            <button
              type="button"
              class="btn px-3 py-8 rounded-2"
              :disabled="true"
            >
              <span class="svg-icon svg-icon-3x svg-icon-info d-block my-2">
                <inline-svg src="media/icons/duotune/electronics/elc001.svg" />
              </span>
              Articoli
            </button>
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0 gap-7">
          <div class="col d-grid me-0 p-0 bg-light-success rounded-2">
            <button
              type="button"
              class="btn btn-light-success px-6 py-8 rounded-2"
              :class="active == 'success' ? 'success-btn' : ''"
              :disabled="!isStartable"
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
import ApiService from "@/core/services/ApiService";
import { useStore } from "vuex";

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
    // const store = useStore();
    const active = ref("primary");
    /* const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });
 */
    const widgetColor = computed(() => {
      return isStartable.value
        ? "success"
        : isStopped.value
        ? "danger"
        : "primary";
    });

    const isStartable = computed(() => {
      return (
        lavorazioneDetails.value.lav_ord_num != 0 &&
        lavorazioneDetails.value.lav_start == null
      );
    });

    const isStopped = computed(() => {
      return (
        lavorazioneDetails.value.lav_ord_num != 0 &&
        lavorazioneDetails.value.lav_start == null
      );
    });

    const lavorazioneDetails = ref<LavorazioneDetails>({
      lav_codice: 0,
      ana_desc1: "",
      lav_anno: 0,
      lav_rtf: "",
      lav_ord_num: 0
    });

    onMounted(() => {
      if (props.lavorazione.lav_codice != 0)
        lavorazioneDetails.value = props.lavorazione;
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
      const url = `lavorazioni/prelievo/${lavorazioneDetails.value.lav_tipo}/${lavorazioneDetails.value.lav_anno}/${lavorazioneDetails.value.lav_codice}`;

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
        });
    };

    const startLavorazione = () => {
      lavorazioneDetails.value.lav_start = dateFormatting(new Date(), "en-EN");
      const obj = {
        RecordsTotal: 1,
        Data: [lavorazioneDetails.value]
      };
      const url = `lavorazioni/put/${lavorazioneDetails.value.lav_tipo}/${lavorazioneDetails.value.lav_anno}/${lavorazioneDetails.value.lav_codice}`;

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
        });
    };

    return {
      active,
      richiediPrelievo,
      startLavorazione,
      isStartable,
      dateFormatting,
      lavorazioneDetails,
      widgetColor
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
