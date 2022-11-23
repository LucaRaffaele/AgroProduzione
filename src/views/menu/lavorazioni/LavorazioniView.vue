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
      <div class="d-flex align-items-center my-2 gap-3">
        <router-link
          :to="'/menu/lavorazioni/articoli/' + 0"
          class="btn btn-primary align-self-center"
          @click="onEdit = true"
          >Aggiungi Articolo</router-link
        >
        <router-link
          :to="'/menu/lavorazioni/operatori/' + 0"
          class="btn btn-primary align-self-center"
          @click="onEdit = true"
          >Aggiungi Operatore</router-link
        >
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
  <router-view @update-lavorazione="onUpdateLavorazione"></router-view>
  <!--end::Content-->
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "lavorazioni-view",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      rsaConsoleLog("LavorazioniView Mounted!");
    });

    const onEdit = computed(() => {
      return route.path.indexOf("/list") == -1;
    });

    const onUpdateLavorazione = (lav) => {
      rsaConsoleLog("LavorazioniView onUpdateLavorazione lav -> ", lav);
      router.push({ name: "lavorazioni-list" });
    };

    return { onEdit, onUpdateLavorazione };
  }
});
</script>
