<template>
  <div class="container">
    <div class="card shadow-lg p-1 mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-sm-12"><h5>Capturar datos del combate</h5></div>
          <div class="col-md-3 col-lg-3 col-sm-12">
            <button @click="Nuevo_Combate"
                    class="btn btn-success d-flex align-items-center justify-content-center w-100">
              <i class="material-icons-round opacity-10 me-1">add_circle</i>
              Nuevo combate
            </button>
          </div>
          <div class="col-md-3 col-lg-3 col-sm-12">
            <button @click="Editar_Combate" class="btn btn-info d-flex align-items-center justify-content-center w-100">
              <i class="material-icons-round opacity-10 me-1">edit</i>
              Combate existente
            </button>
          </div>
        </div>
        <div class="row">
          <h6 class="text-bold">Detalles del combate</h6>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <span class="card-subtitle text-lg">{{ tipo_evento }}</span><br>
            Reglamento:<span class="ms-1">{{ reglamento }}</span><br>
            Esquina roja:<span class="ms-1">{{ esquina_roja ? esquina_roja.nombre : "" }}</span>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <span class="card-subtitle text-lg">{{ nombre_evento }}</span><br>
            Cantidad de rounds:<span class="ms-1">{{ rounds }}</span><br>
            Esquina azul:<span class="ms-1">{{ esquina_azul ? esquina_azul.nombre : "" }}</span>
          </div>
          <div class="col-md-4 col-lg-4 col-sm-12">
            <span class="card-subtitle text-lg">{{ nombre }}</span><br>
            Tiempo de cada round:<span class="ms-1">{{ min }} : {{ seg }}</span><br>
            Fecha:<span class="ms-1">{{ fecha }}</span><br>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow-lg p-4" v-if="vista_combate">
      <div class="row">
        <div class="col-md-6 col-lg-6">
          <label class="form-label">Fecha</label>
          <input v-model="fecha" type="date" class="form-control p-2 border-secondary border mb-3">
          <label class="form-label">Nombre del combate</label>
          <input type="text" v-model="nombre" class="form-control p-2 border-secondary border mb-3">
          <label class="form-label">Esquina roja</label>
          <select v-model="esquina_roja" class="form-control p-2 text-white mb-3 bg-gradient-danger">
            <option class="text-dark" value="0" disabled>Seleccione un púgil</option>
            <option class="text-dark" v-for="item in pugiles" :key="item.id" :value="item">{{ item.nombre }}</option>
          </select>
        </div>
        <div class="col-md-6 col-lg-6">
          <label class="form-label">Evento</label>
          <select v-model="evento" class="form-control p-2 border-secondary border mb-3">
            <option value="0" disabled>Seleccione un evento</option>
            <option v-for="item in eventos" :key="item.id" :value="item">{{ item.nombre }}</option>
          </select>
          <label class="form-label">Esquina a capturar</label>
          <select @change="Change" v-model="esquina" class="form-control p-2 border-secondary border mb-3"
                  v-bind:class="Esquina_Select">
            <option value="" disabled>Seleccione la esquina a capturar</option>
            <option value="azul" class="text-white bg-info">Azul</option>
            <option value="roja" class="text-white bg-danger">Roja</option>
          </select>
          <label class="form-label">Esquina azul</label>
          <select v-model="esquina_azul" class="form-control p-2 text-white mb-3 bg-gradient-info">
            <option class="text-dark" value="0" disabled>Seleccione un púgil</option>
            <option class="text-dark" v-for="item in pugiles" :key="item.id" :value="item">{{ item.nombre }}</option>
          </select>
          <div class="d-flex justify-content-end">
            <button @click="Siguiente" class="btn btn-dark d-flex align-items-center">
              Comenzar combate<i class="material-icons-round opacity-10 ms-1">arrow_forward</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="card shadow-lg p-4" v-if="vista_captura">
      <div class="row mb-5">
        <div class="col-lg-3 col-md-6 col-sm-12 mb-3">Tiempo de combate: <span class="text-bold" id="timer"> {{ min }} : {{ seg
          }} </span></div>
        <div class="col-lg-5 col-md-6 col-sm-12 d-flex mb-3">
          <a @click="play" class="d-flex align-items-center cursor-pointer me-2"
             :class="control?'text-success':''"><i
            class="material-icons-round opacity-10 me-1">play_circle_filled</i>Iniciar</a>
          <a @click="pause" class="d-flex align-items-center cursor-pointer me-2"
             :class="control?'':'text-danger'">
            <i class="material-icons-round opacity-10 me-1">pause_circle</i>Pausar</a>
          <a @click="endround" class="d-flex align-items-center cursor-pointer me-2"><i
            class="material-icons-round opacity-10 me-1">redo</i>Saltar</a>
          <a @click="endpelea" class="d-flex align-items-center cursor-pointer"><i
            class="material-icons-round opacity-10 me-1">close</i>Finalizar</a>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-center mb-3">
          Rounds:
          <span class="icono-round text-white shadow-lg" v-for="item in rounds" :key="item"
                v-bind:class="item===round?'bg-gradient-success':'bg-gradient-dark'">{{ item
            }}</span>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-lg-4 col-md-6 col-sm-12" v-for="tecla in configGolpes">
          <label>{{ tecla.golpe.golpe }} (<span
            class="text-bold">{{ tecla.golpe.efectivo ? "Efectivo" : "No efectivo" }}</span>)<br>
            <span class="text-bold">Tecla: {{ tecla.tecla }}</span></label>
          <input :id="'tecla'+tecla.id" type="number" min="0" value="0"
                 class="form-control p-2 w-25 border border-secondary">
        </div>
      </div>
      <div class="row">
        <button @click="Regresar"
                class="btn btn-dark d-flex justify-content-center align-items-center w-auto">
          <i class="material-icons-round opacity-10 me-1">arrow_back</i>Regresar
        </button>
      </div>
    </div>
    <div class="card shadow-lg p-4" v-if="vista_nuevo">
      <label class="form-label">Seleccione el combate a capturar datos</label>
      <select v-model="combate" class="form-control border-secondary border mb-3 p-2">
        <option v-for="item in combates" :key="item.id" :value="item">{{ item.id }}-{{ item.nombre }} de
          {{ item.evento.nombre }}
        </option>
      </select>
      <label class="form-label">Esquina a capturar</label>
      <select @change="Change" v-model="esquina" class="form-control p-2 border-secondary border mb-3"
              v-bind:class="Esquina_Select">
        <option value="" disabled>Seleccione la esquina a capturar</option>
        <option value="azul" class="text-white bg-info">Azul</option>
        <option value="roja" class="text-white bg-danger">Roja</option>
      </select>
      <div class="d-flex justify-content-end">
        <button @click="Siguiente_Edit" class="btn btn-dark d-flex align-items-center">
          Comenzar combate<i class="material-icons-round opacity-10 ms-1">arrow_forward</i>
        </button>
      </div>
    </div>
    <div class="divModal">
      <div v-if="showModal" :class="['modal', { 'show': showModal }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="d-flex align-items-center justify-content-start"><i class="material-icons-round opacity-10">emoji_events</i>Definir
              resultados del
              combate<i
                @click="closeModal"
                class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <h5>Esquina Roja:<span class="ms-1 text-bold">{{ esquina_roja.nombre }}</span></h5>
            <select v-model="resultado_rojo" class="form-control p-2 border border-secondary mb-3">
              <option v-for="item in codifResult" :key="item.id" :value="item">{{ item.resul }} por
                {{ item.descripcion }}
              </option>
            </select>
            <h5>Esquina Azul:<span class="ms-1 text-bold">{{ esquina_azul.nombre }}</span></h5>
            <select v-model="resultado_azul" class="form-control p-2 border border-secondary">
              <option v-for="item in codifResult" :key="item.id" :value="item">{{ item.resul }} por
                {{ item.descripcion }}
              </option>
            </select>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeModal" class="btn btn-secondary" type="button">Cancelar</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Final" class="btn btn-dark" type="button">Guardar</button>
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

const COMBATES = gql`query Combates($name:String!) {
    combates(name:$name) {
        id
        nombre
        fecha
        esquinaR {
            id
            nombre
            edad
            peso
            foto
        }
        esquinaA {
            id
            nombre
            edad
            peso
            foto
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
        nombre
        edad
        peso
        foto
        categoria {
            id
            categoria
            pesoMin
            pesoMax
        }
        pais {
            id
            pais
            siglas
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
        esquinaR {
            id
            nombre
            edad
            peso
            foto
        }
        esquinaA {
            id
            nombre
            edad
            peso
            foto
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
const RESULTADOS = gql`query CodifResult($name:String!) {
    codifResult(name: $name) {
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
            nombre
            edad
            peso
            foto
        }
        resultado {
            id
            resul
            descripcion
        }
    }
}`;
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
      vista_nuevo: false,
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
      origen: ""
    };
  },
  apollo: {
    eventos: {
      query: EVENTOS,
      fetchPolicy: "cache-and-network"
    },
    combates: {
      query: COMBATES,
      variables: {
        name: ""
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
          name: ""
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
    combate(value) {
      this.evento = value.evento;
      this.nombre = value.nombre;
      this.esquina_roja = value.esquinaR;
      this.esquina_azul = value.esquinaA;
      this.fecha = value.fecha;
    },
    fecha(value) {
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
            fecha: this.fecha,
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
          combate: this.combate.id,
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
                combate: this.combate.id,
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
          combate: this.combate.id,
          pugil: this.esquina_roja.id
        }
      }).then(response => {
        this.resultado_rojo = response.data.resultadoCombate.resultado;
      });
      await this.$apollo.query({
        query: RESULTADO_FINAL,
        variables: {
          combate: this.combate.id,
          pugil: this.esquina_azul.id
        }
      }).then(response => {
        this.resultado_azul = response.data.resultadoCombate.resultado;
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
      if (this.combate === null || this.esquina === "") {
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
</style>
