<template>
  <div class="card">
    <div class="card-header border-0 pt-6"></div>
    <div class="card-body pt-0">
      <ArticoliGrid></ArticoliGrid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticoliGrid from "@/components/articoli/ArticoliGrid.vue";

export default defineComponent({
  name: "ArticoliView",
  components: {
    ArticoliGrid
  }
});
</script>
