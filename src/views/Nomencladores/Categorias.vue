<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">Categorías</h5>
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
                Categoría
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Peso mínimo
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Peso máximo
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Acciones
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in categorias" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.categoria }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.pesoMin }} kg</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.pesoMax }} kg</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button @click="openUpdate(item.id, item.categoria, item.pesoMin, item.pesoMax)"
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Nueva categoría<i @click="closeModal"
                                                                                           class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input v-model="categoria" class="form-control border-bottom border-dark p-2"
                     type="text">
              <label class="form-label">Peso máximo)</label>
              <input v-model="peso_max" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <label class="form-label">Peso mínimo</label>
              <input v-model="peso_min" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">{{ error_tex }}</p></div>
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
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>Actualizar resultado<i @click="closeUpdate"
                                                                                                class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input v-model="categoria" class="form-control border-bottom border-dark p-2"
                     type="text">
              <label class="form-label">Peso máximo)</label>
              <input v-model="peso_max" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <label class="form-label">Peso mínimo</label>
              <input v-model="peso_min" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">{{ error_tex }}</p></div>
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

const BUSCAR = gql`query Categorias($name:String!) {
    categorias(name: $name) {
        id
        categoria
        pesoMin
        pesoMax
    }
}`;
const NUEVO = gql`mutation NuevaCategoria($peso_max: Decimal!, $peso_min: Decimal!, $categoria: String!) {
    nuevaCategoria(categoria: $categoria, pesoMax: $peso_max, pesoMin: $peso_min) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`mutation ActualizarCategoria($id:Int!, $peso_max: Decimal!, $peso_min: Decimal!, $categoria: String!) {
    actualizarCategoria(id:$id, categoria: $categoria, pesoMax: $peso_max, pesoMin: $peso_min) {
        success
        errors
    }
}`;
const ELIMINAR = gql`mutation EliminarCategoria($id:Int!) {
    eliminarCategoria(id: $id) {
        success
        errors
    }
}`;
export default {
  name: "Resultados",
  data() {
    return {
      categorias: [],
      name: "",
      showModal: false,
      error: false,
      error_tex: "",
      categoria: "",
      peso_max: 0,
      peso_min: 0,
      id: 0,
      showUpdate: false
    };
  },
  apollo: {
    categorias: {
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
      if (this.categoria === "" || this.peso_max === 0 || this.peso_min === 0) {
        this.error = true;
        this.error_tex = "No pueden haber campos vacíos";
        return false;
      }
      if (this.peso_max < this.peso_min) {
        this.error = true;
        this.error_tex = "El peso máximo no puede ser menor que el peso mínimo";
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          categoria: this.categoria,
          peso_max: this.peso_max,
          peso_min: this.peso_min
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevaCategoria.success) {
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
            title: response.data.nuevaCategoria.error
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
      if (this.categoria === "" || this.peso_max === 0 || this.peso_min === 0) {
        this.error = true;
        this.error_tex = "No pueden haber campos vacíos";
        return false;
      }
      if (this.peso_max < this.peso_min) {
        this.error = true;
        this.error_tex = "El peso máximo no puede ser menor que el peso mínimo";
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          categoria: this.categoria,
          peso_max: this.peso_max,
          peso_min: this.peso_min,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.actualizarCategoria.success) {
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
            title: response.data.actualizarCategoria.error
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
    openUpdate(id, categoria, pesomin, pesomax) {
      this.id = id;
      this.peso_max = pesomax;
      this.categoria = categoria;
      this.peso_min = pesomin;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.peso_max = 0;
      this.categoria = "";
      this.peso_min = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.id = 0;
      this.peso_max = 0;
      this.categoria = "";
      this.peso_min = 0;
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
