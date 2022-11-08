<template>
  <div class="card">
    <div class="card-header border-0 pt-6"></div>
    <div class="card-body pt-0">
      <h2>TEST</h2>
      <articoli-grid></articoli-grid>
    </div>
  </div>
</template>

<script lang="ts">
import ArticoliGrid from "@/components/articoli/ArticoliGrid.vue";

export default {
  name: "ArticoliView",
  component: {
    ArticoliGrid
  }
};
</script>
