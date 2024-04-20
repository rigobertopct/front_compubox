<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ combates_text }}</h5>
        </div>
        <div class="d-flex justify-content-between m-3">
          <div class="col-3">
            <div class="input-group">
              <input v-model="name" type="text" class="form-control border-bottom border-dark input-icon"
                     :placeholder="buscar_text" aria-label="Recipient's username" aria-describedby="button-addon2">
            </div>
          </div>
          <div class="col-8 text-end">
            <button @click="openModal" class="btn btn-dark align-content-end">
              <i class="fa fa-plus-square me-2"></i> {{ nuevo_text }}
            </button>
          </div>
          <div class="col-1"></div>
        </div>
        <div class="table-responsive">
          <table id="datatable-basic" class="table table-flush">
            <thead class="thead-light">
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ pugiles_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ evento_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ acciones_text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in combates" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.esquinaR.deportista.nombre }} vs
                {{ item.esquinaA.deportista.nombre }}
              </td>
              <td class="text-sm font-weight-normal ps-4">{{ item.nombre }} - {{ item.evento.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button @click="openUpdate(item)"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="editar_text" data-container="body" data-animation="true"
                          class="btn btn-info p-1 ms-1">
                    <i class="material-icons opacity-10">edit</i></button>
                  <button @click="comenzarCombate(item)"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="comenzar_combate_text" data-container="body" data-animation="true"
                          class="btn btn-success p-1 ms-1">
                    <i class="material-icons opacity-10">play_circle_filled</i></button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="divModal Nuevo">
      <div v-if="showModal" :class="['modal', { 'show': showModal }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nuevo_combate_text }}<i @click="closeModal"
                                                                                                    class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-lg-6">
              <label class="form-label">{{ nombre_combate_text }}</label>
              <input type="text" v-model="nombre" class="form-control p-2 border-secondary border mb-3">
              <label class="form-label">{{ fecha_text }}</label>
              <VueDatePicker v-model="fecha" :enable-time-picker="false"
                             auto-apply locale="es" class="form_fecha mb-3" />
              <label class="form-label">{{ esquina_roja_text }}</label>
              <select :disabled="categoria===0" v-model="esquina_roja"
                      class="form-select p-2 text-white mb-3 bg-gradient-danger">
                <option class="text-dark" v-for="item in pugiles" :key="item.id" :value="item.id"
                        v-show="item.categoria.id===categoria">
                  {{ item.deportista.nombre}}
                </option>
              </select>
            </div>
            <div class="col-md-6 col-lg-6">
              <label class="form-label">{{ evento_text }}</label>
              <select v-model="evento" class="form-control p-2 border-secondary border mb-3">
                <option v-for="item in eventos" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
              <label class="form-label">{{ categorias_text }}</label>
              <select v-model="categoria" class="form-control p-2 border-secondary border mb-3">
                <option v-for="item in categorias" :key="item.id" :value="item.id">{{ item.categoria }}</option>
              </select>
              <label class="form-label">{{ esquina_azul_text }}</label>
              <select :disabled="categoria===0" v-model="esquina_azul"
                      class="form-select p-2 text-white mb-3 bg-gradient-info">
                <option class="text-dark" v-for="item in pugiles" :key="item.id" :value="item.id"
                        v-show="item.categoria.id===categoria">{{ item.deportista.nombre}}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeModal" class="btn btn-secondary" type="button">{{ cancelar_text }}</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Guardar" class="btn btn-dark" type="button">{{ guardar_text }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divModal Actualizar">
      <div v-if="showUpdate" :class="['modal', { 'show': showUpdate }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ actualizar_combate_text }}<i
              @click="closeUpdate"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-lg-6">
              <label class="form-label">{{ nombre_combate_text }}</label>
              <input type="text" v-model="nombre" class="form-control p-2 border-secondary border mb-3">
              <label class="form-label">{{ fecha_text }}</label>
              <VueDatePicker v-model="fecha" :enable-time-picker="false" placeholder="Seleccione una fecha"
                             auto-apply locale="es" class="form_fecha mb-3" />
              <label class="form-label">{{ esquina_roja_text }}</label>
              <select :disabled="categoria===0" v-model="esquina_roja"
                      class="form-control p-2 text-white mb-3 bg-gradient-danger">
                <option class="text-dark" v-for="item in pugiles" :key="item.id" :value="item.id">
                  {{ item.deportista.nombre
                  }}
                </option>
              </select>
            </div>
            <div class="col-md-6 col-lg-6">
              <label class="form-label">{{ evento_text }}</label>
              <select v-model="evento" class="form-control p-2 border-secondary border mb-3">
                <option v-for="item in eventos" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
              <label class="form-label">{{ categorias_text }}</label>
              <select v-model="categoria" class="form-control p-2 border-secondary border mb-3">
                <option v-for="item in categorias" :key="item.id" :value="item.id">{{ item.categoria }}</option>
              </select>
              <label class="form-label">{{ esquina_azul_text }}</label>
              <select :disabled="categoria===0" v-model="esquina_azul"
                      class="form-control p-2 text-white mb-3 bg-gradient-info">
                <option class="text-dark" v-for="item in pugiles" :key="item.id" :value="item.id"
                        v-show="item.categoria.id===categoria">{{ item.deportista.nombre
                  }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeUpdate" class="btn btn-secondary" type="button">{{ cancelar_text }}</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Actualizar" class="btn btn-dark" type="button">{{ guardar_text }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { mapState } from "vuex";

const BUSCAR = gql`
query Combates($name:String!, $idioma:String!) {
    combates(name: $name, idioma:$idioma) {
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
            reglamento {
                id
                tipo
                cantR
                duracion
            }
            anno
            tipoevento {
                id
                tipo
            }
        }
    }
}
`;
const NUEVO = gql`
mutation NuevoCombate($evento: Int!, $fecha: Date!, $azul: Int!, $roja: Int!, $nombre: String!, $idioma:String!) {
    nuevoCombate(
        evento: $evento
        fecha: $fecha
        esquinaA: $azul
        esquinaR: $roja
        nombre: $nombre
        idioma:$idioma
    ) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`
mutation ActualizarCombate(
    $evento:Int!
    $id:Int!
    $esquinaA:Int!
    $esquinaR:Int!
    $fecha:Date!
) {
    actualizarCombate(
        evento: $evento
        id: $id
        esquinaA: $esquinaA
        esquinaR: $esquinaR
        fecha: $fecha
    ) {
        success
        errors
    }
}
`;
const EVENTOS = gql`query Eventos($idioma:String!) {
    eventos(name: "", idioma:$idioma) {
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
const CATEGORIAS = gql`
query Categorias($idioma:String!) {
    categorias(name: "", idioma:$idioma) {
        id
        categoria
        pesoMin
        pesoMax
    }
}`;
export default {
  name: "Resultados",
  data() {
    return {
      combates: [],
      categorias: [],
      pugiles: [],
      eventos: [],
      name: "",
      showModal: false,
      error: false,
      error_tex: "",
      categoria: 0,
      peso_max: 0,
      peso_min: 0,
      id: 0,
      showUpdate: false,
      fecha: null,
      nombre: "",
      esquina_roja: 0,
      evento: 0,
      esquina: "",
      esquina_azul: 0,
      fecha_selected: null,

      combates_text: "Combates",
      pugiles_text: "Púgiles",
      evento_text: "Evento",
      comenzar_combate_text: "Comenzar combate",
      nuevo_combate_text: "Nuevo combate",
      nombre_combate_text: "Nombre del combate",
      fecha_text: "Fecha",
      categorias_text: "Categorías",
      esquina_roja_text: "Esquina roja",
      esquina_azul_text: "Esquina azul",
      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      actualizar_combate_text: "Actualizar combate",

      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar"

    };
  },
  computed: {
    ...mapState(["idioma"])
  },
  created() {
    if (this.idioma === "es") {
      this.combates_text = "Combates";
      this.pugiles_text = "Púgiles";
      this.evento_text = "Evento";
      this.comenzar_combate_text = "Comenzar combate";
      this.nuevo_combate_text = "Nuevo combate";
      this.nombre_combate_text = "Nombre del combate";
      this.fecha_text = "Fecha";
      this.categorias_text = "Categorías";
      this.esquina_roja_text = "Esquina roja";
      this.esquina_azul_text = "Esquina azul";
      this.actualizar_combate_text = "Actualizar combate";

      this.acciones_text = "Acciones";
      this.buscar_text = "Buscar";
      this.nuevo_text = "Nuevo";
      this.editar_text = "Editar";
      this.cancelar_text = "Cancelar";
      this.guardar_text = "Guardar";
    }
    if (this.idioma === "ru") {
      this.combates_text = "Поединки";
      this.pugiles_text = "Боксеры";
      this.evento_text = "Mероприятие";
      this.comenzar_combate_text = "Начать бой";
      this.nuevo_combate_text = "Новый бой";
      this.nombre_combate_text = "Имя";
      this.fecha_text = "Дата";
      this.categorias_text = "Категории";
      this.esquina_roja_text = "Kрасный угол";
      this.esquina_azul_text = "Cиний угол";
      this.actualizar_combate_text = "Обновление боя";

      this.acciones_text = "Действия";
      this.buscar_text = "Искать";
      this.nuevo_text = "Новый";
      this.editar_text = "Редактировать";
      this.cancelar_text = "Отменить";
      this.guardar_text = "Принять";
    }
    if (this.idioma === "in") {
      this.combates_text = "Fighting";
      this.pugiles_text = "Boxers";
      this.evento_text = "Event";
      this.comenzar_combate_text = "Start combat";
      this.nuevo_combate_text = "New combat";
      this.nombre_combate_text = "Combat name";
      this.fecha_text = "Date";
      this.categorias_text = "Categories";
      this.esquina_roja_text = "Red corner";
      this.esquina_azul_text = "Blue corner";
      this.actualizar_combate_text = "Update combat";

      this.acciones_text = "Actions";
      this.buscar_text = "Search";
      this.nuevo_text = "New";
      this.editar_text = "Edit";
      this.cancelar_text = "Cancel";
      this.guardar_text = "Save";
    }
    if (this.idioma === "fr") {
      this.combates_text = "Lutte";
      this.pugiles_text = "Boxeurs";
      this.evento_text = "Événement";
      this.comenzar_combate_text = "Commencer le combat";
      this.nuevo_combate_text = "Nouveau combat";
      this.nombre_combate_text = "Nom du combat";
      this.fecha_text = "Date";
      this.categorias_text = "Catégories";
      this.esquina_roja_text = "Coin rouge";
      this.esquina_azul_text = "Coin bleu";
      this.actualizar_combate_text = "Mettre à jour les combats";

      this.acciones_text = "Actions";
      this.buscar_text = "Chercher";
      this.nuevo_text = "Nouveau";
      this.editar_text = "Modifier";
      this.cancelar_text = "Annuler";
      this.guardar_text = "Accepter";
    }
  },
  apollo: {
    combates: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name,
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    eventos: {
      query: EVENTOS,
      variables() {
        return {
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    pugiles: {
      query: PUGILES,
      fetchPolicy: "cache-and-network"
    },
    categorias: {
      query: CATEGORIAS,
      variables() {
        return {
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    }
  },
  watch: {
    fecha(value) {
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
      }
    },
    idioma() {
      if (this.idioma === "es") {
        this.combates_text = "Combates";
        this.pugiles_text = "Púgiles";
        this.evento_text = "Evento";
        this.comenzar_combate_text = "Comenzar combate";
        this.nuevo_combate_text = "Nuevo combate";
        this.nombre_combate_text = "Nombre del combate";
        this.fecha_text = "Fecha";
        this.categorias_text = "Categorías";
        this.esquina_roja_text = "Esquina roja";
        this.esquina_azul_text = "Esquina azul";

        this.acciones_text = "Acciones";
        this.buscar_text = "Buscar";
        this.nuevo_text = "Nuevo";
        this.editar_text = "Editar";
        this.cancelar_text = "Cancelar";
        this.guardar_text = "Guardar";
      }
      if (this.idioma === "ru") {
        this.combates_text = "Боевые действия";
        this.pugiles_text = "Боксеры";
        this.evento_text = "Событие";
        this.comenzar_combate_text = "Начать бой";
        this.nuevo_combate_text = "Новый бой";
        this.nombre_combate_text = "Боевое имя";
        this.fecha_text = "Дата";
        this.categorias_text = "Категории";
        this.esquina_roja_text = "красный угол";
        this.esquina_azul_text = "синий угол";

        this.acciones_text = "Действия";
        this.buscar_text = "Искать";
        this.nuevo_text = "Новый";
        this.editar_text = "Редактировать";
        this.cancelar_text = "Отмена";
        this.guardar_text = "Держать";
      }
      if (this.idioma === "in") {
        this.combates_text = "Fighting";
        this.pugiles_text = "Boxers";
        this.evento_text = "Event";
        this.comenzar_combate_text = "Start combat";
        this.nuevo_combate_text = "New combat";
        this.nombre_combate_text = "Combat name";
        this.fecha_text = "Date";
        this.categorias_text = "Categories";
        this.esquina_roja_text = "Red corner";
        this.esquina_azul_text = "Blue corner";

        this.acciones_text = "Actions";
        this.buscar_text = "Search";
        this.nuevo_text = "New";
        this.editar_text = "Edit";
        this.cancelar_text = "Cancel";
        this.guardar_text = "Save";
      }
      if (this.idioma === "fr") {
        this.combates_text = "Lutte";
        this.pugiles_text = "Boxeurs";
        this.evento_text = "Événement";
        this.comenzar_combate_text = "Commencer le combat";
        this.nuevo_combate_text = "Nouveau combat";
        this.nombre_combate_text = "Nom du combat";
        this.fecha_text = "Date";
        this.categorias_text = "Catégories";
        this.esquina_roja_text = "Coin rouge";
        this.esquina_azul_text = "Coin bleu";

        this.acciones_text = "Actions";
        this.buscar_text = "Chercher";
        this.nuevo_text = "Nouveau";
        this.editar_text = "Modifier";
        this.cancelar_text = "Annuler";
        this.guardar_text = "Accepter";
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
    async Guardar() {
      if (this.fecha === null || this.evento === 0 || this.nombre === "" || this.esquina_roja === 0 ||
        this.esquina_azul === 0) {
        this.error = true;
        this.error_tex = "No pueden haber campos vacíos";
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          evento: this.evento,
          fecha: this.convertirADate(this.fecha),
          azul: this.esquina_azul ? this.esquina_azul : 0,
          roja: this.esquina_roja ? this.esquina_roja : 0,
          nombre: this.nombre,
          idioma:this.idioma
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevoCombate.success) {
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
            icon: "success",
            title: "Creado correctamente"
          });
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
            title: "Error al crear el combate"
          });
        }
        this.closeModal();
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
        this.closeModal();
      });
    },
    async Actualizar() {
      if (this.fecha === null || this.evento === 0 || this.nombre === "" || this.esquina_roja === 0 ||
        this.esquina_azul === 0) {
        this.error = true;
        this.error_tex = "No pueden haber campos vacíos";
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          evento: this.evento,
          fecha: this.convertirADate(this.fecha),
          azul: this.esquina_azul ? this.esquina_azul : 0,
          roja: this.esquina_roja ? this.esquina_roja : 0,
          nombre: this.nombre,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.actualizarCombate.success) {
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
            icon: "success",
            title: "Actualizado correctamente"
          });
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
            title: "Error al actualizar"
          });
        }
        this.closeUpdate();
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
        this.closeUpdate();
        console.error("La mutación falló:", error);
      });
    },
    async Eliminar(id) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        reverseButtons: true,
        showConfirmButton: false,
        cancelButtonText: "Cancelar",
        denyButtonText: "Si, eliminar!"
      }).then(async (result) => {
        if (result.isDenied) {
          const { data } = await this.$apollo.mutate({
            mutation: ELIMINAR,
            variables: {
              id: id
            },
            refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
          });
          if (data.eliminarCategoria.success) {
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
              icon: "success",
              title: "Eliminado correctamente"
            });
          }
        }
      });
    },
    openModal() {
      this.showModal = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    openUpdate(item) {
      this.id = item.id;
      this.fecha = item.fecha;
      this.nombre = item.nombre;
      this.esquina_roja = item.esquinaR.id;
      this.categoria = item.esquinaR.categoria.id;
      this.evento = item.evento.id;
      this.esquina_azul = item.esquinaA.id;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.fecha = null;
      this.nombre = "";
      this.esquina_roja = 0;
      this.evento = 0;
      this.esquina = "";
      this.esquina_azul = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.id = 0;
      this.fecha = null;
      this.nombre = "";
      this.esquina_roja = 0;
      this.evento = 0;
      this.esquina = "";
      this.esquina_azul = 0;
      this.showUpdate = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    onTransitionEnd(event) {
      if (event.propertyName === "opacity" && !this.showModal) {
        this.$emit("close");
      }
    },
    convertirADate(fecha) {
      const fechaDate = new Date(fecha); // Crea un objeto Date a partir de la cadena datetime
      const dia = fechaDate.getDate();
      const mes = fechaDate.getMonth() + 1; // ¡Recuerda que los meses en JavaScript van de 0 a 11!
      const anio = fechaDate.getFullYear();
      return `${anio}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""}${dia}`;
    },
    comenzarCombate(item) {
      this.$store.state.combate = item;
      this.$router.push("/combate/captura");
    }
  }
};
</script>

<style scoped>
.input-icon {
  background-image: url('@/assets/iconos/search.png');
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 20px;
  padding-left: 38px; /* ajusta el padding para que el texto no se solape con el icono */
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
