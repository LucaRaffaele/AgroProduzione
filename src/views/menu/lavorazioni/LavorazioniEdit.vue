<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        @submit="saveChanges1()"
        :validation-schema="lavorazioneDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--Full Name-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Descrizione</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
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

          <!--Articolo-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Articolo</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="ana_desc1"
                class="form-control form-control-lg form-control-solid"
                placeholder="Descrizione"
                v-model="lavorazioneDetails.ana_desc1"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="lav_indirizzo" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>

        <!-- Discard and Save button -->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button class="btn btn-primary me-3" @click="onClickCancelButton">
            {{ isNewUser ? "Chiudi" : "Indietro" }}
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary ms"
          >
            <span class="indicator-label">
              {{ isNewUser ? "Aggiungi l'utente" : "Salva le modifiche" }}
            </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { ILavorazione as LavorazioneDetails } from "@/core/data/lavorazioni";
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from "@/core/services/ApiService";
import * as Yup from "yup";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "lavorazioni-edit",

  props: {
    id: { type: String, required: true }
  },

  components: {
    ErrorMessage,
    Field,
    Form
  },

  setup(props, { emit }) {
    const lavorazioneDetails = ref<LavorazioneDetails>({
      lav_codice: 1,
      ana_desc1: "",
      lav_anno: 0,
      lav_rtf: ""
    });

    onMounted(() => {
      rsaConsoleLog("UserSettings on Mounted props data -> ", props.id);
      /* if (props.id != 0)
        lavorazioneDetails.value = ; */
    });

    watch(
      () => props.id,
      (newValue) => {
        rsaConsoleLog("UserSettings on WATCH props data -> ", props.id);
      }
    );

    const submitButton1 = ref<HTMLElement | null>(null);

    const lavorazioneDetailsValidator = Yup.object().shape({
      lav_rtf: Yup.string().required().label("Descrizione"),
      lav_art: Yup.string().required().label("Codice Articolo"),
      lav_art_colli: Yup.number().label("N. Colli"),
      lav_art_qta: Yup.string().label("Quantità")
    });

    const saveChanges1 = () => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");
        const obj = {
          RecordsTotal: 1,
          Data: [lavorazioneDetails.value]
        };
        if (props.id == "0") {
          ApiService.setSendHeader();
          ApiService.post("utenti/post", obj)
            .then(({ data }) => {
              submitButton1.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("UtentiSettings Post Result -> ", data);
              if (data.RecordsTotal > 0) {
                emit("updateUser", data.Data[0]);
                lavorazioneDetails.value = {
                  lav_codice: 1,
                  ana_desc1: "",
                  lav_anno: 0,
                  lav_rtf: ""
                };
              }
            })
            .catch(({ response }) => {
              submitButton1.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("Error--------------- ", response);
            });

          submitButton1.value?.removeAttribute("data-kt-indicator");
        } else {
          ApiService.setSendHeader();
          ApiService.put(
            `lavorazioni/put/${lavorazioneDetails.value.lav_codice}`,
            obj
          )
            .then(({ data }) => {
              submitButton1.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("UtentiSettings Put Result -> ", data);
              if (data.RecordsTotal > 0) {
                lavorazioneDetails.value = data.Data[0];
                emit("updateUser", data.Data[0]);
              }
            })
            .catch(({ response }) => {
              submitButton1.value?.removeAttribute("data-kt-indicator");
              rsaConsoleLog("Error--------------- ", response);
            });

          submitButton1.value?.removeAttribute("data-kt-indicator");
        }
      }
    };

    const onClickCancelButton = () => {
      emit("updateUser", null);
      lavorazioneDetails.value = {
        lav_codice: 1,
        ana_desc1: "",
        lav_anno: 0,
        lav_rtf: ""
      };
    };

    return {
      submitButton1,
      saveChanges1,
      lavorazioneDetails,
      lavorazioneDetailsValidator,
      onClickCancelButton
    };
  }
});
</script>
