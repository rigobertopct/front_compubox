<template>
  <nav
    id="navbarBlur"
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    data-scroll="true"
    :class="isAbsolute ? 'mt-4' : 'mt-4'"
  >
    <div class="px-4 py-1 container-fluid">
      <breadcrumbs :current-page="currentRouteName" :color="color" />
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
      >
        <a href="#" class="p-0 nav-link text-body" @click.prevent="minNav">
          <div class="sidenav-toggler-inner">
            <i
              class="sidenav-toggler-line"
              :class="color ? 'bg-white' : ''"
            ></i>
            <i
              class="sidenav-toggler-line"
              :class="color ? 'bg-white' : ''"
            ></i>
            <i
              class="sidenav-toggler-line"
              :class="color ? 'bg-white' : ''"
            ></i>
          </div>
        </a>
      </div>
      <div
        id="navbar"
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >

        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              id="iconNavbarSidenav"
              href="#"
              class="p-0 nav-link text-body lh-1"
              @click="toggleSidebar"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="container-login">
      <div class="idioma">
        <select v-model="set_idioma" class="form-control">
          <option value="es">🇪🇸 Español</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="in">🇬🇧 English</option>
          <option value="fr">🇫🇷 Français</option>
        </select>
      </div>
    </div>
  </nav>
</template>
<script>
import MaterialInput from "@/components/MaterialInput.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Navbar",
  components: {
    Breadcrumbs,
    MaterialInput
  },
  props: {
    minNav: {
      type: Function,
      default: () => {
      }
    },
    color: {
      type: String,
      default: "text-body"
    }
  },
  data() {
    return {
      showMenu: false,
      set_idioma: ""
    };
  },
  computed: {
    ...mapState(["isRTL", "isAbsolute", "idioma"]),
    currentRouteName() {
      return this.$route.name;
    }
  },
  watch: {
    set_idioma(value) {
      this.$store.dispatch("setIdioma", value);;
    }
  },
  created() {
    this.minNav;
    this.set_idioma = this.$store.state.idioma;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),

    toggleSidebar() {
      this.navbarMinimize();
    }
  }
};
</script>
<style scoped>
.container-login {
  z-index: 99;
}

.idioma {
  position: absolute;
  top: 0px;
  right: 20px;
}
</style>
