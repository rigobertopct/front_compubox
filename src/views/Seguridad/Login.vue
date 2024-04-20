<template>
  <div v-if="login" class="page-header align-items-start min-vh-100 fondo">
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
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-secondary shadow-dark border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  {{ encabezado }}
                </h4>
              </div>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">{{ usuario }}</label>
                <input @keyup.enter="Login"
                       class="form-control border-secondary border p-2"
                       id="email"
                       type="text"
                       name="email"
                       v-model="user"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">{{ password_text }}</label>
                <input @keyup.enter="Login"
                       class="form-control border-secondary border p-2"
                       id="password"
                       type="password"
                       name="password"
                       v-model="password"
                />
              </div>
              <div class="text-center">
                <div v-if="error"
                     class="bg-gradient-danger text-white p-3 d-flex align-items-center justify-content-center">
                  <i class="material-icons me-2">warning</i>
                  Credenciales Incorrectas
                </div>
                <button @keyup.enter="Login"
                        @click="Login"
                        class="my-4 mb-2 btn bg-gradient-secondary form-control"
                >{{ aceptar }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <nav class="navbar custom-navbar navbar-expand-md navbar-dark fixed-top" data-spy="affix" data-offset-top="10">
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
      <div class="container align-content-center">

        <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item ml-3 mb-2">
              <a @click="construccion=false" class="btn btn-light text-dark rounded enlace" style="width: min-content">
                <img class="icono" src="@/assets/iconos/home.png">
                <span class="texto">Inicio</span>
              </a>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/boxeo.png">
                  <span class="texto">{{ boxeo_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="Login_pruebas">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="Login_boxeo">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" href="https://cmsidc.xutil.cu">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" href="https://cmsidc.xutil.cu">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/pelota.png">
                  <span class="texto">{{ beisbol_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" href="https://gcmsidc.xutil.cu">{{ subsitema2_text }}
                  </a>
                  <a class="dropdown-item" href="https://cmsidc.xutil.cu">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/Lucha.png">
                  <span class="texto">{{ lucha_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/Karate.png">
                  <span class="texto">{{ karate_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/taekwondo.png">
                  <span class="texto">{{ taekwondo_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/yudo.png">
                  <span class="texto">{{ yudo_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/voleibol.png">
                  <span class="texto">{{ voleibol_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>
            <li class="nav-item ml-3 mb-2">
              <div class="dropdown d-inline-block">
                <a class="btn btn-light text-dark rounded dropdown-toggle enlace" type="button"
                   id="dropdownMenuButton"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img class="icono" src="@/assets/iconos/basketball.png">
                  <span class="texto">{{ baloncesto_text }}</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema1_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema2_text }}</a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema3_text }}
                  </a>
                  <a class="dropdown-item" @click="construccion=true">{{ subsitema4_text }}
                  </a>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </nav>
    <header class="header">
      <div class="overlay" v-if="construccion">
        <h1 class="title text-white">{{ pagina_construccion }}</h1>
      </div>
      <div class="overlay" v-else>
        <h1 class="subtitle text-white">{{ encabezado }}</h1>
        <h1 class="title text-white">{{ sid_text }}</h1>
      </div>
      <div class="shape">
        <svg viewBox="0 0 1500 200">
          <path
            d="m 0,240 h 1500.4828 v -71.92164 c 0,0 -286.2763,-81.79324 -743.19024,-81.79324 C 300.37862,86.28512 0,168.07836 0,168.07836 Z" />
        </svg>
      </div>
      <div class="mouse-icon">
        <div class="wheel"></div>
      </div>
    </header>
    <!-- End Of Page Header -->
    <section id="contact" class="section has-img-bg pb-0">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-4 text-center">
            <a href="http://cidc.inder.gob.cu">
              <img class="img-fluid" src="@/assets/iconos/logoCIDC.png"
                   style="height: 80px; width: 140px; cursor:pointer">
            </a>
          </div>
          <div class="col-4 text-center">
            <a href="http://www.cientex.cu">
              <img class="img-fluid" src="@/assets/iconos/logoPCT.png"
                   style="height: 80px; width: 200px; cursor:pointer">
            </a>
          </div>
          <div class="col-4 text-center">
            <a href="https://www.xetid.cu">
              <img class="img-fluid" src="@/assets/iconos/logoXETID.png"
                   style="height: 80px; width: 200px; cursor:pointer">
            </a>
          </div>
        </div>
        <!-- Page Footer -->
        <footer class="mt-5 py-4 border-top border-secondary">
          <p class="mb-0 small">&copy;
            {{ new Date().getFullYear() }}
            , {{ copyrigt }}
          </p>
        </footer>
        <!-- End of Page Footer -->
      </div>
    </section>
  </div>

</template>

<script>
import Navbar from "@/components/Navbar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { mapMutations } from "vuex";
import MaterialAlert from "@/components/MaterialAlert.vue";
import router from "@/router";
import gql from "graphql-tag";

const LOGIN = gql`
mutation TokenAuth($user: String!, $password: String!) {
    tokenAuth(password: $password, username: $user) {
        token
        success
        errors
        unarchiving
        user {
            id
            lastLogin
            username
            firstName
            lastName
            email
            isStaff
            isActive
            dateJoined
            pk
            archived
            verified
            secondaryEmail
            provincia {
                id
                nombre
                siglas
            }
           groups {
                id
                name
            }
        }
    }
}
`;
const GRUPO_USER = gql`
query GroupByUser($id:Int!) {
    groupByUser(userId: $id)
}`;
export default {
  name: "SigninBasic",
  data() {
    return {
      user: "",
      password: "",
      error: false,
      resp: null,
      encabezado: "Suite de Inteligencia del Deporte",
      pagina_construccion: "Página en construcción",
      boxeo_text: "Boxeo",
      beisbol_text: "Béisbol",
      lucha_text: "Lucha libre",
      karate_text: "Karate",
      taekwondo_text: "Taekwondo",
      yudo_text: "Yudo",
      voleibol_text: "Voleibol",
      baloncesto_text: "Baloncesto",
      sid_text: "SID",
      copyrigt: "Suite de Inteligencia Deportiva. Todos los Derechos Reservados. CIDC - PCT Matanzas - XETID ",
      subsitema1_text: "Monitoreo, Control y Evaluación integral funcional para el Deporte y la Actividad física",
      subsitema2_text: "Sistema de Captura de Variables",
      subsitema3_text: "Evaluación y predicción del rendimiento deportivo",
      subsitema4_text: "Estudio de adversarios",
      mostrarMenu: false,
      set_idioma: "",
      usuario: "Usuario",
      password_text: "Contraseña",
      aceptar: "Aceptar",
      login: false,
      construccion: false
    };
  },
  watch: {
    set_idioma(value) {
      if (value === "es") {
        this.encabezado = "Suite de Inteligencia del Deporte";
        this.usuario = "Usuario";
        this.password_text = "Contraseña";
        this.aceptar = "Aceptar";

        this.pagina_construccion = "Página en construcción";
        this.boxeo_text = "Boxeo";
        this.beisbol_text = "Béisbol";
        this.lucha_text = "Lucha libre";
        this.karate_text = "Karate";
        this.taekwondo_text = "Taekwondo";
        this.yudo_text = "Yudo";
        this.voleibol_text = "Voleibol";
        this.baloncesto_text = "Baloncesto";
        this.sid_text = "SID";
        this.copyrigt = "Suite de Inteligencia Deportiva. Todos los Derechos Reservados. CIDC - PCT Matanzas - XETID ";
        this.subsitema1_text = "Monitoreo, Control y Evaluación integral funcional para el Deporte y la Actividad física";
        this.subsitema2_text = "Sistema de Captura de Variables";
        this.subsitema3_text = "Evaluación y predicción del rendimiento deportivo";
        this.subsitema4_text = "Estudio de adversarios";
      }
      if (value === "ru") {
        this.encabezado = "Спортивная разведывательная сюита";
        this.usuario = "Пользователь";
        this.password_text = "Пароль";
        this.aceptar = "Принимать";

        this.pagina_construccion = "Страница в разработке";
        this.boxeo_text = "Бokc";
        this.beisbol_text = "Бейсбол";
        this.lucha_text = "Борьба";
        this.karate_text = "Каратэ";
        this.taekwondo_text = "Таэквондо";
        this.yudo_text = "дзюдо";
        this.voleibol_text = "Волейбол";
        this.baloncesto_text = "Баскетбол";
        this.sid_text = "СPC";
        this.copyrigt = "Спортивная разведывательная сюита. Все права защищены. CIDC - PCT Matanzas - XETID";
        this.subsitema1_text = "Мониторинг и контроль морфологической и функциональной эволюции физической активности";
        this.subsitema2_text = "Система сбора переменных";
        this.subsitema3_text = "Оценка и прогноз спортивных результатов";
        this.subsitema4_text = "Изучение противников";
      }
      if (value === "in") {
        this.encabezado = "Sports Intelligence Suite";
        this.usuario = "Username";
        this.password_text = "Password";
        this.aceptar = "Accept";

        this.pagina_construccion = "Page under construction";
        this.boxeo_text = "Boxing";
        this.beisbol_text = "Baseball";
        this.lucha_text = "Wrestling";
        this.karate_text = "Karate";
        this.taekwondo_text = "Taekwondo";
        this.yudo_text = "Judo";
        this.voleibol_text = "Volleyball";
        this.baloncesto_text = "Basketball";
        this.sid_text = "SID";
        this.copyrigt = "Sports Intelligence Suite. Copyright. CIDC - PCT Matanzas - XETID ";
        this.subsitema1_text = "Monitoring, Control and Comprehensive Functional Evaluation for Sports and Physical Activity";
        this.subsitema2_text = "Variables Capture System";
        this.subsitema3_text = "Evaluation and prediction of sports performance";
        this.subsitema4_text = "Study of adversaries";
      }
      if (value === "fr") {
        this.encabezado = "Suite d'intelligence sportive";
        this.usuario = "Utilisateur";
        this.password_text = "Mot de passe";
        this.aceptar = "Accepter";

        this.pagina_construccion = "Page en construction";
        this.boxeo_text = "Boxe";
        this.beisbol_text = "Base-ball";
        this.lucha_text = "Lutte libre";
        this.karate_text = "Karaté";
        this.taekwondo_text = "Taekwondo";
        this.yudo_text = "Judo";
        this.voleibol_text = "Volley-ball";
        this.baloncesto_text = "Basket-ball";
        this.sid_text = "SID";
        this.copyrigt = "Suite d'intelligence sportive. Tous droits réservés. CIDC - PCT Matanzas - XETID ";
        this.subsitema1_text = "Surveillance, contrôle et évaluation fonctionnelle complète pour le sport et l'activité physique";
        this.subsitema2_text = "Système de capture de variables";
        this.subsitema3_text = "Évaluation et prédiction des performances sportives";
        this.subsitema4_text = "Etude des adversaires";
      }
      this.$store.dispatch("setIdioma", value);
    }
  },
  created() {
    this.set_idioma = this.$store.state.idioma;
  },
  components: {
    MaterialAlert,
    Navbar,
    MaterialInput,
    MaterialSwitch,
    MaterialButton
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async Login() {
      if (this.user === "" || this.password === "") {
        this.error = true;
        return false;
      }
      try {
        await this.$apollo.mutate({
          mutation: LOGIN,
          variables: {
            user: this.user,
            password: this.password
          }
        }).then(response => {
          this.resp = response.data.tokenAuth;
        });
        if (this.resp.success) {
          const userId = this.resp.user.pk;
          this.$apollo.query({
            query: GRUPO_USER,
            variables: {
              id: parseInt(userId)
            }
          }).then(resp => {
            const grupo = resp.data.groupByUser;
            this.$store.dispatch("storeGroup", grupo);
          });
          const username = this.resp.user.username;
          const provincia = this.resp.user.provincia.id;
          await this.$store.dispatch("storeId", userId);
          await this.$store.dispatch("doLogin", username);
          await this.$store.dispatch("provinciaId", provincia);
          await router.push("/inicio");
        } else {
          this.error = true;
        }
      } catch (error) {
        this.error = true;
        console.log(error);
      }
    },
    Login_boxeo() {
      this.$store.state.origen_login = "boxeo";
      this.login = true;
    },
    Login_pruebas() {
      this.$store.state.origen_login = "pruebas";
      this.login = true;
    }
  }
};
</script>

<style scoped>
.fondo {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/img/Fondo/login_fondo.jpg");
  background-size: cover;
}

.container-login {
  z-index: 99;
}

.idioma {
  position: absolute;
  top: 28px;
  right: 20px;
}
</style>
