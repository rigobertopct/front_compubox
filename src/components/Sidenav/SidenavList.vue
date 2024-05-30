<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          collapse-ref="username"
          :nav-text="$store.state.username"
        >
          <template #icon>
            <i class="material-icons-round opacity-10">person</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <!-- nav links -->
              <sidenav-item
                :to="{ name: 'Perfil de usuario' }"
                mini-icon="Pe"
                :text="perfil"
              />
              <li class="nav-item active">
                <a @click="Logout" class="nav-link">
                  <span class="sidenav-mini-icon text-white">{{ cerrar_sesion_iniciales }}</span>
                  <span class="sidenav-normal me-3 ms-3 ps-1 text-white text-white">
                    {{ cerrar_sesion }}
                  </span>
                </a>
              </li>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <hr class="horizontal light mt-2 mb-2" />
      <li class="nav-item"
          v-show="
            $store.state.group==='Boxeo' ||
            $store.state.group==='Administrador' ||
            $store.state.group==='Admin_Boxeo'
         "
          v-if="this.$store.state.origen_login==='boxeo'">
        <sidenav-collapse
          :nav-text="boxeo_text"
          :collapse="true"
          :aria-controls="''"
          collapse-ref="Boxeo"
        >
          <template #icon>
            <img src="@/assets/iconos/combate.svg">
          </template>
          <template #list>
            <ul class="nav pe-0">
              <sidenav-item
                to="/combate"
                :mini-icon="combate_iniciales"
                :text="combate_text"
              />
              <sidenav-item
                to="/informes"
                :mini-icon="informes_iniciales"
                :text="informes_text"
              />
              <sidenav-item v-show="$store.state.group==='Admin_Boxeo' || $store.state.group==='Administrador'"
                            to="/nomencladores/categorias"
                            :mini-icon="categorias_iniciales"
                            :text="categorias_text"
              />
              <sidenav-item v-show="$store.state.group==='Admin_Boxeo' || $store.state.group==='Administrador'"
                            to="/nomencladores/pugiles"
                            :mini-icon="pugiles_iniciales"
                            :text="pugiles_text"
              />
              <sidenav-item
                to="/configuracion/teclas"
                :mini-icon="teclas_iniciales"
                :text="teclas_text"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item"
          v-show="
            $store.state.group==='Pruebas' ||
            $store.state.group==='Admin_Pruebas' ||
            $store.state.group==='Administrador'
         "
          v-if="this.$store.state.origen_login==='pruebas'">
        <sidenav-collapse
          :nav-text="pruebas_text"
          :collapse="true"
          :aria-controls="''"
          collapse-ref="Pruebas"
        >
          <template #icon>
            <img src="@/assets/iconos/pruebas.svg">
          </template>
          <template #list>
            <ul class="nav pe-0">
              <sidenav-item
                to="/pruebas"
                :mini-icon="pruebas_iniciales"
                :text="pruebas_text"
              />
              <sidenav-item
                v-show="
                $store.state.group==='Admin_Pruebas' ||
                $store.state.group==='Administrador'"
                to="/nomencladores/lugares"
                :mini-icon="lugares_iniciales"
                :text="lugares_text"
              />
              <sidenav-item
                v-show="
                $store.state.group==='Admin_Pruebas' ||
                $store.state.group==='Administrador'"
                to="/deportes"
                :mini-icon="deportes_iniciales"
                :text="deportes_text"
              />
              <sidenav-item
                v-show="
                $store.state.group==='Admin_Pruebas' ||
                $store.state.group==='Administrador'"
                to="/deportes/disciplinas"
                :mini-icon="disciplinas_iniciales"
                :text="disciplina_text"
              />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item"
          v-show="
            $store.state.group==='Boxeo' ||
            $store.state.group==='Administrador' ||
            $store.state.group==='Admin_Pruebas' ||
            $store.state.group==='Admin_Boxeo'
         "
          v-if="this.$store.state.origen_login==='pruebas'">
        <sidenav-collapse
          :nav-text="deposrtista_text"
          :collapse="false"
          :aria-controls="''"
          collapse-ref="Deportista"
          @click="$router.push('/pruebas/deportistas')"
        >
          <template #icon>
            <img src="@/assets/iconos/atletas.svg">
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item" v-show="
        $store.state.group==='Admin_Boxeo' ||
        $store.state.group==='Administrador'
        ">
        <hr class="horizontal light mt-0" />
        <h6
          class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder text-white"
          :class="isRTL ? 'me-4' : 'ms-2'"
        >
          {{ configuraciones_text }}
        </h6>
      </li>
      <li class="nav-item" v-show="$store.state.group==='Admin_Boxeo' || $store.state.group==='Administrador'">
        <sidenav-collapse
          collapse-ref="nomencladores"
          :nav-text="nomencladores_text">
          <template #icon>
            <i class="material-icons-round opacity-10">settings</i>
          </template>
          <template #list>
            <ul class="nav pe-0">
              <sidenav-item
                to="/nomencladores/eventos"
                :mini-icon="eventos_iniciales"
                :text="eventos_text"
              />
            </ul>
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
      isActive: "active",

      perfil: "Perfil",
      perfil_iniciales: "Pe",
      cerrar_sesion: "Cerrar sesión",
      cerrar_sesion_iniciales: "Cs",
      boxeo_text: "Boxeo",
      combate_text: "Combate",
      combate_iniciales: "Co",
      informes_text: "Informes",
      informes_iniciales: "In",
      categorias_text: "Categorías",
      categorias_iniciales: "Ca",
      pugiles_text: "Púgiles",
      pugiles_iniciales: "Pu",
      teclas_text: "Teclas",
      teclas_iniciales: "Te",
      pruebas_text: "Pruebas",
      pruebas_iniciales: "Pr",
      lugares_text: "Lugares",
      lugares_iniciales: "Lu",
      deportes_text: "Deportes",
      deportes_iniciales: "De",
      disciplina_text: "Disciplinas",
      disciplinas_iniciales: "Di",
      deposrtista_text: "Deportistas",
      eventos_text: "Eventos",
      eventos_iniciales: "Ev",
      nomencladores_text: "Nomencladores",
      configuraciones_text: "Configuraciones"
    };
  },
  computed: {
    ...mapState(["isRTL", "idioma"])
  },
  watch: {
    idioma(value) {
      if (value === "es") {
        this.perfil = "Perfil";
        this.perfil_iniciales = "Pe";
        this.cerrar_sesion = "Cerrar sesión";
        this.cerrar_sesion_iniciales = "Cs";
        this.boxeo_text = "Boxeo";
        this.combate_text = "Combate";
        this.combate_iniciales = "Co";
        this.informes_text = "Informes";
        this.informes_iniciales = "In";
        this.categorias_text = "Categorías";
        this.categorias_iniciales = "Ca";
        this.pugiles_text = "Púgiles";
        this.pugiles_iniciales = "Pu";
        this.teclas_text = "Teclas";
        this.teclas_iniciales = "Te";
        this.pruebas_text = "Pruebas";
        this.pruebas_iniciales = "Pr";
        this.lugares_text = "Lugares";
        this.lugares_iniciales = "Lu";
        this.deportes_text = "Deportes";
        this.deportes_iniciales = "De";
        this.disciplina_text = "Disciplinas";
        this.disciplinas_iniciales = "Di";
        this.deposrtista_text = "Deportistas";
        this.eventos_text = "Eventos";
        this.eventos_iniciales = "Ev";
        this.nomencladores_text = "Nomencladores";
        this.configuraciones_text = "Configuraciones";
      }
      if (value === "ru") {
        this.perfil = "Профиль";
        this.perfil_iniciales = "Пр";
        this.cerrar_sesion = "выйти";
        this.cerrar_sesion_iniciales = "вы";
        this.boxeo_text = "Бokc";
        this.combate_text = "Поединки";
        this.combate_iniciales = "Бо";
        this.informes_text = "Отчеты";
        this.informes_iniciales = "От";
        this.categorias_text = "Категории";
        this.categorias_iniciales = "Ка";
        this.pugiles_text = "Боксеры";
        this.pugiles_iniciales = "Бо";
        this.teclas_text = "Клавиши";
        this.teclas_iniciales = "Кл";
        this.pruebas_text = "Tести";
        this.pruebas_iniciales = "До";
        this.lugares_text = "Места";
        this.lugares_iniciales = "Ме";
        this.deportes_text = "Виды спорта";
        this.deportes_iniciales = "Ви";
        this.disciplina_text = "Дисциплины";
        this.disciplinas_iniciales = "Ди";
        this.deposrtista_text = "Спортсмены";
        this.eventos_text = "Mероприятия";
        this.eventos_iniciales = "Со";
        this.nomencladores_text = "Номенклаторы";
        this.configuraciones_text = "Настройки";
      }
      if (value === "in") {
        this.perfil = "Profile";
        this.perfil_iniciales = "Pr";
        this.cerrar_sesion = "Logout";
        this.cerrar_sesion_iniciales = "Lo";
        this.boxeo_text = "Boxing";
        this.combate_text = "Combat";
        this.combate_iniciales = "Co";
        this.informes_text = "Reports";
        this.informes_iniciales = "Re";
        this.categorias_text = "Categories";
        this.categorias_iniciales = "Ca";
        this.pugiles_text = "Boxers";
        this.pugiles_iniciales = "Bo";
        this.teclas_text = "Keys";
        this.teclas_iniciales = "Ke";
        this.pruebas_text = "Test";
        this.pruebas_iniciales = "Te";
        this.lugares_text = "Places";
        this.lugares_iniciales = "Pl";
        this.deportes_text = "Sports";
        this.deportes_iniciales = "Sp";
        this.disciplina_text = "Disciplines";
        this.disciplinas_iniciales = "Di";
        this.deposrtista_text = "Athletes";
        this.eventos_text = "Events";
        this.eventos_iniciales = "Ev";
        this.nomencladores_text = "Nomenclators";
        this.configuraciones_text = "Settings";
      }
      if (value === "fr") {
        this.perfil = "Profil";
        this.perfil_iniciales = "Pr";
        this.cerrar_sesion = "Session Cerrar";
        this.cerrar_sesion_iniciales = "Se";
        this.boxeo_text = "Boxéo";
        this.combate_text = "Combattre";
        this.combate_iniciales = "Co";
        this.informes_text = "Informe";
        this.informes_iniciales = "In";
        this.categorias_text = "Catégorie";
        this.categorias_iniciales = "Ca";
        this.pugiles_text = "Boxeurs";
        this.pugiles_iniciales = "Bo";
        this.teclas_text = "Clés";
        this.teclas_iniciales = "Cl";
        this.pruebas_text = "Preuve";
        this.pruebas_iniciales = "Pr";
        this.lugares_text = "Endroits";
        this.lugares_iniciales = "En";
        this.deportes_text = "Des sports";
        this.deportes_iniciales = "De";
        this.disciplina_text = "Disciplines";
        this.disciplinas_iniciales = "Di";
        this.deposrtista_text = "Les athlètes";
        this.eventos_text = "Événements";
        this.eventos_iniciales = "Ev";
        this.nomencladores_text = "Nomenclateurs";
        this.configuraciones_text = "Paramètres";
      }
    }
  },
  created() {
    if (this.idioma === "es") {
      this.perfil = "Perfil";
      this.perfil_iniciales = "Pe";
      this.cerrar_sesion = "Cerrar sesión";
      this.cerrar_sesion_iniciales = "Cs";
      this.boxeo_text = "Boxeo";
      this.combate_text = "Combate";
      this.combate_iniciales = "Co";
      this.informes_text = "Informes";
      this.informes_iniciales = "In";
      this.categorias_text = "Categorías";
      this.categorias_iniciales = "Ca";
      this.pugiles_text = "Púgiles";
      this.pugiles_iniciales = "Pu";
      this.teclas_text = "Teclas";
      this.teclas_iniciales = "Te";
      this.pruebas_text = "Pruebas";
      this.pruebas_iniciales = "Pr";
      this.lugares_text = "Lugares";
      this.lugares_iniciales = "Lu";
      this.deportes_text = "Deportes";
      this.deportes_iniciales = "De";
      this.disciplina_text = "Disciplinas";
      this.disciplinas_iniciales = "Di";
      this.deposrtista_text = "Deportistas";
      this.eventos_text = "Eventos";
      this.eventos_iniciales = "Ev";
      this.nomencladores_text = "Nomencladores";
      this.configuraciones_text = "Configuraciones";
    }
    if (this.idioma === "ru") {
      this.perfil = "Профиль";
      this.perfil_iniciales = "Пр";
      this.cerrar_sesion = "выйти";
      this.cerrar_sesion_iniciales = "вы";
      this.boxeo_text = "Бokc";
      this.combate_text = "Поединки";
      this.combate_iniciales = "Бо";
      this.informes_text = "Отчеты";
      this.informes_iniciales = "От";
      this.categorias_text = "Категории";
      this.categorias_iniciales = "Ка";
      this.pugiles_text = "Боксеры";
      this.pugiles_iniciales = "Бо";
      this.teclas_text = "Клавиши";
      this.teclas_iniciales = "Кл";
      this.pruebas_text = "Tести";
      this.pruebas_iniciales = "До";
      this.lugares_text = "Места";
      this.lugares_iniciales = "Ме";
      this.deportes_text = "Виды спорта";
      this.deportes_iniciales = "Ви";
      this.disciplina_text = "Дисциплины";
      this.disciplinas_iniciales = "Ди";
      this.deposrtista_text = "Спортсмены";
      this.eventos_text = "Mероприятия";
      this.eventos_iniciales = "Со";
      this.nomencladores_text = "Номенклаторы";
      this.configuraciones_text = "Настройки";
    }
    if (this.idioma === "in") {
      this.perfil = "Profile";
      this.perfil_iniciales = "Pr";
      this.cerrar_sesion = "Logout";
      this.cerrar_sesion_iniciales = "Lo";
      this.boxeo_text = "Boxing";
      this.combate_text = "Combat";
      this.combate_iniciales = "Co";
      this.informes_text = "Reports";
      this.informes_iniciales = "Re";
      this.categorias_text = "Categories";
      this.categorias_iniciales = "Ca";
      this.pugiles_text = "Boxers";
      this.pugiles_iniciales = "Bo";
      this.teclas_text = "Keys";
      this.teclas_iniciales = "Ke";
      this.pruebas_text = "Test";
      this.pruebas_iniciales = "Te";
      this.lugares_text = "Places";
      this.lugares_iniciales = "Pl";
      this.deportes_text = "Sports";
      this.deportes_iniciales = "Sp";
      this.disciplina_text = "Disciplines";
      this.disciplinas_iniciales = "Di";
      this.deposrtista_text = "Athletes";
      this.eventos_text = "Events";
      this.eventos_iniciales = "Ev";
      this.nomencladores_text = "Nomenclators";
      this.configuraciones_text = "Settings";
    }
    if (this.idioma === "fr") {
      this.perfil = "Profil";
      this.perfil_iniciales = "Pr";
      this.cerrar_sesion = "Session Cerrar";
      this.cerrar_sesion_iniciales = "Se";
      this.boxeo_text = "Boxéo";
      this.combate_text = "Combattre";
      this.combate_iniciales = "Co";
      this.informes_text = "Informe";
      this.informes_iniciales = "In";
      this.categorias_text = "Catégorie";
      this.categorias_iniciales = "Ca";
      this.pugiles_text = "Boxeurs";
      this.pugiles_iniciales = "Bo";
      this.teclas_text = "Clés";
      this.teclas_iniciales = "Cl";
      this.pruebas_text = "Preuve";
      this.pruebas_iniciales = "Pr";
      this.lugares_text = "Endroits";
      this.lugares_iniciales = "En";
      this.deportes_text = "Des sports";
      this.deportes_iniciales = "De";
      this.disciplina_text = "Disciplines";
      this.disciplinas_iniciales = "Di";
      this.deposrtista_text = "Les athlètes";
      this.eventos_text = "Événements";
      this.eventos_iniciales = "Ev";
      this.nomencladores_text = "Nomenclateurs";
      this.configuraciones_text = "Paramètres";
    }
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    async Logout() {
      await this.$store.dispatch("doLogout");
      this.$store.state.isAuth = false;
      await this.$router.push("/login");
    }
  }
};
</script>
