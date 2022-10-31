<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Theme mode-->
    <div class="app-navbar-item ms-1 ms-lg-3">
      <!--begin::Menu toggle-->
      <a
        href="#"
        class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span
          v-if="themeMode === 'light'"
          class="svg-icon theme-dark-hide svg-icon-2"
        >
          <inline-svg src="media/icons/duotune/general/gen060.svg" />
        </span>
        <span v-else class="svg-icon theme-light-hide svg-icon-2">
          <inline-svg src="media/icons/duotune/general/gen061.svg" />
        </span>
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher />
    </div>
    <!--end::Theme mode-->
    <!--begin::User menu-->
    <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-35px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img
          v-if="user && user.image != ''"
          alt="Logo"
          :src="'data:image/jpeg;base64,' + user.image"
        />
        <img v-else alt="Logo" src="media/avatars/blank.png" />
      </div>
      <KTUserMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User menu-->
    <!--begin::Header menu toggle-->
    <div class="app-navbar-item d-lg-none ms-2 me-n3" title="Show header menu">
      <div
        class="btn btn-icon btn-active-color-primary w-35px h-35px"
        id="kt_app_header_menu_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script>
import { defineComponent, computed } from "vue";
import KTUserMenu from "@/layouts/main-layout/menus/UserAccountMenu.vue";
import KTThemeModeSwitcher from "@/layouts/main-layout/theme-mode/ThemeModeSwitcher.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "header-navbar",
  components: {
    KTUserMenu,
    KTThemeModeSwitcher
  },
  setup() {
    const store = useStore();

    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    const user = computed(() => {
      return store.getters.currentUser;
    });

    return {
      themeMode,
      user
    };
  }
});
</script>
