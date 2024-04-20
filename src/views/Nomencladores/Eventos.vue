<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ evento_text }}</h5>
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
                {{ evento_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ reglamento_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ tipo_evento_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ pais_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ acciones_text }}
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nuevo_evento_text }}<i @click="closeModal"
                                                                                                   class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ evento_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 p-2 mb-3"
                     type="text">
              <label class="form-label">{{ reglamento_text }}</label>
              <select v-model="reglamento" class="form-select border-bottom p-2 mb-3">
                <option v-for="item in reglamentos" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">{{ tipo_evento_text }}</label>
              <select v-model="tipo_evento" class="form-select border-bottom p-2 mb-3">
                <option v-for="item in tiposE" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">{{ pais_text }}</label>
              <select v-model="pais" class="form-select border-bottom p-2 mb-3">
                <option v-for="item in paises" :value="item.id" :key="item.id">{{ item.pais }}</option>
              </select>
              <label class="form-label">{{ anno_text }}</label>
              <input type="number" v-model="anno" class="form-control border-bottom border-dark p-2 p-2 mb-3">
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ actualizar_evento_text }}<i
              @click="closeUpdate"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ evento_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 p-2 mb-3"
                     type="text">
              <label class="form-label">{{ reglamento_text }}</label>
              <select v-model="reglamento" class="form-select border-bottom p-2 mb-3">
                <option v-for="item in reglamentos" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">{{ tipo_evento_text }}</label>
              <select v-model="tipo_evento" class="form-select border-bottom p-2 mb-3">
                <option v-for="item in tiposE" :value="item.id" :key="item.id">{{ item.tipo }}</option>
              </select>
              <label class="form-label">{{ pais_text }}</label>
              <select v-model="pais" class="form-select border-bottom p-2 mb-3">
                <option v-for="item in paises" :value="item.id" :key="item.id">{{ item.pais }}</option>
              </select>
              <label class="form-label">{{ anno_text }}</label>
              <input type="number" v-model="anno" class="form-control border-bottom border-dark p-2 p-2 mb-3">
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

const BUSCAR = gql`query Eventos($name:String!, $idioma:String!) {
    eventos(name: $name, idioma:$idioma) {
        id
        nombre
        anno
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
const TIPO = gql`query TiposE($idioma:String!) {
    tiposE(name: "", idioma:$idioma) {
        id
        tipo
    }
}`;
const REGLAMENTOS = gql`query Reglamentos($idioma:String!) {
    reglamentos(name: "", idioma:$idioma) {
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
const NUEVO = gql`mutation NuevoEvento($anno:Int!, $nombre: String!, $pais: Int!, $reglamento: Int!, $tipo_evento: Int!, $idioma:String!) {
    nuevoEvento(anno:$anno, nombre: $nombre, pais: $pais, reglamento: $reglamento, tipoevento: $tipo_evento, idioma:$idioma) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`mutation ActualizarEvento($anno:Int!,$id:Int!, $nombre: String!, $pais: Int!, $reglamento: Int!, $tipo_evento: Int!, $idioma:String!) {
    actualizarEvento(anno:$anno, id:$id, nombre: $nombre, pais: $pais, reglamento: $reglamento, tipoevento: $tipo_evento, idioma:$idioma) {
        success
        errors
    }
}`;
const ELIMINAR = gql`mutation EliminarEvento($id:Int!) {
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
      anno: parseInt(new Date().getFullYear()),
      reglamento: 0,
      tipo_evento: 0,
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
      nombre_text: "Nombre",
      pais_text: "País",
      evento_text: "Evento",
      reglamento_text: "Reglamento",
      tipo_evento_text: "Tipo de evento",
      nuevo_evento_text: "Nuevo evento",
      actualizar_evento_text: "Actualizar evento",
      anno_text: "Año"
    };
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
      this.pais_text = "País";

      this.evento_text = "Evento";
      this.reglamento_text = "Reglamento";
      this.tipo_evento_text = "Tipo de evento";
      this.nuevo_evento_text = "Nuevo evento";
      this.actualizar_evento_text = "Actualizar evento";
      this.anno_text = "Año";
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
      this.pais_text = "страна";

      this.evento_text = "Mероприятие";
      this.reglamento_text = "Pегулирование";
      this.tipo_evento_text = "Тип Mероприятие";
      this.nuevo_evento_text = "Новое Mероприятие";
      this.actualizar_evento_text = "Обновить Mероприятие";
      this.anno_text = "Год";
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
      this.pais_text = "Country";

      this.evento_text = "Event";
      this.reglamento_text = "Regulation";
      this.tipo_evento_text = "Event type";
      this.nuevo_evento_text = "New event";
      this.actualizar_evento_text = "Update event";
      this.anno_text = "Year";
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
      this.pais_text = "Pays";

      this.evento_text = "Événement";
      this.reglamento_text = "Régulation";
      this.tipo_evento_text = "Type d'événement";
      this.nuevo_evento_text = "Nouvel évènement";
      this.actualizar_evento_text = "Événement de mise à jour";
      this.anno_text = "Année";
    }
  },
  computed: {
    ...mapState(["idioma"])
  },
  watch:{
    idioma(){
      if (this.idioma === "es") {
        this.acciones_text = "Acciones";
        this.buscar_text = "Buscar";
        this.nuevo_text = "Nuevo";
        this.editar_text = "Editar";
        this.cancelar_text = "Cancelar";
        this.guardar_text = "Guardar";
        this.nombre_text = "Nombre";
        this.error_text = "No pueden haber campos vacíos";
        this.pais_text = "País";

        this.evento_text = "Evento";
        this.reglamento_text = "Reglamento";
        this.tipo_evento_text = "Tipo de evento";
        this.nuevo_evento_text = "Nuevo evento";
        this.actualizar_evento_text = "Actualizar evento";
        this.anno_text = "Año";
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
        this.pais_text = "страна";

        this.evento_text = "Mероприятие";
        this.reglamento_text = "Pегулирование";
        this.tipo_evento_text = "Тип Mероприятие";
        this.nuevo_evento_text = "Новое Mероприятие";
        this.actualizar_evento_text = "Обновить Mероприятие";
        this.anno_text = "Год";
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
        this.pais_text = "Country";

        this.evento_text = "Event";
        this.reglamento_text = "Regulation";
        this.tipo_evento_text = "Event type";
        this.nuevo_evento_text = "New event";
        this.actualizar_evento_text = "Update event";
        this.anno_text = "Year";
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
        this.pais_text = "Pays";

        this.evento_text = "Événement";
        this.reglamento_text = "Régulation";
        this.tipo_evento_text = "Type d'événement";
        this.nuevo_evento_text = "Nouvel évènement";
        this.actualizar_evento_text = "Événement de mise à jour";
        this.anno_text = "Année";
      }
    }
  },
  apollo: {
    eventos: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name,
          idioma:this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    tiposE: {
      query: TIPO,
      variables() {
        return {
          idioma:this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    reglamentos: {
      query: REGLAMENTOS,
      variables() {
        return {
          idioma:this.idioma
        };
      },
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
          tipo_evento: this.tipo_evento,
          anno: this.anno,
          idioma:this.idioma
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, idioma:this.idioma } }]
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
          id: this.id,
          anno: this.anno
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
