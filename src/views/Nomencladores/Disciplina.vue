<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ disciplina_text }}</h5>
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
                {{ deporte_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ codigo_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ acciones_text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in disciplinas" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.deporte.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.codigo }}</td>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nueva_disciplina_text }}<i
              @click="closeModal"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ deporte_text }}</label>
              <select v-model="deporte" class="form-control border-bottom border-dark p-2 mb-3">
                <option v-for="elemento in deportes" :key="elemento.id" :value="elemento.id">{{ elemento.nombre }}
                </option>
              </select>
              <label class="form-label">{{ nombre_text }}</label>
              <select v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3">
                <option value="Femenino">{{ femenino_text }}</option>
                <option value="Masculino">{{ masculino_text }}</option>
                <option value="Mixto">{{ mixto_text }}</option>
              </select>
              <label class="form-label">{{ descripcion_text }}</label>
              <input v-model="codigo" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
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
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ actualizar_disciplina_text }}<i
              @click="closeUpdate"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ deporte_text }}</label>
              <select v-model="deporte" class="form-control border-bottom border-dark p-2 mb-3">
                <option v-for="elemento in deportes" :key="elemento.id" :value="elemento.id">{{ elemento.nombre }}
                </option>
              </select>
              <label class="form-label">{{ nombre_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
              <label class="form-label">{{ codigo_text }}</label>
              <input v-model="codigo" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
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

const SELECT = gql`
query Deportes($idioma:String!) {
    deportes(name: "", idioma:$idioma) {
        id
        nombre
        siglas
    }
}`;
const BUSCAR = gql`
query Disciplinas($name:String!, $idioma:String!) {
    disciplinas(name: $name,idioma:$idioma) {
        id
        nombre
        codigo
        deporte {
            id
            nombre
            siglas
        }
    }
}
`;
const NUEVO = gql`
mutation NuevaDisciplina($codigo:String!
$deporte:ID!
$nombre:String!) {
    nuevaDisciplina(codigo: $codigo, deporte: $deporte, nombre: $nombre) {
        success
        error
    }
}`;
const ACTUALIZAR = gql`
mutation UpdateDisciplina(
    $codigo:String!
    $deporte:ID!
    $id:ID!
    $nombre:String!
) {
    updateDisciplina(codigo: $codigo, deporte: $deporte, id: $id, nombre: $nombre) {
        success
        error
    }
}`;
const ELIMINAR = gql`
mutation EliminarDisciplina($id:ID!) {
    eliminarDisciplina(id: $id) {
        success
        error
    }
}`;
export default {
  name: "Disciplina",
  data() {
    return {
      disciplinas: [],
      deportes: [],
      name: "",
      showModal: false,
      error: false,
      deporte: 0,
      codigo: "",
      nombre: "",
      id: 0,
      showUpdate: false,

      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar",
      error_text: "No pueden haber campos vacíos",
      deporte_text: "Deporte",
      nombre_text: "Nombre",
      siglas_text: "Siglas",

      nueva_disciplina_text: "Nueva disciplina",
      actualizar_disciplina_text: "Actualizar disciplina",
      disciplina_text: "Disciplina",
      codigo_text: "Código",
      femenino_text: "Femenino",
      masculino_text: "Masculino",
      mixto_text: "Mixto",
      descripcion_text: "Descripción"
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
      this.deporte_text = "Deporte";
      this.nuevo_deporte = "Nuevo Deporte";
      this.siglas_text = "Siglas";

      this.nueva_disciplina_text = "Nueva disciplina";
      this.actualizar_disciplina_text = "Actualizar disciplina";
      this.disciplina_text = "Disciplina";
      this.codigo_text = "Código";
      this.femenino_text = "Femenino";
      this.masculino_text = "Masculino";
      this.mixto_text = "Mixto";
      this.descripcion_text = "Descripción";
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
      this.siglas_text = "акроним";
      this.deporte_text = "Спорт";

      this.nueva_disciplina_text = "Новая дисциплина";
      this.actualizar_disciplina_text = "Обновить дисциплину";
      this.disciplina_text = "Дисциплина";
      this.codigo_text = "Код";
      this.femenino_text = "Женский";
      this.masculino_text = "Мужской";
      this.mixto_text = "Смешанный";
      this.descripcion_text = "Описание";
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
      this.siglas_text = "Acronym";
      this.deporte_text = "Sport";

      this.nueva_disciplina_text = "New discipline";
      this.actualizar_disciplina_text = "Update discipline";
      this.disciplina_text = "Discipline";
      this.codigo_text = "Code";
      this.femenino_text = "Female";
      this.masculino_text = "Male";
      this.mixto_text = "Mixed";
      this.descripcion_text = "Description";
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
      this.siglas_text = "Acronyme";
      this.deporte_text = "Sport";

      this.nueva_disciplina_text = "Nouvelle discipline";
      this.actualizar_disciplina_text = "Mettre à jour la discipline";
      this.disciplina_text = "Discipline";
      this.codigo_text = "Code";
      this.femenino_text = "Femelle";
      this.masculino_text = "Mâle";
      this.mixto_text = "Mixte";
      this.descripcion_text = "Description";
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
        this.deporte_text = "Deporte";
        this.nuevo_deporte = "Nuevo Deporte";
        this.siglas_text = "Siglas";

        this.nueva_disciplina_text = "Nueva disciplina";
        this.actualizar_disciplina_text = "Actualizar disciplina";
        this.disciplina_text = "Disciplina";
        this.codigo_text = "Código";
        this.femenino_text = "Femenino";
        this.masculino_text = "Masculino";
        this.mixto_text = "Mixto";
        this.descripcion_text = "Descripción";
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
        this.siglas_text = "акроним";
        this.deporte_text = "Спорт";

        this.nueva_disciplina_text = "Новая дисциплина";
        this.actualizar_disciplina_text = "Обновить дисциплину";
        this.disciplina_text = "Дисциплина";
        this.codigo_text = "Код";
        this.femenino_text = "Женский";
        this.masculino_text = "Мужской";
        this.mixto_text = "Смешанный";
        this.descripcion_text = "Описание";
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
        this.siglas_text = "Acronym";
        this.deporte_text = "Sport";

        this.nueva_disciplina_text = "New discipline";
        this.actualizar_disciplina_text = "Update discipline";
        this.disciplina_text = "Discipline";
        this.codigo_text = "Code";
        this.femenino_text = "Female";
        this.masculino_text = "Male";
        this.mixto_text = "Mixed";
        this.descripcion_text = "Description";
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
        this.siglas_text = "Acronyme";
        this.deporte_text = "Sport";

        this.nueva_disciplina_text = "Nouvelle discipline";
        this.actualizar_disciplina_text = "Mettre à jour la discipline";
        this.disciplina_text = "Discipline";
        this.codigo_text = "Code";
        this.femenino_text = "Femelle";
        this.masculino_text = "Mâle";
        this.mixto_text = "Mixte";
        this.descripcion_text = "Description";
      }
    }
  },
  apollo: {
    disciplinas: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name,
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    deportes: {
      query: SELECT,
      variables() {
        return {
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    async Guardar() {
      if (this.nombre === "" || this.codigo === "" || this.deporte === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          nombre: this.nombre,
          codigo: this.codigo,
          deporte: this.deporte
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, idioma:this.idioma } }]
      }).then(response => {
        if (response.data.nuevaDisciplina.success) {
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
            title: response.data.nuevaDisciplina.error
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
      if (this.nombre === "" || this.codigo === "" || this.deporte === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          deporte: this.deporte,
          nombre: this.nombre,
          codigo: this.codigo,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, idioma:this.idioma } }]
      }).then(response => {
        if (response.data.updateDisciplina.success) {
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
            title: response.data.updateDisciplina.error
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
      this.codigo = item.codigo;
      this.deporte = item.deporte.id;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.nombre = "";
      this.deporte = 0;
      this.codigo = "";
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.id = 0;
      this.nombre = "";
      this.deporte = 0;
      this.codigo = "";
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
          if (data.eliminarDisciplina.success) {
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
              title: "No se puede eliminar la disciplina, hay deportistas asociados"
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
