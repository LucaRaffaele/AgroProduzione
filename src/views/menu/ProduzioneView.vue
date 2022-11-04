<template>
  <ProduzioneWizard></ProduzioneWizard>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProduzioneWizard from "@/components/produzione/Wizard.vue";
import { getIllustrationsPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "ProduzioneView",
  components: {
    ProduzioneWizard
  },
  setup() {
    return {
      getIllustrationsPath
    };
  }
});
</script>
