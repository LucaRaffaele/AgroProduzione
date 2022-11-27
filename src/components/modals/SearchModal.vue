<template>
  <!--begin::Modal - View Users-->
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
          <slot name="grid"></slot>
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - View Users-->
</template>

<script lang="ts">
import { rsaConsoleLog } from "@/core/helpers/utility";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "search-modal",
  props: {
    idModal: String
  },

  components: {},
  setup(props) {
    const id = ref(props.idModal);
    watch(
      () => props.idModal,
      (newValue) => {
        rsaConsoleLog("SearchModal watch id ", newValue);
        id.value = newValue;
      }
    );
    return { id };
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
