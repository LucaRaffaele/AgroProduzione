<template>
  <!--begin::Campaigns toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Title-->
    <h2 class="fw-semobold my-2">
      <span class="fs-4 text-gray-400 ms-1"></span>
    </h2>
    <!--end::Title-->

    <!--begin::Controls-->
    <template v-if="!onEdit">
      <div class="d-flex align-items-center my-2">
        <router-link
          :to="'/menu/lavorazioni/modifica/' + 0"
          class="btn btn-primary align-self-center"
          @click="onEdit = true"
          >Aggiungi Lavorazione</router-link
        >
      </div>
    </template>
    <template v-if="onEdit">
      <div class="d-flex align-items-center my-2">
        <router-link
          to="/menu/lavorazioni/list/"
          class="btn btn-danger align-self-center"
          @click="onEdit = false"
          >Indietro</router-link
        >
      </div>
    </template>
    <!--end::Controls-->
  </div>
  <!--end::Campaigns toolbar-->
  <!--begin::Content-->
  <router-view></router-view>
  <!--end::Content-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "lavorazioni-view",
  components: {},
  setup() {
    const onEdit = ref(false);
    onMounted(() => {
      rsaConsoleLog("LavorazioniView Mounted!");
    });

    return { onEdit };
  }
});
</script>
