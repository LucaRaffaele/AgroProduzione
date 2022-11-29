<template>
  <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-75">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            @click="saveChanges"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y mx-0 px-lg-5 px-2 pt-0 pb-10">
          <div class="w-85 mt-5 mx-auto row">
            <button
              type="button"
              class="btn w-50px ms-auto btn-primary rounded"
              @click="add"
            >
              <span class="svg-icon mx-auto svg-icon-2">
                <i class="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
          <Form
            id="imballaggi_edit_form"
            class="form mt-5"
            novalidate="novalidate"
            @submit="saveChanges"
          >
            <template
              v-for="(articolo, index) in articoliDefaultList"
              :key="index"
            >
              <!--begin::Input group-->
              <div>
                <!--begin::Articolo-->
                <div class="row mb-6">
                  <!--begin::Col-->
                  <div class="col fv-row input-group">
                    <button
                      type="button"
                      class="btn btn-primary rounded btn-sm p-4"
                      data-bs-toggle="modal"
                      :data-bs-target="`#${articoliSearchModalId}`"
                      @click="articoliSearchModalId += index"
                    >
                      <span class="mx-0 svg-icon svg-icon-2">
                        <inline-svg
                          src="media/icons/duotune/general/gen021.svg"
                        />
                      </span>
                    </button>
                    <Field
                      type="text"
                      :name="'ana_desc1_' + index"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Imballaggio"
                      v-model="articolo.ana_desc1"
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
                    </div>
                  </div>
                </div>
                <!--end::Qtà_e_Colli-->
              </div>
              <!--end::Input group-->
            </template>
          </Form>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <search-modal :idModal="articoliSearchModalId">
    <template v-slot:grid>
      <ArticoliGrid @select-row="onSelectArticolo" :search="true"></ArticoliGrid
    ></template>
  </search-modal>
  <!--end::Modal - View Users-->
</template>

<script lang="ts">
import { rsaConsoleLog } from "@/core/helpers/utility";
import { defineComponent, ref, watch } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { hideModal } from "@/core/helpers/dom";
import SearchModal from "@/components/modals/SearchModal.vue";
import ArticoliGrid from "@/components/articoli/ArticoliGrid.vue";

export default defineComponent({
  name: "imballaggi-modal",
  props: {
    idModal: String
  },

  emits: ["imballaggiSave"],

  components: { ErrorMessage, Field, Form, ArticoliGrid, SearchModal },

  setup(props, { emit }) {
    const imballaggiCount = ref([1]);
    const articoliSearchModalId = ref("articoli_search_modal_");
    const id = ref(props.idModal);
    const articoliDefaultList = ref([
      {
        lar_art: "",
        ana_desc1: "",
        lar_qta: 0,
        lar_colli: 0
      }
    ]);

    const add = () => {
      articoliDefaultList.value.push({
        lar_art: "",
        ana_desc1: "",
        lar_qta: 0,
        lar_colli: 0
      });
    };

    watch(
      () => props.idModal,
      (newValue) => {
        rsaConsoleLog("SearchModal watch id ", newValue);
        id.value = newValue;
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
      articoliDefaultList.value[id].lar_qta = args.lav_art_qta;
      articoliDefaultList.value[id].lar_colli = args.lav_art_colli;
      articoliSearchModalId.value = articoliSearchModalId.value.slice(0, -1);
    };

    const saveChanges = () => {
      emit("imballaggiSave", articoliDefaultList);

      articoliDefaultList.value = [
        {
          lar_art: "",
          ana_desc1: "",
          lar_qta: 0,
          lar_colli: 0
        }
      ];
    };
    return { id, add, articoliDefaultList, articoliSearchModalId, saveChanges };
  }
});
</script>

<style lang="scss">
// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
  .modal-dialog {
    min-width: 100%;
  }
}
</style>
