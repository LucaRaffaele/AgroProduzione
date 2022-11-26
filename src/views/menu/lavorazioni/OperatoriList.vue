<template>
  <Form
    id="lavorazioni_edit_form"
    class="form"
    novalidate="novalidate"
    @submit="saveChanges()"
    :validation-schema="operatoriLavorazioneValidator"
  >
    <!--begin::Campaigns toolbar-->
    <div class="d-flex flex-wrap flex-stack my-5">
      <!--begin::Title-->
      <h2 class="fw-semibold my-2">
        <span class="fs-4 text-gray-400 ms-1"></span>
      </h2>
      <!--end::Title-->

      <!--begin::Controls-->
      <div class="d-flex align-items-end my-2 gap-3">
        <router-link
          to="/menu/lavorazioni/list/"
          class="btn btn-danger align-self-center"
          >Indietro</router-link
        >
        <button
          type="submit"
          id="lavorazioni_edit_submit"
          ref="submitButton"
          class="btn btn-primary ms"
        >
          <span class="indicator-label"> Salva Operatori </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>

      <!--end::Controls-->
    </div>
    <!--end::Campaigns toolbar-->
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card body-->
      <div class="card-body pt-lg-4 p-lg-7 p-2">
        <!--Full Name-->
        <div class="row mb-6">
          <!--begin::Label-->
          <label
            class="col-xl-2 col-lg-3 col-sm-4 col-8 d-lg-block d-none col-form-label required fw-semobold fs-6"
            >Operatore</label
          >
          <!--end::Label-->

          <!--begin::Col-->

          <div class="col fv-row">
            <Field
              type="text"
              name="ana_desc"
              :readonly="true"
              class="form-control form-control-lg form-control-solid"
              placeholder="Operatore"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="ana_desc" />
              </div>
            </div>
          </div>

          <div class="col-auto fv-row ms-auto">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              :data-bs-target="`#${articoliSearchModalId}`"
            >
              <span class="svg-icon svg-icon-2">
                <inline-svg src="media/icons/duotune/general/gen021.svg" />
              </span>
            </button>
          </div>

          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div
          class="row row-cols-lg-4 row-cols-sm-3 row-cols-2 mb-6 justify-content-start"
        >
          <div class="col">
            <div class="row mb-6 justify-content-start">
              <!--begin::Label-->
              <label class="col-form-label fw-semobold fs-6">
                Orario inizio
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col fv-row">
                <Field
                  type="time"
                  name="lav_art_qta"
                  class="form-control form-control-lg form-control-solid"
                  placeholder=""
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="lav_art_qta" />
                  </div>
                </div>
              </div>

              <!--end::Col-->
            </div>
          </div>

          <div class="col">
            <div class="row mb-6 justify-content-start">
              <!--begin::Label-->
              <label class="col-form-label required fw-semobold fs-6">
                Orario Fine
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col fv-row">
                <Field
                  type="time"
                  name="lav_art_colli"
                  class="form-control form-control-lg form-control-solid"
                  placeholder=""
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="lav_art_colli" />
                  </div>
                </div>
              </div>

              <!--end::Col-->
            </div>
          </div>
        </div>
        <!--end::Input group-->
      </div>
    </div>
  </Form>

  <!--end::Input group-->
  <!--TODO: utilizzare la tabella metronic e mettere dentro una card -->
  <div class="card-body py-3">
    <!--begin::Table container-->
    <div class="table-responsive">
      <!--begin::Table-->
      <table
        class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
      >
        <!--begin::Table head-->
        <thead>
          <tr class="fw-bold text-muted">
            <th class="min-w-150px">Operatore</th>
            <th class="min-w-140px">Orario Inizio</th>
            <th class="min-w-120px">Orario Fine</th>
          </tr>
        </thead>
        <!--end::Table head-->

        <!--begin::Table body-->
        <tbody>
          <template v-for="(item, index) in list" :key="index">
            <tr>
              <td>
                <h1 class="text-dark fw-bold text-hover-primary fs-6">
                  {{ item.name }}
                </h1>
              </td>

              <td>
                <h1 class="text-gray-600 d-block fs-6">{{ item.start }}</h1>
              </td>

              <td>
                <h1 class="text-gray-600 d-block fs-6">{{ item.end }}</h1>
              </td>

              <td class="text-end">
                <a
                  href="#"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="media/icons/duotune/art/art005.svg" />
                  </span>
                </a>
              </td>
            </tr>
          </template>
        </tbody>
        <!--end::Table body-->
      </table>
      <!--end::Table-->
    </div>
    <!--end::Table container-->
  </div>

  <search-modal :idModal="articoliSearchModalId">
    <template v-slot:grid> <OperatoriGrid></OperatoriGrid></template>
  </search-modal>
  <!--begin::Content-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { ILavorazione as LavorazioneDetails } from "@/core/data/lavorazioni";
import OperatoriGrid from "@/components/operatori/OperatoriGrid.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import SearchModal from "@/components/modals/SearchModal.vue";
import ApiService from "@/core/services/ApiService";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "articoli-list",

  props: {
    tipo: { type: String, required: true },
    anno: { type: String, required: true },
    codice: { type: String, required: true }
  },

  components: {
    ErrorMessage,
    Field,
    Form,
    SearchModal,
    OperatoriGrid
  },

  setup(props) {
    const isNewProcessing = computed(() => {
      return props.codice == "0";
    });

    const operatoriLavorazioneValidator = Yup.object().shape({});

    const list = [
      {
        name: "Franco",
        start: "10:15",
        end: "12:00"
      },
      {
        name: "Marco",
        start: "12:15",
        end: "13:00"
      },
      {
        name: "Luca",
        start: "21:00",
        end: "22:45"
      },
      {
        name: "Andrea",
        start: "9:00",
        end: "19:30"
      },
      {
        name: "Mattia",
        start: "11:15",
        end: "14:00"
      }
    ];

    const articoliSearchModalId = "articoli_search_modal";

    onMounted(() => {
      rsaConsoleLog("LavorazioniEdit Mounted with props id -> ", props.codice);
      /* if (props.codice != 0)
          lavorazioneDetails.value = ; */
    });

    watch(
      () => props.codice,
      (newValue) => {
        rsaConsoleLog("UserSettings on WATCH props data -> ", props.codice);
      }
    );

    const submitButton = ref<HTMLElement | null>(null);

    const saveChanges = () => {
      /*   if (submitButton.value) {
        if (lavorazioneDetails.value.lav_art == "") return;
        if (lavorazioneDetails.value.lav_rtf == "") return;
        if (lavorazioneDetails.value.lav_art_colli == 0) return;

        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
        const obj = {
          RecordsTotal: 1,
          Data: [lavorazioneDetails.value]
        };
        if (props.codice == "0") {
          ApiService.setSendHeader();
          ApiService.post("lavorazioni/post", obj)
            .then(({ data }) => {
              submitButton.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("***LavorazioniEdit Post Result -> ", data);
              if (data.RecordsTotal > 0) {
                emit("updateLavorazione", data.Data[0]);
                lavorazioneDetails.value = {
                  lav_codice: 1,
                  ana_desc1: "",
                  lav_anno: 0,
                  lav_rtf: ""
                };
              }
            })
            .catch(({ response }) => {
              submitButton.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("Error--------------- ", response);
            });

          submitButton.value?.removeAttribute("data-kt-indicator");
        } else {
          ApiService.setSendHeader();
          ApiService.put(
            `lavorazioni/put/${lavorazioneDetails.value.lav_codice}`,
            obj
          )
            .then(({ data }) => {
              submitButton.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("***LavorazioniEdit Put Result -> ", data);
              if (data.RecordsTotal > 0) {
                lavorazioneDetails.value = data.Data[0];
                emit("updateLavorazione", data.Data[0]);
              }
            })
            .catch(({ response }) => {
              submitButton.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("Error--------------- ", response);
            });

          submitButton.value?.removeAttribute("data-kt-indicator");
        }
      } */
    };

    /*    const onSelectArticolo = (args) => {
      rsaConsoleLog("LavorazioniEdit articolo Selected -> ", args);
      hideModal(document.getElementById(articoliSearchModalId));
      lavorazioneDetails.value.ana_desc1 = args.ana_desc1;
      lavorazioneDetails.value.lav_art = args.ana_codice;
    };

    const onClickCancelButton = () => {
      emit("updateLavorazione", null);
      lavorazioneDetails.value = {
        lav_codice: 1,
        ana_desc1: "",
        lav_anno: 0,
        lav_rtf: ""
      };
    }; */

    return {
      submitButton,
      saveChanges,
      operatoriLavorazioneValidator,
      isNewProcessing,
      articoliSearchModalId,
      list
    };
  }
});
</script>

<!-- <style>
@media (max-width: 991.98px) {
  .col-form-label {
    display: none;
  }
}
</style>
 -->
