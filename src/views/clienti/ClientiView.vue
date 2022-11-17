<template>
  <div class="card">
    <div class="card-header border-0 pt-6"></div>
    <div class="card-body pt-0">
      <ClientiGrid></ClientiGrid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ClientiGrid from "@/components/clienti/ClientiGrid.vue";

export default defineComponent({
  name: "ClientiView",
  components: {
    ClientiGrid
  }
});
</script>
