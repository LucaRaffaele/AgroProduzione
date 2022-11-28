<template>
  <div class="w-85 mx-auto row">
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
  <div
    class="w-100 mx-auto"
    v-for="(element, index) in imballaggiCount"
    :key="index"
  >
    <div class="row mx-auto mt-15 w-85">
      <!--begin::Label-->

      <!--end::Label-->

      <!--begin::Col-->

      <div class="col fv-row input-group">
        <button
          type="button"
          class="btn btn-primary rounded"
          data-bs-toggle="modal"
          :data-bs-target="`#${articoliSearchModalId}`"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
        </button>
        <Field
          type="text"
          name="ana_desc"
          :readonly="true"
          class="form-control form-control-lg form-control-solid"
          placeholder="Imballaggio"
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
      class="row row-cols-lg-4 mx-auto row-cols-sm-3 w-85 row-cols-2 mt-6 justify-content-start"
    >
      <div class="col">
        <div class="row mb-6 justify-content-start">
          <!--begin::Label-->
          <label class="col-form-label d-lg-block d-none fw-semobold fs-6">
            Quantità
          </label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col fv-row">
            <Field
              type="number"
              :name="index + '_qta'"
              class="form-control form-control-lg form-control-solid"
              placeholder="Quantità"
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
              :name="index + '_colli'"
              class="form-control form-control-lg form-control-solid"
              placeholder="Colli"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field } from "vee-validate";

export default defineComponent({
  name: "imballaggi-modal",
  components: {
    ErrorMessage,
    Field
  },
  setup() {
    const imballaggiCount = ref([1]);
    const add = () => {
      imballaggiCount.value.push(0);
    };

    return {
      add,
      imballaggiCount
    };
  }
});
</script>
