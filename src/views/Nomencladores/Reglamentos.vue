<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">Reglamentos</h5>
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
                Reglamento
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Dureación del round
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Cantidad de rounds
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Acciones
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in reglamentos" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.tipo }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.duracion }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.cantR }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button @click="openUpdate(item.id, item.tipo, item.duracion, item.cantR)"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Editar" data-container="body" data-animation="true"
                          class="btn btn-info p-1 ms-1">
                    <i class="material-icons opacity-10">edit</i></button>
                  <button data-bs-toggle="tooltip" data-bs-placement="top"
                          title="Eliminar" data-container="body" data-animation="true"
                          class="btn btn-danger p-1 ms-1" @click="Eliminar(item.id)">
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Nuevo reglamento<i @click="closeModal"
                                                                                           class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Reglamento</label>
              <input v-model="reglamento" class="form-control border-bottom border-dark p-2"
                     type="text">
              <label class="form-label">Duración del round (segundos)</label>
              <input v-model="duracion" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <label class="form-label">Cantidad de rounds</label>
              <input v-model="cant_r" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">No pueden haber campos vacíos</p></div>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Actualizar reglamento<i @click="closeUpdate"
                                                                                                class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Reglamento</label>
              <input v-model="reglamento" class="form-control border-bottom border-dark p-2"
                     type="text">
              <label class="form-label">Duración del round (segundos)</label>
              <input v-model="duracion" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <label class="form-label">Cantidad de rounds</label>
              <input v-model="cant_r" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
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

const BUSCAR = gql`query Reglamentos($name:String!) {
    reglamentos(name: $name) {
        id
        tipo
        cantR
        duracion
    }
}`;
const NUEVO = gql`mutation NuevoReglamento($cantR: Int!, $duracion: Int!, $reglamento: String!) {
    nuevoReglamento(cantR: $cantR, duracion: $duracion, tipo: $reglamento) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`mutation ActualizarReglamento($id:Int!,$cantR: Int!, $duracion: Int!, $reglamento: String!) {
    actualizarReglamento(id:$id,cantR: $cantR, duracion: $duracion, tipo: $reglamento) {
        success
        errors
    }
}`;
const ELIMINAR = gql`mutation EliminarReglamento($id:Int!) {
    eliminarReglamento(id: $id) {
        success
        errors
    }
}`;
export default {
  name: "Resultados",
  data() {
    return {
      reglamentos: [],
      name: "",
      showModal: false,
      error: false,
      reglamento: "",
      duracion: 0,
      cant_r: 0,
      id: 0,
      showUpdate: false
    };
  },
  apollo: {
    reglamentos: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name
        };
      },
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    async Guardar() {
      if (this.reglamento === "" || this.duracion === 0 || this.cant_r === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          reglamento: this.reglamento,
          duracion: this.duracion,
          cantR: this.cant_r
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevoReglamento.success) {
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
            title: response.data.nuevoReglamento.error
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
      if (this.reglamento === "" || this.duracion === 0 || this.cant_r === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          reglamento: this.reglamento,
          duracion: this.duracion,
          cantR: this.cant_r,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.actualizarReglamento.success) {
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
            title: response.data.actualizarReglamento.error
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
          if (data.eliminarReglamento.success) {
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
    openUpdate(id, tipo, duracion, cantR) {
      this.id = id;
      this.duracion = duracion;
      this.reglamento = tipo;
      this.cant_r = cantR;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.reglamento = "";
      this.duracion = 0;
      this.cant_r = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.reglamento = "";
      this.duracion = 0;
      this.cant_r = 0;
      this.id = 0;
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
  background-image: url('../../assets/iconos/search.png');
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
