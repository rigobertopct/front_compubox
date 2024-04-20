<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
    :class="`${
      isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'
    } ${sidebarType}`"
  >
    <div class="sidenav-header">
      <i
        id="iconSidenav"
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
      ></i>
      <router-link class="m-0 navbar-brand" to="/" style="display: flex; justify-content: start; align-items: center">
        <img
          src="@/assets/img/logos/copa.svg"
          class="navbar-brand-img h-100"
          alt="main_logo"
        />
        <span class="font-weight-bold text-white" style="white-space: pre-wrap;"
        >{{encabezado}}</span
        >
      </router-link>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";
import logoDark from "@/assets/img/logo-ct-dark.png";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
      logoDark,
      encabezado: "Suite de Inteligencia Deportiva"
    };
  },
  watch: {
    idioma(value) {
      if (value === "es") {
        this.encabezado = "Suite de Inteligencia Deportiva";
      }
      if (value === "ru") {
        this.encabezado = "Интеллектуальный люкс";
      }
      if (value === "in") {
        this.encabezado = "Intelligence Suite";
      }
      if (value === "fr") {
        this.encabezado = "Suite d'intelligence";
      }
    }
  },
  created() {
    if (this.idioma === "es") {
      this.encabezado = "Suite de Inteligencia Deportiva";
    }
    if (this.idioma === "ru") {
      this.encabezado = "Спортивная разведывательная сюита";
    }
    if (this.idioma === "in") {
      this.encabezado = "Sports Intelligence Suite";
    }
    if (this.idioma === "fr") {
      this.encabezado = "Suite d'intelligence sportive";
    }
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode", "idioma"])
  }
};
</script>
