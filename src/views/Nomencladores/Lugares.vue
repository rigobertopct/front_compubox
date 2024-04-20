<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ lugar_text }}</h5>
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
                {{ nombre_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ provincia_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ acciones_text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in lugares" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.provincia.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button @click="openUpdate(item)"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="editar_text" data-container="body" data-animation="true"
                          class="btn btn-info p-1 ms-1">
                    <i class="material-icons opacity-10">edit</i></button>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nuevo_lugar_text }}<i @click="closeModal"
                                                                                                  class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ nombre_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
              <label class="form-label">{{ provincia_text }}</label>
              <select v-model="provincia" class="form-control border-bottom border-dark p-2 mb-3">
                <option v-for="item in provincias" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">{{ error_text }}</p></div>
              </div>
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
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ actualizar_lugar_text }}<i
              @click="closeUpdate"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ nombre_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
              <label class="form-label">{{ provincia_text }}</label>
              <select v-model="provincia" class="form-control border-bottom border-dark p-2 mb-3">
                <option v-for="item in provincias" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">{{ error_text }}</p></div>
              </div>
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
import { mapState } from "vuex";

const BUSCAR = gql`
query Lugares($name: String!, $idioma:String!) {
    lugares(name: $name, idioma:$idioma) {
        id
        nombre
        isActive
        provincia {
            id
            nombre
            siglas
        }
    }
}
`;
const NUEVO = gql`
mutation NuevoLugar($nombre:String!, $provincia:ID!, $idioma:String!) {
    nuevoLugar(nombre: $nombre, provincia: $provincia, idioma:$idioma) {
        success
        error
    }
}`;
const ACTUALIZAR = gql`
mutation UpdateLugar($id:ID!, $idioma:String!
$nombre:String!
$provincia:ID!) {
    updateLugar(id: $id, nombre: $nombre, provincia: $provincia, idioma:$idioma) {
        success
        error
    }
}`;
const PROVINCIAS = gql`
query Provincias {
    provincias {
        id
        nombre
        siglas
    }
}`;
const ELIMINAR = gql`
mutation EliminarLugar($id:ID!) {
    eliminarLugar(id: $id) {
        success
        error
    }
}`;
export default {
  name: "Lugares",
  data() {
    return {
      lugares: [],
      provincias: [],
      name: "",
      showModal: false,
      error: false,
      nombre: "",
      provincia: 0,
      id: 0,
      showUpdate: false,

      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar",
      fecha_text: "Fecha",
      error_text: "No pueden haber campos vacíos",
      lugar_text: "Lugar",
      nombre_text: "Nombre",

      provincia_text: "Provincia",
      nuevo_lugar_text: "Nuevo lugar",
      actualizar_lugar_text: "Actualizar lugar"
    };
  },
  computed: {
    ...mapState(["idioma"])
  },
  created() {
    if (this.idioma === "es") {
      this.acciones_text = "Acciones";
      this.buscar_text = "Buscar";
      this.nuevo_text = "Nuevo";
      this.editar_text = "Editar";
      this.cancelar_text = "Cancelar";
      this.guardar_text = "Guardar";
      this.nombre_text = "Nombre";
      this.error_text = "No pueden haber campos vacíos";

      this.provincia_text = "Provincia";
      this.nuevo_lugar_text = "Nuevo lugar";
      this.actualizar_lugar_text = "Actualizar lugar";
      this.fecha_text = "Fecha";
      this.lugar_text = "Lugar";
    }
    if (this.idioma === "ru") {
      this.acciones_text = "Действия";
      this.buscar_text = "Искать";
      this.nuevo_text = "Новый";
      this.editar_text = "Редактировать";
      this.cancelar_text = "Отменить";
      this.guardar_text = "Принять";
      this.nombre_text = "Имя";
      this.error_text = "Не может быть пустых полей";

      this.provincia_text = "Провинция";
      this.nuevo_lugar_text = "Новое место";
      this.actualizar_lugar_text = "Обновить место";
      this.fecha_text = "Дата";
      this.lugar_text = "Место";
    }
    if (this.idioma === "in") {
      this.acciones_text = "Actions";
      this.buscar_text = "Search";
      this.nuevo_text = "New";
      this.editar_text = "Edit";
      this.cancelar_text = "Cancel";
      this.guardar_text = "Save";
      this.nombre_text = "Name";
      this.error_text = "There cannot be empty fields";

      this.provincia_text = "Province";
      this.nuevo_lugar_text = "New place";
      this.actualizar_lugar_text = "Update place";
      this.fecha_text = "Date";
      this.lugar_text = "Place";
    }
    if (this.idioma === "fr") {
      this.acciones_text = "Actions";
      this.buscar_text = "Chercher";
      this.nuevo_text = "Nouveau";
      this.editar_text = "Modifier";
      this.cancelar_text = "Annuler";
      this.guardar_text = "Accepter";
      this.nombre_text = "Nom";
      this.error_text = "Il ne peut pas y avoir de champs vides";

      this.provincia_text = "Province";
      this.nuevo_lugar_text = "Nouveau lieu";
      this.actualizar_lugar_text = "Lieu de mise à jour";
      this.fecha_text = "Date";
      this.lugar_text = "Lieu";
    }
  },
  watch: {
    idioma() {
      if (this.idioma === "es") {
        this.acciones_text = "Acciones";
        this.buscar_text = "Buscar";
        this.nuevo_text = "Nuevo";
        this.editar_text = "Editar";
        this.cancelar_text = "Cancelar";
        this.guardar_text = "Guardar";
        this.nombre_text = "Nombre";
        this.error_text = "No pueden haber campos vacíos";

        this.provincia_text = "Provincia";
        this.nuevo_lugar_text = "Nuevo lugar";
        this.actualizar_lugar_text = "Actualizar lugar";
        this.fecha_text = "Fecha";
        this.lugar_text = "Lugar";
      }
      if (this.idioma === "ru") {
        this.acciones_text = "Действия";
        this.buscar_text = "Искать";
        this.nuevo_text = "Новый";
        this.editar_text = "Редактировать";
        this.cancelar_text = "Отменить";
        this.guardar_text = "Принять";
        this.nombre_text = "Имя";
        this.error_text = "Не может быть пустых полей";

        this.provincia_text = "Провинция";
        this.nuevo_lugar_text = "Новое место";
        this.actualizar_lugar_text = "Обновить место";
        this.fecha_text = "Дата";
        this.lugar_text = "Место";
      }
      if (this.idioma === "in") {
        this.acciones_text = "Actions";
        this.buscar_text = "Search";
        this.nuevo_text = "New";
        this.editar_text = "Edit";
        this.cancelar_text = "Cancel";
        this.guardar_text = "Save";
        this.nombre_text = "Name";
        this.error_text = "There cannot be empty fields";

        this.provincia_text = "Province";
        this.nuevo_lugar_text = "New place";
        this.actualizar_lugar_text = "Update place";
        this.fecha_text = "Date";
        this.lugar_text = "Place";
      }
      if (this.idioma === "fr") {
        this.acciones_text = "Actions";
        this.buscar_text = "Chercher";
        this.nuevo_text = "Nouveau";
        this.editar_text = "Modifier";
        this.cancelar_text = "Annuler";
        this.guardar_text = "Accepter";
        this.nombre_text = "Nom";
        this.error_text = "Il ne peut pas y avoir de champs vides";

        this.provincia_text = "Province";
        this.nuevo_lugar_text = "Nouveau lieu";
        this.actualizar_lugar_text = "Lieu de mise à jour";
        this.fecha_text = "Date";
        this.lugar_text = "Lieu";
      }
    }
  },
  apollo: {
    lugares: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name,
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    provincias: {
      query: PROVINCIAS,
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    async Guardar() {
      if (this.nombre === "" || this.provincia === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          nombre: this.nombre,
          provincia: this.provincia,
          idioma: this.idioma
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevoLugar.success) {
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
            title: response.data.nuevoLugar.error
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
          title: "Ha ocurrido un error"
        });
        this.closeModal();
      });
    },
    async Actualizar() {
      if (this.nombre === "" || this.provincia === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          nombre: this.nombre,
          provincia: this.provincia,
          idioma: this.idioma,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.updateLugar.success) {
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
            title: response.data.updateLugar.error
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
      });
    },
    openModal() {
      this.showModal = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    openUpdate(item) {
      this.id = item.id;
      this.nombre = item.nombre;
      this.provincia = item.provincia.id;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.nombre = "";
      this.provincia = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.nombre = "";
      this.id = 0;
      this.provincia = 0;
      this.showUpdate = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    onTransitionEnd(event) {
      if (event.propertyName === "opacity" && !this.showModal) {
        this.$emit("close");
      }
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
          if (data.eliminarLugar.success) {
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
              title: "No se puede eliminar el lugar, hay pruebas asociados"
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.input-icon {
  background-image: url('../../assets/img/icons/search.png');
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
  z-index: 9999;
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
