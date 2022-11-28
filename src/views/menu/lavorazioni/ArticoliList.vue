<template>
  <Form
    id="lavorazioni_edit_form"
    class="form"
    novalidate="novalidate"
    @submit="saveChanges()"
    :validation-schema="articoliLavorazioneValidator"
  >
    <!--begin::Toolbar-->
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
          <span class="indicator-label">
            {{ isNewList ? "Salva Articoli" : "Salva le modifiche" }}
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
      <!--begin::Card body-->
      <div class="card-body pt-lg-4 p-lg-7 p-2">
        <div class="d-flex flex-column">
          <!--begin::Input group-->
          <div>
            <!--begin::Label-->
            <div class="row mb-6">
              <label
                class="col-xl-2 col-lg-3 col-sm-4 col-8 col-form-label required fw-semobold fs-4"
                >Prodotto finale</label
              >
            </div>
            <!--end::Label-->

            <!--Full Name-->
            <div class="row mb-6">
              <!--begin::Col-->
              <div class="col fv-row input-group">
                <button
                  type="button"
                  class="btn btn-primary rounded btn-sm p-4"
                  data-bs-toggle="modal"
                  :data-bs-target="`#${articoliSearchModalId}`"
                  @click="articoliSearchModalId += 0"
                >
                  <span class="mx-0 svg-icon svg-icon-2">
                    <inline-svg src="media/icons/duotune/general/gen021.svg" />
                  </span>
                </button>
                <Field
                  type="text"
                  name="ana_desc1_0"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Articolo"
                  v-model="articoliDefaultList[0].ana_desc1"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="ana_desc" />
                  </div>
                </div>
              </div>

              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div
              class="row row-cols-lg-4 row-cols-sm-3 row-cols-2 mt-6 justify-content-start"
            >
              <div class="col">
                <div class="row mb-6 justify-content-start">
                  <!--begin::Label-->
                  <label
                    class="col-form-label d-lg-block d-none fw-semobold fs-6"
                  >
                    Quantità
                  </label>
                  <!--end::Label-->

                  <!--begin::Col-->
                  <div class="col fv-row">
                    <Field
                      type="number"
                      name="lar_qta_0"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Quantità"
                      v-model="articoliDefaultList[0].lar_qta"
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
                  <label
                    class="col-form-label required d-lg-block d-none fw-semobold fs-6"
                  >
                    Colli
                  </label>
                  <!--end::Label-->

                  <!--begin::Col-->
                  <div class="col fv-row">
                    <Field
                      type="number"
                      name="lar_colli_0"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Colli"
                      v-model="articoliDefaultList[0].lar_colli"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="lav_art_colli" />
                      </div>
                    </div>
                  </div>

                  <!--end::Col-->

                  <div class="col-auto fv-row">
                    <button
                      type="button"
                      class="btn btn-primary rounded px-5"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${basketSearchModalId}`"
                    >
                      <span class="mx-0 svg-icon svg-icon-2">
                        <i class="fas fa-shopping-basket px-0"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end::Input group-->

          <div
            class="alert fw-bold fs-3 mt-lg-10 mt-5 alert-primary"
            role="alert"
          >
            Scarti
          </div>

          <template
            v-for="(articolo, index) in articoliDefaultList"
            :key="index"
          >
            <!--begin::Input group-->
            <div v-if="index != 0">
              <!--begin::Articolo-->
              <div class="row mb-6">
                <!--begin::Col-->
                <div class="col fv-row input-group">
                  <button
                    type="button"
                    class="btn btn-primary rounded btn-sm p-4"
                    :class="index <= 3 ? 'btn-primary' : 'btn-warning'"
                    :disabled="index > 3"
                    data-bs-toggle="modal"
                    :data-bs-target="`#${articoliSearchModalId}`"
                    @click="articoliSearchModalId += index"
                  >
                    <template v-if="index <= 3">
                      <span class="mx-0 svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/general/gen021.svg"
                        />
                      </span>
                    </template>
                    <template v-else>
                      <span class="svg-icon svg-icon-1 mx-1">
                        <i class="fa-solid fa-lock px-0"></i>
                      </span>
                    </template>
                  </button>
                  <Field
                    type="text"
                    :name="'ana_desc1_' + index"
                    class="form-control form-control-lg form-control-solid"
                    :placeholder="labelTipoArticoli[articolo.lar_tipo_art]"
                    v-model="articolo.ana_desc1"
                    :disabled="index > 3"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage :name="'ana_desc1_' + index" />
                    </div>
                  </div>
                </div>

                <!--end::Col-->
              </div>
              <!--end::Articolo-->

              <!--begin::Qtà_e_Colli-->
              <div
                class="row row-cols-lg-4 row-cols-sm-3 row-cols-2 mt-6 justify-content-start"
              >
                <div class="col">
                  <div class="row mb-6 justify-content-start">
                    <!--begin::Label-->
                    <label
                      class="col-form-label d-lg-block d-none fw-semobold fs-6"
                    >
                      Quantità
                    </label>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col fv-row">
                      <Field
                        type="number"
                        :name="'lar_qta_' + index"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Quantità"
                        v-model="articolo.lar_qta"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage :name="'lar_qta_' + index" />
                        </div>
                      </div>
                    </div>

                    <!--end::Col-->
                  </div>
                </div>

                <div class="col">
                  <div class="row mb-6 justify-content-start">
                    <!--begin::Label-->
                    <label
                      class="col-form-label required d-lg-block d-none fw-semobold fs-6"
                    >
                      Colli
                    </label>
                    <!--end::Label-->

                    <!--begin::Col-->
                    <div class="col fv-row">
                      <Field
                        type="number"
                        :name="'lar_colli_' + index"
                        class="form-control form-control-lg form-control-solid"
                        placeholder="Colli"
                        v-model="articolo.lar_colli"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage :name="'lar_colli_' + index" />
                        </div>
                      </div>
                    </div>

                    <!--end::Col-->

                    <div class="col-auto fv-row">
                      <button
                        type="button"
                        class="btn btn-primary rounded px-5"
                        data-bs-toggle="modal"
                        :data-bs-target="`#${basketSearchModalId}`"
                        @click="basketSearchModalId += index"
                      >
                        <span class="mx-0 svg-icon svg-icon-1">
                          <i class="fas fa-shopping-basket px-0"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Qtà_e_Colli-->
            </div>
            <!--end::Input group-->
          </template>
        </div>
      </div>
    </div>
    <!--end::Content-->
  </Form>

  <!--begin::Modale-->

  <search-modal :idModal="articoliSearchModalId">
    <template v-slot:grid>
      <ArticoliGrid @select-row="onSelectArticolo"></ArticoliGrid
    ></template>
  </search-modal>
  <!--TODO: Sistemare Imballaggi Modal
  --- la search modal deve essere inserita DENTRO la Modale Imballaggi 
  --- infatti nel v-slot:grid ci va sempre una GRID e niente altro
  --- Imballaggi Modal alla chiusura genera un evento 
  --- che ritorna la lista con gli imballaggi -->
  <search-modal :idModal="basketSearchModalId">
    <template v-slot:grid>
      <imballaggiModal></imballaggiModal>
    </template>
  </search-modal>
  <!--begin::Content-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from "vue";
import {
  IArticoliLavorazione as ArticoliLavorazione,
  TipoArticoli
} from "@/core/data/articoliLavorazioni";
import ArticoliGrid from "@/components/articoli/ArticoliGrid.vue";
import imballaggiModal from "@/components/imballaggiComp.vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import SearchModal from "@/components/modals/SearchModal.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
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
    ArticoliGrid,
    imballaggiModal
  },

  setup(props) {
    const isNewList = computed(() => {
      return props.codice == "0";
    });

    const articoliSearchModalId = ref("articoli_search_modal_");
    const basketSearchModalId = ref("basket_search_modal_");

    const articoloPrelevato = ref<any>({
      lar_art: "",
      ana_desc1: ""
    });

    const articoliDefaultList = ref<Array<ArticoliLavorazione>>([
      {
        lar_art: articoloPrelevato.value.lar_art,
        ana_desc1: articoloPrelevato.value.ana_desc1,
        lar_tipo_art: TipoArticoli.PRODOTTO_FINALE,
        lar_qta: 0,
        lar_colli: 0
      },
      {
        lar_art: "",
        ana_desc1: "",
        lar_tipo_art: TipoArticoli.SCARTO_I,
        lar_qta: 0,
        lar_colli: 0
      },
      {
        lar_art: "",
        ana_desc1: "",
        lar_tipo_art: TipoArticoli.SCARTO_II,
        lar_qta: 0,
        lar_colli: 0
      },
      {
        lar_art: "",
        ana_desc1: "",
        lar_tipo_art: TipoArticoli.SCARTO_EXTRA,
        lar_qta: 0,
        lar_colli: 0
      },
      {
        lar_art: "",
        ana_desc1: "",
        lar_tipo_art: TipoArticoli.SCARTO_NON_UTILIZZABILE,
        lar_qta: 0,
        lar_colli: 0
      },
      {
        lar_art: "",
        ana_desc1: "",
        lar_tipo_art: TipoArticoli.RIMANENZA,
        lar_qta: 0,
        lar_colli: 0
      }
    ]);

    const articoliLavorazioneList = ref<Array<ArticoliLavorazione>>([]);

    const labelTipoArticoli = ref<Array<string>>([
      "Prodotto Finale",
      "Scarto I",
      "Scarto II",
      "Scarto Extra",
      "Scarto NON Utilizzabile",
      "Rimanenza"
    ]);

    const articoliLavorazioneValidator = Yup.object().shape({
      ana_desc1_tipo_0: Yup.string().required("Indicare il Prodotto finale"),
      qta_tipo_0: Yup.number().required("Indicare la Quantità"),
      colli_tipo_0: Yup.number().required("Indicare i colli")
    });

    const apiParams = ref(`${props.tipo}/${props.anno}/${props.codice}`);
    const getArticoli = async () => {
      ApiService.setHeader();
      try {
        const result = await ApiService.get(
          "lavorazioni/articoli/getjoined",
          apiParams.value
        );
        rsaConsoleLog("***ArticoliList getArticoli Result -> ", result.data);
        if (result.data.RecordsTotal > 0) {
          return result.data.Data;
        }
      } catch (error) {
        rsaConsoleLog("Error--------------- ", error);
        Swal.fire({
          text: error,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-danger"
          }
        });
        return null;
      }
      return null;
    };

    const getLavorazione = async () => {
      ApiService.setHeader();
      try {
        const result = await ApiService.get(
          "lavorazioni/getjoinedbyid",
          apiParams.value
        );
        rsaConsoleLog(
          "***ArticoliiList getLavorazione Result -> ",
          result.data
        );
        if (result.data.RecordsTotal > 0) {
          return result.data.Data;
        }
      } catch (error) {
        rsaConsoleLog("Error--------------- ", error);
        Swal.fire({
          text: error,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          customClass: {
            confirmButton: "btn btn-danger"
          }
        });
        return null;
      }
      return null;
    };

    onMounted(async () => {
      rsaConsoleLog("ArticoliList Mounted with props id -> ", props.codice);
      rsaConsoleLog(
        "ArticoliList Mounted ENUM -> ",
        TipoArticoli.PRODOTTO_FINALE
      );
      const articoli = await getArticoli();
      const lavorazione = await getLavorazione();
      if (articoli) articoliLavorazioneList.value = articoli;
      if (lavorazione)
        articoloPrelevato.value = {
          lar_art: lavorazione.lav_art,
          ana_desc1: lavorazione.ana_desc1
        };
    });

    watch(
      () => props.codice,
      (newValue) => {
        rsaConsoleLog("UserSettings on WATCH props data -> ", props.codice);
      }
    );

    const onSelectArticolo = (args) => {
      rsaConsoleLog("ArticoliList articolo Selected -> ", args);

      const id = Number(
        articoliSearchModalId.value.substring(
          articoliSearchModalId.value.length - 1
        )
      );

      hideModal(document.getElementById(articoliSearchModalId.value));

      articoliDefaultList.value[id].ana_desc1 = args.ana_desc1;
      articoliDefaultList.value[id].lar_art = args.ana_codice;
      articoliDefaultList.value[id].lar_costo = args.ana_ult_pr_acquisto;
      articoliDefaultList.value[id].lar_imballo = false;
      articoliSearchModalId.value = articoliSearchModalId.value.slice(0, -1);
    };

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
        if (props.id == "0") {
          ApiService.setSendHeader();
          ApiService.post("lavorazioni/post", obj)
            .then(({ data }) => {
              submitButton.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("***ArticoliList Post Result -> ", data);
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
              rsaConsoleLog("***ArticoliList Put Result -> ", data);
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

    /*
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
      articoliDefaultList,
      labelTipoArticoli,
      submitButton,
      saveChanges,
      basketSearchModalId,
      isNewList,
      articoliSearchModalId,
      articoliLavorazioneValidator,
      onSelectArticolo
    };
  }
});
</script>
