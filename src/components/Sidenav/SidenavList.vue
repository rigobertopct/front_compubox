<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="brooklynAlice"
          :nav-text="$store.state.username"
          :class="getRoute() === 'brooklynAlice' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">person</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Profile Overview' }"
                mini-icon="MP"
                text="Perfil"
              />
              <sidenav-item
                :to="{ name: 'Settings' }"
                mini-icon="S"
                text="Cerrar sesión"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <hr class="horizontal light mt-2 mb-2" />
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Combates"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/combate')"
        >
          <template #icon>
            <img src="@/assets/iconos/combate.svg">
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Informes"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/informes')"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">receipt_long</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          collapse-ref="nomencladores"
          nav-text="Nomencladores"
          :class="getRoute() === 'applications' ? 'active' : ''"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">settings</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <sidenav-item
                :to="{ name: 'Categorías' }"
                mini-icon="C"
                text="Categorías"
              />
              <sidenav-item
                :to="{ name: 'Países' }"
                mini-icon="PA"
                text="Paises"
              />
              <sidenav-item
                :to="{ name: 'Eventos' }"
                mini-icon="E"
                text="Eventos"
              />
              <sidenav-item
                :to="{ name: 'Púgiles' }"
                mini-icon="PU"
                text="Púgiles"
              />
              <sidenav-item
                :to="{ name: 'Reglamentos' }"
                mini-icon="R"
                text="Reglamentos"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <hr class="horizontal light mt-0" />
        <h6
          class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder text-white"
          :class="isRTL ? 'me-4' : 'ms-2'"
        >
          Configuraciones
        </h6>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Usuarios"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/usuarios')"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">group</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Golpes"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/configuracion/golpes')"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">receipt_long</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Teclas"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/configuracion/teclas')"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">keyboard</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Resultados"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/configuracion/resultados')"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">emoji_events</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" :class="getRoute() === 'dashboards' ? 'active' : ''">
        <sidenav-collapse
          nav-text="Tipo de evento"
          :collapse="false"
          url="#"
          :aria-controls="''"
          collapse-ref="#"
          @click="this.$router.push('/configuracion/tipoevento')"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">calendar_month</i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import { mapState } from "vuex";
export default {
  name: "SidenavList",
  components: {
    SidenavItem,
    SidenavCollapse,
    SidenavCollapseItem
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  computed: {
    ...mapState(["isRTL"])
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
