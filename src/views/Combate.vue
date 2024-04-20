<template>
  <div class="container">
    <div class="card shadow-lg p-1 mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-sm-12"><h5>{{ capturar_text }}</h5></div>
          <div class="col-md-3 col-lg-3 col-sm-12">
          </div>
          <div class="col-md-3 col-lg-3 col-sm-12">
          </div>
        </div>
        <div class="row">
          <h6 class="text-bold">{{ detalles_text }}</h6>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <span class="card-subtitle text-lg">{{ tipo_evento }}</span><br>
            {{ reglamento_text }}:<span class="ms-1">{{ reglamento }}</span><br>
            {{ esquina_roja_text }}:<span class="ms-1">{{ esquina_roja ? esquina_roja.deportista.nombre : "" }}</span>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <span class="card-subtitle text-lg">{{ nombre_evento }}</span><br>
            {{ round_text }}:<span class="ms-1">{{ rounds }}</span><br>
            {{ esquina_azul_text }}:<span class="ms-1">{{ esquina_azul ? esquina_azul.deportista.nombre : "" }}</span>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <span class="card-subtitle text-lg">{{ nombre }}</span><br>
            {{ tiempo_text }}:<span class="ms-1">{{ min }} : {{ seg }}</span><br>
            {{ fecha_text }}:<span class="ms-1">{{ fecha_selected }}</span><br>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow-lg p-4" v-if="vista_captura" :class="esquina==='azul'?'bg-azul':'bg-rojo'">
      <div class="row mb-5">
        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">{{ tiempo_combate_text }}: <span class="text-bold"
                                                                                       id="timer"> {{ min }} : {{ seg
          }} </span></div>
        <div class="col-lg-5 col-md-6 col-sm-12 d-flex mb-3">
          <a @click="play" class="d-flex align-items-center cursor-pointer me-2"
             :class="control?'text-success':''"><i
            class="material-icons-round opacity-10 me-1">play_circle_filled</i>{{ iniciar_text }}</a>
          <a @click="pause" class="d-flex align-items-center cursor-pointer me-2"
             :class="control?'':'text-danger'">
            <i class="material-icons-round opacity-10 me-1">pause_circle</i>{{ pausar_text }}</a>
          <a @click="endround" class="d-flex align-items-center cursor-pointer me-2"><i
            class="material-icons-round opacity-10 me-1">redo</i>{{ saltar_text }}</a>
          <a @click="endpelea" class="d-flex align-items-center cursor-pointer"><i
            class="material-icons-round opacity-10 me-1">close</i>{{ finalizar_text }}</a>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center mb-3">
          {{ rounds_text}}:
          <span class="icono-round text-white shadow-lg" v-for="item in rounds" :key="item"
                v-bind:class="item===round?'bg-gradient-success':'bg-gradient-dark'">{{ item
            }}</span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="tecla in configGolpes">
          <label>{{ tecla.golpe.golpe }} (<span
            class="text-bold">{{ tecla.golpe.efectivo ? efectivo_text : no_efectivo_text }}</span>)<br>
            <span class="text-bold">{{tecla_text}}: {{ tecla.tecla }}</span></label>
          <input :id="'tecla'+tecla.id" type="number" min="0" value="0"
                 class="form-control p-2 w-25 border border-secondary" disabled>
        </div>
      </div>
      <div class="row">
        <button @click="Regresar"
                class="btn btn-dark d-flex justify-content-center align-items-center w-auto">
          <i class="material-icons-round opacity-10 me-1">arrow_back</i>{{ regresar_text }}
        </button>
      </div>
    </div>
    <div class="card shadow-lg p-4" v-if="vista_nuevo">
      <label class="form-label">{{ seleccione_combate_text }}</label>
      <select v-model="combate" class="form-control border-secondary border mb-3 p-2">
        <option v-for="item in combates" :key="item.id" :value="item.id">{{ item.id }}-{{ item.nombre }} de
          {{ item.evento.nombre }}
        </option>
      </select>
      <label class="form-label">{{ esquina_capturar_text }}</label>
      <select @change="Change" v-model="esquina" class="form-control p-2 border-secondary border mb-3"
              v-bind:class="Esquina_Select">
        <option value="azul" class="text-white bg-info">{{ azul_text }}</option>
        <option value="roja" class="text-white bg-danger">{{ roja_text }}</option>
      </select>
      <div class="d-flex justify-content-between">
        <button @click="$router.push('/combate')" class="btn btn-secondary d-flex align-items-center">
          <i class="material-icons-round opacity-10 me-1">arrow_back</i>{{ regresar_text }}
        </button>
        <button @click="Siguiente_Edit" class="btn btn-dark d-flex align-items-center">
          {{ comenzar_combate_text }}<i class="material-icons-round opacity-10 ms-1">arrow_forward</i>
        </button>
      </div>
    </div>
    <div class="divModal">
      <div v-if="showModal" :class="['modal', { 'show': showModal }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="d-flex align-items-center justify-content-start"><i class="material-icons-round opacity-10">emoji_events</i>
              {{ resultados_combate_text }}
              <i @click="closeModal" class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <h5>{{ esquina_roja_text }}:<span class="ms-1 text-bold">{{ esquina_roja.deportista.nombre }}</span></h5>
            <select v-model="resultado_rojo" class="form-control p-2 border border-secondary mb-3">
              <option v-for="item in codifResult" :key="item.id" :value="item">{{ item.resul }} {{ por_text }}
                {{ item.descripcion }}
              </option>
            </select>
            <h5>{{ esquina_azul_text }}:<span class="ms-1 text-bold">{{ esquina_azul.deportista.nombre }}</span></h5>
            <select v-model="resultado_azul" class="form-control p-2 border border-secondary">
              <option v-for="item in codifResult" :key="item.id" :value="item">{{ item.resul }} {{ por_text }}
                {{ item.descripcion }}
              </option>
            </select>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeModal" class="btn btn-secondary" type="button">{{ cancelar_text }}</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Final" class="btn btn-dark" type="button">{{ guardar_text }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import MaterialButton from "@/components/MaterialButton.vue";
import Swal from "sweetalert2";
import moment from "moment";
import { mapState } from "vuex";

const COMBATES = gql`query Combates($name:String!, $idioma:String!) {
    combates(name:$name, idioma:$idioma) {
        id
        nombre
        fecha
        esquinaR {
           id
            ranking
            deportista {
                id
                nombre
                edad
                peso
                foto
                pais {
                    id
                    pais
                    siglas
                }
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        esquinaA {
           id
            ranking
            deportista {
                id
                nombre
                edad
                peso
                foto
                pais {
                    id
                    pais
                    siglas
                }
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        evento {
            id
            nombre
            reglamento {
                id
                tipo
                cantR
                duracion
            }
            tipoevento {
                id
                tipo
            }
        }
    }
}
`;
const EVENTOS = gql`query Eventos {
    eventos(name: "") {
        id
        nombre
        pais {
            id
            pais
            siglas
        }
        reglamento {
            id
            tipo
            cantR
            duracion
        }
        tipoevento {
            id
            tipo
        }
    }
}`;
const PUGILES = gql`query Pugiles {
    pugiles(name: "") {
        id
        ranking
        deportista {
            id
            nombre
            edad
            peso
            foto
            pais {
                id
                pais
                siglas
            }
        }
        categoria {
            id
            categoria
            pesoMin
            pesoMax
        }
    }
}
`;
const TECLAS = gql`query ConfigGolpes($name:String!, $usuario:Int!) {
    configGolpes(name: $name, usuario: $usuario) {
        id
        tecla
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
            password
            isSuperuser
        }
        golpe {
            id
            golpe
            siglas
            efectivo
        }
    }
}
`;
const CAPTURA = gql`mutation NuevoContador($esquina:Int!, $golpe:Int!, $numero:Int!, $combate:Int!, $tiempo:String!) {
    nuevoContador(esquina: $esquina, golpe: $golpe, numeroAsalto: $numero, combate: $combate, tiempo:$tiempo) {
        success
        errors
    }
}`;
const NUEVO_COMBATE = gql`mutation NuevoCombate($evento: Int!, $fecha: Date!, $azul: Int!, $roja: Int!, $nombre: String!) {
    nuevoCombate(
        evento: $evento
        fecha: $fecha
        esquinaA: $azul
        esquinaR: $roja
        nombre: $nombre
    ) {
        success
        errors
        combate {
            id
        nombre
        fecha
        esquinaA {
                id
                ranking
                deportista {
                    id
                    nombre
                    edad
                    peso
                    foto
                    pais {
                        id
                        pais
                        siglas
                    }
                }
                categoria {
                    id
                    categoria
                    pesoMin
                    pesoMax
                }
            }
        esquinaR {
                id
                ranking
                deportista {
                    id
                    nombre
                    edad
                    peso
                    foto
                    pais {
                        id
                        pais
                        siglas
                    }
                }
                categoria {
                    id
                    categoria
                    pesoMin
                    pesoMax
                }
            }
        evento {
            id
            nombre
            reglamento {
                id
                tipo
                cantR
                duracion
            }
            tipoevento {
                id
                tipo
            }
        }
        }
    }
}
`;
const RESULTADOS = gql`query CodifResult($name:String!, $idioma:String!) {
    codifResult(name: $name, idioma:$idioma) {
        id
        resul
        descripcion
    }
}`;
const GUARDAR_RESULTADO = gql`mutation NuevoResultado($combate:Int!, $pugil:Int!, $resultado:Int!) {
    nuevoResultado(combate: $combate, pugil: $pugil, resultado: $resultado) {
        success
        errors
    }
}`;
const RESULTADO_FINAL = gql`query ResultadoCombate($combate:Int!, $pugil:Int!) {
    resultadoCombate(combate: $combate, pugil: $pugil) {
        id
        combate {
            id
            nombre
            fecha
        }
        pugil {
            id
            ranking
            deportista {
                id
                nombre
                edad
                peso
                foto
                pais {
                    id
                    pais
                    siglas
                }
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        resultado {
            id
            resul
            descripcion
        }
    }
}`;
const COMBATE_BY_ID = gql`
query DatosCombate($id:Int!) {
    datosCombate(id: $id) {
        id
        nombre
        fecha
        esquinaR {
            id
            ranking
            deportista {
                id
                nombre
                edad
                peso
                estatura
                sexo
                foto
                ci
                annoDeporte
                annoNacional
                fechaNacimiento
                codigo
                isActive
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        esquinaA {
            id
            ranking
            deportista {
                id
                nombre
                edad
                peso
                estatura
                sexo
                foto
                ci
                annoDeporte
                annoNacional
                fechaNacimiento
                codigo
                isActive
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        evento {
            id
            nombre
            anno
            tipoevento {
                id
                tipo
            }
            reglamento {
                id
                tipo
                cantR
                duracion
            }
        }
    }
}
`;
export default {
  name: "Combate",
  components: { MaterialButton },
  data() {
    return {
      eventos: [],
      combates: [],
      resultado_rojo: null,
      resultado_azul: null,
      configGolpes: [],
      evento: null,
      codifResult: [],
      tipo_evento: "",
      reglamento: "",
      pugiles: [],
      vista_combate: false,
      vista_captura: false,
      vista_nuevo: true,
      vista_inicio: true,
      fecha: null,
      esquina: "",
      nombre: "",
      esquina_roja: 0,
      esquina_azul: 0,
      Esquina_Select: "",
      timer: "",
      min: 0,
      seg: 0,
      timerEnabled: false,
      control: false,
      round: 1,
      showModal: false,
      rounds: 0,
      duracion: 0,
      nombre_evento: "",
      siguiente: false,
      combate: 0,
      origen: "",
      fecha_selected: null,


      reglamento_text: "Reglamento",
      round_text: "Cantidad de rounds",
      tiempo_text: "Tiempo de cada round",
      evento_text: "Evento",
      esquina_roja_text: "Esquina roja",
      esquina_azul_text: "Esquina azul",
      fecha_text: "Fecha",
      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      comenzar_combate_text: "Comenzar combate",
      detalles_text: "Detalles del combate",

      tiempo_combate_text: "Tiempo de combate",
      iniciar_text: "Iniciar",
      pausar_text: "Pausar",
      saltar_text: "Saltar",
      finalizar_text: "Finalizar",
      por_text: "por",
      resultados_combate_text: "Definir resultados del combate",
      esquina_capturar_text: "Seleccione la esquina a capturar",
      azul_text: "Azul",
      roja_text: "Roja",
      seleccione_combate_text: "Seleccione el combate a capturar datos",
      regresar_text: "Regresar",
      capturar_text: "Capturar datos del combate",
      rounds_text:"Round",
      efectivo_text: "Efectivo",
      no_efectivo_text: "No efectivo",
      tecla_text: "Tecla",
    };
  },
  computed: {
    ...mapState(["idioma"])
  },
  apollo: {
    eventos: {
      query: EVENTOS,
      fetchPolicy: "cache-and-network"
    },
    combates: {
      query: COMBATES,
      variables() {
        return{
          name: "",
          idioma:this.idioma
        }
      },
      fetchPolicy: "cache-and-network"
    },
    pugiles: {
      query: PUGILES,
      fetchPolicy: "cache-and-network"
    },
    configGolpes: {
      query: TECLAS,
      variables() {
        return {
          name: "",
          usuario: this.$store.state.userid
        };
      },
      fetchPolicy: "cache-and-network"
    },
    codifResult: {
      query: RESULTADOS,
      variables() {
        return {
          name: "",
          idioma:this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    }
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        if (this.seg >= 0) {
          setTimeout(() => {
            if (this.seg === 0) {
              this.seg = 60;
              this.min--;
            }
            if (this.seg > 0) {
              this.seg--;
            }
            if (this.min === 0 && this.seg === 0) {
              this.endround();
            }
          }, 1000);
        }
      }
    },
    seg: {
      handler(value) {
        if (this.timerEnabled) {
          setTimeout(() => {
            if (value === 0) {
              this.seg = 60;
              this.min--;
            }
            if (this.seg > 0) {
              this.seg--;
            }
            if (this.min === 0 && this.seg === 0) {
              this.endround();
            }
          }, 1000);
        }
      }
    },
    evento(value) {
      this.tipo_evento = value.tipoevento.tipo;
      this.rounds = value.reglamento.cantR;
      this.min = value.reglamento.duracion / 60;
      this.seg = value.reglamento.duracion % 60;
      this.reglamento = value.reglamento.tipo;
      this.nombre_evento = value.nombre;
    },
    combate(id) {
      this.$apollo.query({
        query: COMBATE_BY_ID,
        variables: {
          id: id
        }
      }).then(response => {
        const value = response.data.datosCombate;
        this.evento = value.evento;
        this.nombre = value.nombre;
        this.esquina_roja = value.esquinaR;
        this.esquina_azul = value.esquinaA;
        this.fecha_selected = value.fecha;
      });
    },
    fecha(value) {
      console.log(value);
      if (value !== null) {
        const fecha1 = moment(value);
        const fecha2 = moment.now();
        if (fecha1 > fecha2) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: "error",
            title: "No puede crear una pelea en una fecha posterior al dia de hoy"
          });
          this.fecha = null;
        }
        this.fecha_selected = value.getDate() + "/" + parseInt(value.getMonth() + 1) + "/" + value.getFullYear();
      }
    },
    idioma() {
      if (this.idioma === "es") {
        this.evento_text = "Evento";
        this.comenzar_combate_text = "Comenzar combate";
        this.fecha_text = "Fecha";
        this.esquina_roja_text = "Esquina roja";
        this.esquina_azul_text = "Esquina azul";
        this.cancelar_text = "Cancelar";
        this.guardar_text = "Guardar";
        this.reglamento_text = "Reglamento";
        this.round_text = "Cantidad de rounds";
        this.tiempo_text = "Tiempo de cada round";
        this.detalles_text = "Detalles del combate";

        this.tiempo_combate_text = "Tiempo de combate";
        this.iniciar_text = "Iniciar";
        this.pausar_text = "Pausar";
        this.saltar_text = "Saltar";
        this.finalizar_text = "Finalizar";
        this.por_text = "por";
        this.resultados_combate_text = "Definir resultados del combate";
        this.esquina_capturar_text = "Seleccione la esquina a capturar";
        this.azul_text = "Azul";
        this.roja_text = "Roja";
        this.seleccione_combate_text = "Seleccione el combate a capturar datos";
        this.regresar_text = "Regresar";
        this.capturar_text = "Capturar datos del combate";
      }
      if (this.idioma === "ru") {
        this.evento_text = "Mероприятие";
        this.comenzar_combate_text = "Начать бой";
        this.fecha_text = "Дата";
        this.esquina_roja_text = "Kрасный угол";
        this.esquina_azul_text = "Cиний угол";
        this.guardar_text = "Принять";
        this.cancelar_text = "Отменить";
        this.reglamento_text = "Регулирование";
        this.round_text = "Количество раундов";
        this.tiempo_text = "Время каждого раунда";
        this.detalles_text = "Подробности боксерского поединка";

        this.tiempo_combate_text = "боевое время";
        this.iniciar_text = "Начинать";
        this.pausar_text = "Пауза";
        this.saltar_text = "Прыгать";
        this.finalizar_text = "Заканчивать";
        this.por_text = "к";
        this.resultados_combate_text = "Определить результаты боя";
        this.esquina_capturar_text = "Выберите угол для захвата";
        this.azul_text = "Синий";
        this.roja_text = "Красный";
        this.seleccione_combate_text = "Выберите бой для сбора данных";
        this.regresar_text = "Возвращаться";
        this.capturar_text = "Захватите боевые данные";
        this.rounds_text="Круглый"
      }
      if (this.idioma === "in") {
        this.evento_text = "Event";
        this.comenzar_combate_text = "Start combat";
        this.fecha_text = "Date";
        this.esquina_roja_text = "Red corner";
        this.esquina_azul_text = "Blue corner";
        this.cancelar_text = "Cancel";
        this.guardar_text = "Save";
        this.detalles_text = "Combat details";
        this.reglamento_text = "Regulation";
        this.round_text = "Number of rounds";
        this.tiempo_text = "Time of each round";

        this.tiempo_combate_text = "Combat time";
        this.iniciar_text = "Start";
        this.pausar_text = "Pause";
        this.saltar_text = "Jump";
        this.finalizar_text = "Finish";
        this.por_text = "by";
        this.resultados_combate_text = "Define combat results";
        this.esquina_capturar_text = "Select the corner to capture";
        this.azul_text = "Blue";
        this.roja_text = "Red";
        this.seleccione_combate_text = "Select the combat to capture data";
        this.regresar_text = "Back";
        this.capturar_text = "Capture combat data";
        this.rounds_text="Round"
      }
      if (this.idioma === "fr") {
        this.evento_text = "Événement";
        this.comenzar_combate_text = "Commencer le combat";
        this.fecha_text = "Date";
        this.esquina_roja_text = "Coin rouge";
        this.esquina_azul_text = "Coin bleu";
        this.cancelar_text = "Annuler";
        this.guardar_text = "Accepter";
        this.detalles_text = "Détails des combats";
        this.reglamento_text = "Régulation";
        this.round_text = "Nombre de tours";
        this.tiempo_text = "Temps de chaque tour";

        this.tiempo_combate_text = "Temps de combat";
        this.iniciar_text = "Commencer";
        this.pausar_text = "Pause";
        this.saltar_text = "Houblon";
        this.finalizar_text = "Finition";
        this.por_text = "pour";
        this.resultados_combate_text = "Définir les résultats du combat";
        this.esquina_capturar_text = "Sélectionnez le coin à capturer";
        this.azul_text = "Bleu";
        this.roja_text = "Rouge";
        this.seleccione_combate_text = "Sélectionnez le combat pour capturer les données";
        this.regresar_text = "Retourner";
        this.capturar_text = "Capturer des données de combat";
        this.rounds_text="Ronde"
      }
    }
  },
  methods: {
    Change() {
      if (this.esquina === "azul") {
        this.Esquina_Select = "bg-gradient-info text-white";
      }
      if (this.esquina === "roja") {
        this.Esquina_Select = "bg-gradient-danger text-white";
      }
    },
    async Siguiente() {
      if (this.fecha === null || this.evento === 0 || this.nombre === "" || this.esquina_roja === null ||
        this.esquina_azul === null) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        await Toast.fire({
          icon: "error",
          title: "Debe llenar todos los datos"
        });
        return false;
      } else {
        if (this.esquina_roja.id === this.esquina_azul.id) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });
          await Toast.fire({
            icon: "error",
            title: "No pueden ser los mismos boxeadores"
          });
          return false;
        }
        await this.$apollo.mutate({
          mutation: NUEVO_COMBATE,
          variables: {
            evento: this.evento.id,
            fecha: this.convertirADate(this.fecha),
            azul: this.esquina_azul ? this.esquina_azul.id : 0,
            roja: this.esquina_roja ? this.esquina_roja.id : 0,
            nombre: this.nombre
          }
        }).then(response => {
          if (response.data.nuevoCombate.success) {
            this.siguiente = true;
            this.vista_captura = true;
            this.vista_combate = false;
            this.combate = response.data.nuevoCombate.combate;
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              }
            });
            Toast.fire({
              icon: "error",
              title: response.data.nuevoCombate.errors
            });
          }
        }).catch(error => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: "error",
            title: error
          });
        });
      }
    },
    Regresar() {
      if (this.origen === "edit") {
        this.vista_captura = false;
        this.vista_nuevo = true;
      } else {
        this.vista_captura = false;
        this.vista_combate = true;
      }

    },
    play() {
      this.timerEnabled = true;
      this.control = true;
    },
    endround() {
      this.timerEnabled = false;
      this.control = false;
      this.round++;
      if (this.round <= this.rounds) {
        this.min = this.evento.reglamento.duracion / 60;
        this.seg = this.evento.reglamento.duracion % 60;
      } else {
        this.endpelea();
      }
    },
    endpelea() {
      this.openModal();
    },
    Final() {
      if (this.resultado_rojo === null || this.resultado_azul === null) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "error",
          title: "Debe seleccionar un resultado para cada púgil"
        });
        return false;
      }
      if (this.resultado_rojo.resul === this.resultado_azul.resul) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "error",
          title: "Los resultados no pueden ser iguales"
        });
        return false;
      }
      this.$apollo.mutate({
        mutation: GUARDAR_RESULTADO,
        variables: {
          pugil: this.esquina_azul.id,
          combate: this.combate,
          resultado: this.resultado_azul.id
        }
      }).then(response => {
        if (!response.data.nuevoResultado.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: "error",
            title: "Ocurrió un error al guardar los resultados"
          });
          return false;
        }
      });
      this.$apollo.mutate({
        mutation: GUARDAR_RESULTADO,
        variables: {
          pugil: this.esquina_roja.id,
          combate: this.combate.id,
          resultado: this.resultado_rojo.id
        }
      }).then(response => {
        if (!response.data.nuevoResultado.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: "error",
            title: "Ocurrió un error al guardar los resultados"
          });
          return false;
        }
      });
      this.$store.state.combate = this.combate;
      this.$router.push("/informes");
    },
    pause() {
      this.timerEnabled = false;
      this.control = false;
    },
    keyDownHandler(e) {
      if (this.control) {
        this.configGolpes.forEach(element => {
          if (e.key === element.tecla) {
            const input = document.getElementById("tecla" + element.id);
            input.value++;
            this.timer = this.min + ":" + this.seg;
            this.$apollo.mutate({
              mutation: CAPTURA,
              variables: {
                esquina: this.esquina === "azul" ? this.esquina_azul.id : this.esquina_roja.id,
                golpe: element.golpe.id,
                numero: this.round,
                combate: this.combate,
                tiempo: this.timer
              }
            });
          }
        });
      }
    },
    async openModal() {
      await this.$apollo.query({
        query: RESULTADO_FINAL,
        variables: {
          combate: this.combate,
          pugil: this.esquina_roja.id
        }
      }).then(response => {
        this.resultado_rojo = response.data.resultadoCombate ? response.data.resultadoCombate.resultado : 0;
      });
      await this.$apollo.query({
        query: RESULTADO_FINAL,
        variables: {
          combate: this.combate,
          pugil: this.esquina_azul.id
        }
      }).then(response => {
        this.resultado_azul = response.data.resultadoCombate ? response.data.resultadoCombate.resultado : 0;
      });
      this.showModal = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    onTransitionEnd(event) {
      if (event.propertyName === "opacity" && !this.showModal) {
        this.$emit("close");
      }
    },
    closeModal() {
      if (this.resultado_rojo === null || this.resultado_azul === null) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "error",
          title: "Debe seleccionar un resultado para cada púgil"
        });
        return false;
      }
      this.showModal = false;
      document.body.classList.remove("modal-open");
    },
    Nuevo_Combate() {
      this.vista_combate = true;
      this.vista_nuevo = false;
    },
    Editar_Combate() {
      this.vista_combate = false;
      this.vista_nuevo = true;
    },
    Siguiente_Edit() {
      if (this.combate === 0 || this.esquina === "") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "error",
          title: "Debe seleccionar el combate y la esquina a capturar"
        });
        return false;
      } else {
        this.vista_nuevo = false;
        this.vista_captura = true;
        this.origen = "edit";
      }
    },
    convertirADate(fecha) {
      const fechaDate = new Date(fecha); // Crea un objeto Date a partir de la cadena datetime
      const dia = fechaDate.getDate();
      const mes = fechaDate.getMonth() + 1; // ¡Recuerda que los meses en JavaScript van de 0 a 11!
      const anio = fechaDate.getFullYear();
      return `${anio}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""}${dia}`;
    }
  },
  created() {
    this.combate = this.$store.state.combate.id;
    if (this.idioma === "es") {
      this.evento_text = "Evento";
      this.comenzar_combate_text = "Comenzar combate";
      this.fecha_text = "Fecha";
      this.esquina_roja_text = "Esquina roja";
      this.esquina_azul_text = "Esquina azul";
      this.cancelar_text = "Cancelar";
      this.guardar_text = "Guardar";
      this.reglamento_text = "Reglamento";
      this.round_text = "Cantidad de rounds";
      this.tiempo_text = "Tiempo de cada round";
      this.detalles_text = "Detalles del combate";
      this.efectivo_text = "Efectivo";
      this.no_efectivo_text = "No efectivo";
      this.tecla_text = "Tecla";

      this.tiempo_combate_text = "Tiempo de combate";
      this.iniciar_text = "Iniciar";
      this.pausar_text = "Pausar";
      this.saltar_text = "Saltar";
      this.finalizar_text = "Finalizar";
      this.por_text = "por";
      this.resultados_combate_text = "Definir resultados del combate";
      this.esquina_capturar_text = "Seleccione la esquina a capturar";
      this.azul_text = "Azul";
      this.roja_text = "Roja";
      this.seleccione_combate_text = "Seleccione el combate a capturar datos";
      this.regresar_text = "Regresar";
      this.capturar_text = "Capturar datos del combate";
    }
    if (this.idioma === "ru") {
      this.evento_text = "Mероприятие";
      this.comenzar_combate_text = "Начать бой";
      this.fecha_text = "Дата";
      this.esquina_roja_text = "Kрасный угол";
      this.esquina_azul_text = "Cиний угол";
      this.guardar_text = "Принять";
      this.cancelar_text = "Отменить";
      this.reglamento_text = "Регулирование";
      this.round_text = "Количество раундов";
      this.tiempo_text = "Время каждого раунда";
      this.detalles_text = "Подробности боксерского поединка";
      this.efectivo_text = "Наличные";
      this.no_efectivo_text = "Нет наличных";
      this.tecla_text = "Kлавиша";

      this.tiempo_combate_text = "боевое время";
      this.iniciar_text = "Начинать";
      this.pausar_text = "Пауза";
      this.saltar_text = "Прыгать";
      this.finalizar_text = "Заканчивать";
      this.por_text = "к";
      this.resultados_combate_text = "Определить результаты боя";
      this.esquina_capturar_text = "Выберите угол для захвата";
      this.azul_text = "Синий";
      this.roja_text = "Красный";
      this.seleccione_combate_text = "Выберите бой для сбора данных";
      this.regresar_text = "Возвращаться";
      this.capturar_text = "Захватите боевые данные";
      this.rounds_text="Круглый"
    }
    if (this.idioma === "in") {
      this.evento_text = "Event";
      this.comenzar_combate_text = "Start combat";
      this.fecha_text = "Date";
      this.esquina_roja_text = "Red corner";
      this.esquina_azul_text = "Blue corner";
      this.cancelar_text = "Cancel";
      this.guardar_text = "Save";
      this.detalles_text = "Combat details";
      this.reglamento_text = "Regulation";
      this.round_text = "Number of rounds";
      this.tiempo_text = "Time of each round";
      this.efectivo_text = "Effectiveness";
      this.no_efectivo_text = "No Effectiveness";
      this.tecla_text = "Key";

      this.tiempo_combate_text = "Combat time";
      this.iniciar_text = "Start";
      this.pausar_text = "Pause";
      this.saltar_text = "Jump";
      this.finalizar_text = "Finish";
      this.por_text = "by";
      this.resultados_combate_text = "Define combat results";
      this.esquina_capturar_text = "Select the corner to capture";
      this.azul_text = "Blue";
      this.roja_text = "Red";
      this.seleccione_combate_text = "Select the combat to capture data";
      this.regresar_text = "Back";
      this.capturar_text = "Capture combat data";
      this.rounds_text="Round"
    }
    if (this.idioma === "fr") {
      this.evento_text = "Événement";
      this.comenzar_combate_text = "Commencer le combat";
      this.fecha_text = "Date";
      this.esquina_roja_text = "Coin rouge";
      this.esquina_azul_text = "Coin bleu";
      this.cancelar_text = "Annuler";
      this.guardar_text = "Accepter";
      this.detalles_text = "Détails des combats";
      this.reglamento_text = "Régulation";
      this.round_text = "Nombre de tours";
      this.tiempo_text = "Temps de chaque tour";
      this.efectivo_text = "Espèces";
      this.no_efectivo_text = "Pas d'argent";
      this.tecla_text = "Tecla";

      this.tiempo_combate_text = "Temps de combat";
      this.iniciar_text = "Commencer";
      this.pausar_text = "Pause";
      this.saltar_text = "Houblon";
      this.finalizar_text = "Finition";
      this.por_text = "pour";
      this.resultados_combate_text = "Définir les résultats du combat";
      this.esquina_capturar_text = "Sélectionnez le coin à capturer";
      this.azul_text = "Bleu";
      this.roja_text = "Rouge";
      this.seleccione_combate_text = "Sélectionnez le combat pour capturer les données";
      this.regresar_text = "Retourner";
      this.capturar_text = "Capturer des données de combat";
      this.rounds_text="Ronde"
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keyDownHandler);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keyDownHandler);
  }
};
</script>

<style scoped>
.card-body span {
  font-weight: bold;
}

.icono-round {
  margin-left: 0.3rem;
  font-size: 10px;
  font-weight: bold;
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 50%;
}

.modal {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.modal.show {
  opacity: 1;
}

.bg-azul {
  background-color: rgba(3, 98, 245, 0.20);
}

.bg-rojo {
  background-color: rgba(245, 3, 3, 0.20);
}
</style>
