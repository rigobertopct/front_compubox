<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">Púgiles</h5>
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
                Edad
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Peso
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Categoría
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                País
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Acciones
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in pugiles" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.edad }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.peso }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.categoria.categoria }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.pais.pais }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button
                    @click="openUpdate(item.id, item.nombre, item.categoria.id, item.pais.id, item.peso, item.edad)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar Marca" data-container="body" data-animation="true"
                    class="btn btn-info p-1 ms-1">
                    <i class="material-icons opacity-10">edit</i></button>
                  <button data-bs-toggle="tooltip" data-bs-placement="top"
                          title="Eliminar Marca" data-container="body" data-animation="true"
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Nuevo púgil<i @click="closeModal"
                                                                                       class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2"
                     type="text">
              <label class="form-label">Edad</label>
              <input v-model="edad" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <label class="form-label">Peso</label>
              <input v-model="peso" class="form-control border-bottom border-dark p-2"
                     type="number" min="0">
              <label class="form-label">Categoría</label>
              <select v-model="categoria" class="form-control">
                <option value="0" disabled>Seleccione una categoría</option>
                <option v-for="item in categorias" :value="item.id" :key="item.id">{{ item.categoria }}</option>
              </select>
              <label class="form-label">País</label>
              <select v-model="pais" class="form-control">
                <option value="0" disabled>Seleccione un país</option>
                <option v-for="pais in paises" :value="pais.id" :key="pais.id">{{ pais.pais }}</option>
              </select>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Actualizar púgil<i @click="closeUpdate"
                                                                                            class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Nombre</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2"
                     placeholder="Escriba una categoría" type="text">
              <label class="form-label">Edad</label>
              <input v-model="edad" class="form-control border-bottom border-dark p-2"
                     placeholder="Escriba una categoría" type="number" min="0">
              <label class="form-label">Peso</label>
              <input v-model="peso" class="form-control border-bottom border-dark p-2"
                     placeholder="Escriba una categoría" type="number" min="0">
              <label class="form-label">Categoría</label>
              <select v-model="categoria" class="form-control">
                <option value="0" disabled>Seleccione un país</option>
                <option v-for="item in categorias" :value="item.id" :key="item.id">{{ item.pais }}</option>
              </select>
              <label class="form-label">País</label>
              <select v-model="pais" class="form-control">
                <option value="0" disabled>Seleccione un país</option>
                <option v-for="pais in paises" :value="pais.id" :key="pais.id">{{ pais.pais }}</option>
              </select>
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

const BUSCAR = gql`
query Pugiles($name:String!) {
    pugiles(name: $name) {
        id
        nombre
        edad
        peso
        categoria {
            id
            categoria
        }
        pais {
            id
            pais
        }
    }
}`;
const CATEGORIAS = gql`query Categorias {
    categorias(name: "") {
        id
        categoria
        pesoMin
        pesoMax
    }
}`;
const PAISES = gql`query Paises {
    paises(name: "") {
        id
        pais
        siglas
    }
}`;
const NUEVO = gql`mutation NuevoPugil ($categoria:Int!, $nombre:String!, $pais:Int!, $peso:Decimal!, $edad:Int!){
    nuevoPugil(categoria: $categoria, nombre: $nombre, pais: $pais, edad: $edad, peso: $peso) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`mutation ActualizarPugil ($id:Int!, $categoria:Int!, $nombre:String!, $pais:Int!, $peso:Decimal!, $edad:Int!){
    actualizarPugil(id:$id, categoria: $categoria, nombre: $nombre, pais: $pais, edad: $edad, peso: $peso) {
        success
        errors
    }
}`;
const ELIMINAR = gql`mutation EliminarPugil($id:Int!) {
    eliminarPugil(id: $id) {
        success
        errors
    }
}`;
export default {
  name: "Púgiles",
  data() {
    return {
      categorias: [],
      paises: [],
      pugiles: [],
      name: "",
      showModal: false,
      error: false,
      pais: 0,
      categoria: 0,
      nombre: "",
      edad: 0,
      peso: 0,
      id: 0,
      showUpdate: false
    };
  },
  apollo: {
    pugiles: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name
        };
      },
      fetchPolicy: "cache-and-network"
    },
    categorias: {
      query: CATEGORIAS,
      fetchPolicy: "cache-and-network"
    },
    paises: {
      query: PAISES,
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    async Guardar() {
      if (this.pais === 0 || this.nombre === "" || this.edad === 0 || this.categoria === 0 || this.peso === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          nombre: this.nombre,
          categoria: this.categoria,
          pais: this.pais,
          edad: this.edad,
          peso: this.peso
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevoPugil.success) {
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
            title: response.data.nuevoPugil.error
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
      if (this.pais === 0 || this.nombre === "" || this.edad === 0 || this.categoria === 0 || this.peso === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          nombre: this.nombre,
          categoria: this.categoria,
          pais: this.pais,
          edad: this.edad,
          peso: this.peso,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.actualizarPugil.success) {
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
            title: response.data.actualizarPugil.error
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
          if (data.eliminarPugil.success) {
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
    openUpdate(id, nombre, categoria, pais, peso, edad) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.pais = pais;
      this.peso = peso;
      this.edad = edad;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.id = 0;
      this.nombre = "";
      this.categoria = 0;
      this.pais = 0;
      this.peso = 0;
      this.edad = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.id = 0;
      this.nombre = "";
      this.categoria = 0;
      this.pais = 0;
      this.peso = 0;
      this.edad = 0;
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
