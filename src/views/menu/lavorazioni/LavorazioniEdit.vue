<template>
  <!--begin::Form-->
  <Form
    id="lavorazioni_edit_form"
    class="form"
    novalidate="novalidate"
    @submit="saveChanges()"
    :validation-schema="lavorazioneDetailsValidator"
  >
    <!--begin::Toolbar-->
    <div class="d-flex flex-wrap flex-stack my-5">
      <!--begin::Title-->
      <h2 class="fw-semibold my-2">
        <span class="fs-4 text-gray-400 ms-1"></span>
      </h2>
      <!--end::Title-->
      <!-- Discard and Save button -->
      <div class="card-footer d-flex justify-content-end py-6 px-9"></div>

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
          <span class="indicator-label">
            {{
              isNewProcessing ? "Aggiungi la Lavorazione" : "Salva le modifiche"
            }}
          </span>
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
    <!--end::Toolbar-->

    <!--begin::Content-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card Body-->
      <div id="lavorazioni_edit" class="collapse show">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--Full Name-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label
              class="col-xl-2 col-lg-3 col-sm-4 col-8 col-form-label required fw-semobold fs-6"
              >Descrizione</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg col-12">
              <Field
                type="text"
                name="lav_rtf"
                class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Nome"
                v-model="lavorazioneDetails.lav_rtf"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lav_rtf" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6 justify-content-start">
            <!--begin::Label-->
            <label class="col-form-label required fw-semobold fs-6">
              Prodotto
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-xl-2 col-lg-3 col-sm-4 col-8 fv-row">
              <Field
                type="text"
                name="lav_art"
                :readonly="true"
                class="form-control form-control-lg form-control-solid"
                placeholder=""
                v-model.trim="lavorazioneDetails.lav_art"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lav_art" />
                </div>
              </div>
            </div>

            <div class="col-lg col-12 order-lg-1 order-2 fv-row">
              <Field
                type="text"
                name="ana_desc"
                :readonly="true"
                class="form-control form-control-lg form-control-solid"
                placeholder=""
                v-model.trim="lavorazioneDetails.ana_desc1"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="ana_desc" />
                </div>
              </div>
            </div>

            <div class="col-auto order-lg-2 order-1 fv-row ms-auto">
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
                  Quantit??
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col fv-row">
                  <Field
                    type="number"
                    name="lav_art_qta"
                    class="form-control form-control-lg form-control-solid"
                    placeholder=""
                    v-model.trim="lavorazioneDetails.lav_art_qta"
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
                  Colli
                </label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col fv-row">
                  <Field
                    type="number"
                    name="lav_art_colli"
                    class="form-control form-control-lg form-control-solid"
                    placeholder=""
                    v-model.trim="lavorazioneDetails.lav_art_colli"
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
      <!--end::Card Body-->
    </div>
    <!--end::Content-->
  </Form>

  <search-modal :idModal="articoliSearchModalId">
    <template v-slot:grid>
      <ArticoliGrid @select-row="onSelectArticolo" :search="true"></ArticoliGrid
    ></template>
  </search-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import { ILavorazione as LavorazioneDetails } from "@/core/data/lavorazioni";
import ArticoliGrid from "@/components/articoli/ArticoliGrid.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import SearchModal from "@/components/modals/SearchModal.vue";
import ApiService from "@/core/services/ApiService";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "lavorazioni-edit",

  props: {
    tipo: { type: String, required: true },
    anno: { type: String, required: true },
    codice: { type: String, required: true }
  },

  emits: ["updateLavorazione"],

  components: {
    ErrorMessage,
    Field,
    Form,
    SearchModal,
    ArticoliGrid
  },

  setup(props, { emit }) {
    const lavorazioneDetails = ref<LavorazioneDetails>({
      lav_tipo: Number(props.tipo),
      lav_anno: Number(props.anno),
      lav_rtf: "",
      lav_art: "",
      ana_desc1: "",
      img_data: null,
      lav_art_colli: 0,
      lav_art_qta: 0
    });

    const isNewProcessing = computed(() => {
      return props.codice == "0";
    });

    const articoliSearchModalId = "articoli_search_modal";

    onMounted(() => {
      rsaConsoleLog("LavorazioniEdit Mounted with props id -> ", props.codice);
    });

    watch(
      () => props.codice,
      (newValue) => {
        rsaConsoleLog("UserSettings on WATCH props data -> ", props.codice);
      }
    );

    const submitButton = ref<HTMLElement | null>(null);

    const lavorazioneDetailsValidator = Yup.object().shape({
      lav_rtf: Yup.string().required("Il campo Descrizione ?? obbligatorio"),
      lav_art: Yup.string().required("Selezionare un articolo"),
      lav_art_colli: Yup.number().required("Indicare il numero dei Colli")
    });

    const saveChanges = () => {
      if (submitButton.value) {
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
                  lav_tipo: Number(props.tipo),
                  lav_anno: Number(props.anno),
                  lav_rtf: "",
                  lav_art: "",
                  ana_desc1: "",
                  img_data: null,
                  lav_art_colli: 0,
                  lav_art_qta: 0
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
      }
    };

    const onSelectArticolo = (args) => {
      rsaConsoleLog("LavorazioniEdit articolo Selected -> ", args);
      hideModal(document.getElementById(articoliSearchModalId));
      lavorazioneDetails.value.ana_desc1 = args.ana_desc1;
      lavorazioneDetails.value.lav_art = args.ana_codice;
    };

    const onClickCancelButton = () => {
      emit("updateLavorazione", null);
      lavorazioneDetails.value = {
        lav_tipo: Number(props.tipo),
        lav_anno: Number(props.anno),
        lav_rtf: "",
        lav_art: "",
        ana_desc1: "",
        img_data: null,
        lav_art_colli: 0,
        lav_art_qta: 0
      };
    };

    return {
      submitButton,
      saveChanges,
      lavorazioneDetails,
      lavorazioneDetailsValidator,
      onClickCancelButton,
      isNewProcessing,
      articoliSearchModalId,
      onSelectArticolo
    };
  }
});
</script>
