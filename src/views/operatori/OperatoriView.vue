<template>
  <div class="card">
    <div class="card-header border-0 pt-6"></div>
    <div class="card-body pt-0">
      <OperatoriGrid></OperatoriGrid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OperatoriGrid from "@/components/operatori/OperatoriGrid.vue";

export default defineComponent({
  name: "OperatoriView",
  components: {
    OperatoriGrid
  }
});
</script>
