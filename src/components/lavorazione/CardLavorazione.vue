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
            <a href="#" class="text-dark fw-bold text-hover-primary fs-5">
              {{ lavorazione.lav_desc }}
            </a>

            <span class="text-muted fw-semobold">
              {{ "Data di creazione: " + lavorazione.lav_data }}
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
import { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import VueApexCharts from "vue3-apexcharts";

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
    const chartRef = ref<typeof VueApexCharts | null>(null);
    let chart: ApexOptions = {};
    const store = useStore();

    const series = ref([
      {
        name: "Net Profit",
        data: [30, 45, 32, 70, 40, 40, 40]
      }
    ]);

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    onBeforeMount(() => {
      Object.assign(chart, chartOptions(props.widgetColor, props.strokeColor));
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      Object.assign(chart, chartOptions(props.widgetColor, props.strokeColor));

      chartRef.value.refresh();
    };

    watch(themeMode, () => {
      refreshChart();
    });

    return {
      chart,
      series,
      chartRef
    };
  }
});

const chartOptions = (widgetColor, strokeColor): ApexOptions => {
  const labelColor = getCSSVariableValue("--kt-gray-500");
  const borderColor = getCSSVariableValue("--kt-gray-200");
  const color = getCSSVariableValue(`--kt-${widgetColor}`);

  return {
    chart: {
      fontFamily: "inherit",
      type: "area",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "solid",
      opacity: 0
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [strokeColor]
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px"
        }
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 3
        }
      }
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px"
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0
        }
      },
      hover: {
        filter: {
          type: "none",
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: "12px"
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        }
      },
      marker: {
        show: false
      }
    },
    markers: {
      colors: [color],
      strokeColors: [strokeColor],
      strokeWidth: 3
    }
  };
};
</script>
