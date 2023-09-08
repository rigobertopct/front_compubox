<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">Eventos</h5>
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
                Evento
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Reglamento
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Tipo de evento
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
            <tr v-for="item in eventos" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.reglamento.tipo }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.tipoevento.tipo }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.pais.pais }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button
                    @click="openUpdate(item.id, item.nombre, item.reglamento.id, item.tipoevento.id, item.pais.id)"
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Nuevo evento<i @click="closeModal"
                                                                                        class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Evento</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 p-2 mb-3"
                     type="text">
              <label class="form-label">Reglamento</label>
              <select v-model="reglamento" class="form-control border-bottom p-2 mb-3">
                <option value="0" disabled>Seleccione un reglamento</option>
                <option v-for="item in reglamentos" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">Tipo de evento</label>
              <select v-model="tipo_evento" class="form-control border-bottom p-2 mb-3">
                <option value="0" disabled>Seleccione un tipo de evento</option>
                <option v-for="item in tiposE" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">País</label>
              <select v-model="pais" class="form-control border-bottom p-2 mb-3">
                <option value="0" disabled>Seleccione un país</option>
                <option v-for="item in paises" :value="item.id" :key="item.id">{{ item.pais }}</option>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>Actualizar país<i @click="closeUpdate"
                                                                                           class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">Evento</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 p-2 mb-3"
                     type="text">
              <label class="form-label">Reglamento</label>
              <select v-model="reglamento" class="form-control border-bottom p-2 mb-3">
                <option value="0" disabled>Seleccione un reglamento</option>
                <option v-for="item in reglamentos" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">Tipo de evento</label>
              <select v-model="tipo_evento" class="form-control border-bottom p-2 mb-3">
                <option value="0" disabled>Seleccione un tipo de evento</option>
                <option v-for="item in tiposE" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">País</label>
              <select v-model="pais" class="form-control border-bottom p-2 mb-3">
                <option value="0" disabled>Seleccione un país</option>
                <option v-for="item in paises" :value="item.id" :key="item.id">{{ item.pais }}</option>
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

const BUSCAR = gql`query Eventos($name:String!) {
    eventos(name: $name) {
        id
        nombre
        pais {
            id
            pais
        }
        reglamento {
            id
            tipo
        }
        tipoevento {
            id
            tipo
        }
    }
}
`;
const TIPO = gql`query TiposE {
    tiposE(name: "") {
        id
        tipo
    }
}`;
const REGLAMENTOS = gql`query Reglamentos {
    reglamentos(name: "") {
        id
        tipo
        cantR
        duracion
    }
}`;
const PAISES = gql`query Paises {
    paises(name: "") {
        id
        pais
        siglas
    }
}`;
const NUEVO = gql`mutation NuevoEvento($nombre: String!, $pais: Int!, $reglamento: Int!, $tipo_evento: Int!) {
    nuevoEvento(nombre: $nombre, pais: $pais, reglamento: $reglamento, tipoevento: $tipo_evento) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`mutation ActualizarEvento($id:Int!, $nombre: String!, $pais: Int!, $reglamento: Int!, $tipo_evento: Int!) {
    actualizarEvento(id:$id, nombre: $nombre, pais: $pais, reglamento: $reglamento, tipoevento: $tipo_evento) {
        success
        errors
    }
}`;
const ELIMINAR=gql`mutation EliminarEvento($id:Int!) {
    eliminarEvento(id: $id) {
        success
        errors
    }
}`;
export default {
  name: "Eventos",
  data() {
    return {
      eventos: [],
      paises: [],
      tiposE: [],
      reglamentos: [],
      name: "",
      showModal: false,
      error: false,
      pais: 0,
      reglamento: 0,
      tipo_evento: 0,
      nombre: "",
      id: 0,
      showUpdate: false
    };
  },
  apollo: {
    eventos: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name
        };
      },
      fetchPolicy: "cache-and-network"
    },
    tiposE: {
      query: TIPO,
      fetchPolicy: "cache-and-network"
    },
    reglamentos: {
      query: REGLAMENTOS,
      fetchPolicy: "cache-and-network"
    },
    paises: {
      query: PAISES,
      fetchPolicy: "cache-and-network"
    }
  },
  methods: {
    async Guardar() {
      if (this.pais === 0 || this.nombre === "" || this.reglamento === 0 || this.tipo_evento === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          nombre: this.nombre,
          pais: this.pais,
          reglamento: this.reglamento,
          tipo_evento: this.tipo_evento
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevoEvento.success) {
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
            title: response.data.nuevoEvento.error
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
      if (this.pais === 0 || this.nombre === "" || this.reglamento === 0 || this.tipo_evento === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          nombre: this.nombre,
          pais: this.pais,
          reglamento: this.reglamento,
          tipo_evento: this.tipo_evento,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.actualizarEvento.success) {
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
            title: response.data.actualizarEvento.error
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
          if (data.eliminarEvento.success) {
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
    openUpdate(id, nombre, reglamento, tipo_evento, pais) {
      this.id = id;
      this.nombre = nombre;
      this.pais = pais;
      this.reglamento = reglamento;
      this.tipo_evento = tipo_evento;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.nombre = "";
      this.pais = 0;
      this.reglamento = 0;
      this.tipo_evento = 0;
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.id = 0;
      this.nombre = "";
      this.pais = 0;
      this.reglamento = 0;
      this.tipo_evento = 0;
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
