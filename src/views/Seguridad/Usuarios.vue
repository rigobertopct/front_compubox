<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">Usuarios</h5>
        </div>
        <div class="d-flex justify-content-between m-3">
          <div class="col-3">
            <div class="input-group">
              <input v-model="name" type="text" class="form-control border-bottom border-dark input-icon"
                     placeholder="Buscar" aria-label="Recipient's username" aria-describedby="button-addon2">
            </div>
          </div>
          <div class="col-8 text-end">
            <button @click="openModal" class="btn btn-dark align-content-end">
              <i class="fa fa-plus-square me-2"></i> Nuevo
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
                Nombre
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Apellidos
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Usuario
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Correo
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Acciones
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in usuarios" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.firstName }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.lastName }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.username }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.email }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <!--                  <button @click="openUpdate(item.id, item.firstName, item.lastName, item.username, item.email)"-->
                  <!--                          data-bs-toggle="tooltip"-->
                  <!--                          data-bs-placement="top"-->
                  <!--                          title="Editar Marca" data-container="body" data-animation="true"-->
                  <!--                          class="btn btn-info p-1 ms-1">-->
                  <!--                    <i class="material-icons opacity-10">edit</i></button>-->
                  <button data-bs-toggle="tooltip" data-bs-placement="top"
                          title="Eliminar Marca" data-container="body" data-animation="true"
                          class="btn btn-danger p-1 ms-1">
                    <i class="material-icons opacity-10">delete</i></button>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Nuevo Usuario<i @click="closeModal"
                                                                                         class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Nombre</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Apellidos</label>
              <input v-model="apellidos" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Usuario</label>
              <input v-model="usuario" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Rol</label>
              <select class="form-select" v-model="grupo">
                <option value="0" disabled>Seleccione un rol</option>
                <option v-for="item in grupos" :key="item.id" :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Correo</label>
              <input v-model="email" class="form-control border-bottom border-dark p-2"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Contraseña</label>
              <input v-model="password" class="form-control border-bottom border-dark p-2"
                     type="password">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">Repita la contraseña</label>
              <input v-model="password1" class="form-control border-bottom border-dark p-2"
                     type="password">
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i
                  class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">No pueden haber campos vacíos</p></div>
              </div>
              <div v-show="errorpassword" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i
                  class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">Las contraseñas no coinciden</p></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeModal" class="btn btn-secondary" type="button">Cancelar</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Guardar" class="btn btn-dark" type="button">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divModal Actualizar">
      <div v-if="showUpdate" :class="['modal', { 'show': showUpdate }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>Actualizar Deporte<i @click="closeUpdate"
                                                                                                class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     placeholder="Escriba el nombre de una Aseguradora" type="text">
              <label class="form-label">Apellidos</label>
              <input v-model="apellidos" class="form-control border-bottom border-dark p-2 mb-3"
                     placeholder="Escriba el nombre de una Aseguradora" type="text">
              <label class="form-label">Usuario</label>
              <input v-model="usuario" class="form-control border-bottom border-dark p-2 mb-3"
                     placeholder="Escriba el nombre de una Aseguradora" type="text">
              <label class="form-label">Corre o</label>
              <input v-model="correo" class="form-control border-bottom border-dark p-2"
                     placeholder="Escriba el nombre de una Aseguradora" type="text">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i
                  class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">No pueden haber campos vacíos</p></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeUpdate" class="btn btn-secondary" type="button">Cancelar</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Actualizar" class="btn btn-dark" type="button">Guardar</button>
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

const BUSCAR = gql`
query Usuarios($name:String!) {
    usuarios(name: $name) {
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
}`;
const NUEVO = gql`
mutation CrearUsuario($nombre:String!, $apellidos:String!, $grupo:Int!, $email:String!, $password:String!, $usuario:String!) {
    crearUsuario(
        apellidos: $apellidos
        email: $email
        nombre: $nombre
        password: $password
        usuario: $usuario
        grupo:$grupo
    ) {
        error
        success
    }
}
`;
const GRUPOS = gql`
query Grupos {
    grupos {
        id
        name
    }
}`;
export default {
  name: "Usuarios",
  data() {
    return {
      usuarios: [],
      grupos: [],
      name: "",
      showModal: false,
      error: false,
      errorpassword: false,
      apellidos: "",
      nombre: "",
      usuario: "",
      email: "",
      password: "",
      password1: "",
      id: 0,
      showUpdate: false,
      grupo: 0
    };
  },
  apollo: {
    usuarios: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name
        };
      },
      fetchPolicy: "cache-and-network"
    },
    grupos: {
      query: GRUPOS,
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    async Guardar() {
      if (this.nombre === "" || this.apellidos === "" || this.usuario === "" || this.email === "" || this.password === "" || this.password1 === ""
        || this.grupo === 0) {
        this.error = true;
        return false;
      }
      if (this.password !== this.password1) {
        this.errorpassword = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          apellidos: this.apellidos,
          nombre: this.nombre,
          usuario: this.usuario,
          email: this.email,
          password: this.password,
          grupo: this.grupo
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.crearUsuario.success) {
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
            title: response.data.crearUsuario.error
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
      if (this.nombre === "" || this.deporte === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          deporte: this.deporte,
          nombre: this.nombre,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.actualizarDisciplina.success) {
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
            title: response.data.actualizarDisciplina.error
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
    openUpdate(id, nombre, deporte) {
      this.id = id;
      this.nombre = nombre;
      this.deporte = deporte;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.nombre = "";
      this.deporte = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.nombre = "";
      this.id = 0;
      this.deporte = 0;
      this.showUpdate = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    onTransitionEnd(event) {
      if (event.propertyName === "opacity" && !this.showModal) {
        this.$emit("close");
      }
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
