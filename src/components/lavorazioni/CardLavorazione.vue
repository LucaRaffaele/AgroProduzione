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
      <div class="card-p mt-n12 position-relative">
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7">
            <span class="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
              <inline-svg src="media/icons/duotune/ecommerce/ecm001.svg" />
            </span>
            <a href="#" class="text-warning fw-semobold fs-6">
              Richiedi Prelievo
            </a>
          </div>
          <div class="col bg-light-primary px-6 py-8 rounded-2 mb-7">
            <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
              <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
            </span>
            <a href="#" class="text-primary fw-semobold fs-6">
              Inserisci Operatori
            </a>
          </div>
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row m-0">
          <div class="col bg-light-success px-6 py-8 rounded-2 me-7">
            <span class="svg-icon svg-icon-3x svg-icon-success d-block my-2">
              <inline-svg src="media/icons/duotune/arrows/arr027.svg" />
            </span>
            <a href="#" class="text-success fw-semobold fs-6 mt-2">
              Avvia Lavorazione
            </a>
          </div>
          <div class="col bg-light-danger px-6 py-8 rounded-2">
            <span class="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
              <inline-svg src="media/icons/duotune/abstract/abs006.svg" />
            </span>
            <a href="#" class="text-danger fw-semobold fs-6 mt-2">
              Fine Lavorazione
            </a>
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

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    return {};
  }
});
</script>
