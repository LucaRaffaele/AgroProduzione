<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
    id="kt_app_sidebar_footer"
  >
    <a
      :href="linkDocumentazione"
      target="_blank"
      class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
      data-bs-toggle="tooltip"
      data-bs-trigger="hover"
      data-bs-dismiss-="click"
      title="200+ in-house components and 3rd-party plugins"
    >
      <span class="btn-label">Documentazione</span>
      <span class="svg-icon btn-icon svg-icon-2 m-0">
        <inline-svg src="media/icons/duotune/general/gen005.svg" />
      </span>
    </a>
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "sidebar-footer",
  components: {},
  setup() {
    const linkDocumentazione = computed(() => {
      return process.env.VUE_APP_DOCS_LINK;
    });

    return {
      linkDocumentazione
    };
  }
});
</script>
