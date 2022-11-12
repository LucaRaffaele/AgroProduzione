<template>
  <!--begin::Row-->
  <div class="row">
    <!--begin::Col-->
    <div class="col-12">
      <!--begin::Image-->
      <div
        v-if="themeMode === 'dark'"
        class="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-center mt-8 card-rounded-bottom h-250px"
        style="background-image: url('media/rsa/default-dark-big.svg')"
      ></div>

      <div
        v-if="themeMode === 'light'"
        class="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-center mt-8 card-rounded-bottom h-250px"
        style="background-image: url('media/rsa/default-big.svg')"
      ></div>
      <!-- <div
        class="bgi-no-repeat bgi-size-cover rounded min-h-250px mb-5"
        style="background-image: url('media/rsa/default-big.svg')"
      ></div> -->
      <!-- <div class="overlay-wrapper">
        <img alt="img" class="rounded" src="media/rsa/logo-grande.png" />
      </div> -->
      <!--end::Image-->
    </div>
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { themeMode } from "@/core/helpers/config";
import { defineComponent } from "vue";

export default defineComponent({
  name: "main-dashboard",
  components: {},
  setup() {
    return {
      themeMode
    };
  }
});
</script>
