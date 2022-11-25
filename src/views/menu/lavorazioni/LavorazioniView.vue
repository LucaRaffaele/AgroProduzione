<template>
  <!--begin::Content-->
  <router-view @update-lavorazione="onUpdateLavorazione"></router-view>
  <!--end::Content-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { rsaConsoleLog } from "@/core/helpers/utility";

export default defineComponent({
  name: "lavorazioni-view",
  components: {},
  setup() {
    const router = useRouter();

    onMounted(() => {
      rsaConsoleLog("LavorazioniView Mounted!");
    });

    const onUpdateLavorazione = (lav) => {
      rsaConsoleLog("LavorazioniView onUpdateLavorazione lav -> ", lav);
      router.push({ name: "lavorazioni-list" });
    };

    return { onUpdateLavorazione };
  }
});
</script>
