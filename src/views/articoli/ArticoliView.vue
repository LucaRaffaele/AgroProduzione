<template>
  <div class="card mt-lg-5 mt-2">
    <div class="card-body p-0 m-0">
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
