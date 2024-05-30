<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ tecla_text }}</h5>
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
                {{ golpe_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ efectividad_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ tecla_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ acciones_text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in configGolpes" :key="item.id">
              <td class="text-sm font-weight-normal ps-4">{{ item.golpe.golpe }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.golpe.efectivo ? efectivo_text : no_efectivo_text }}
              </td>
              <td class="text-sm font-weight-normal ps-4">{{ item.tecla }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button @click="openUpdate(item.id, item.golpe.id, item.tecla)"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="editar_text" data-container="body" data-animation="true"
                          class="btn btn-info p-1 ms-1">
                    <i class="material-icons opacity-10">edit</i></button>
                  <button data-bs-toggle="tooltip" data-bs-placement="top"
                          :title="eliminar_text" data-container="body" data-animation="true"
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nueva_config_text }}<i
              @click="closeModal"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ golpe_text }}</label>
              <select v-model="golpe" class="form-select">
                <option v-for="item in golpes" :key="item.id" :value="item.id">{{ item.golpe }}
                  {{ item.efectivo ? efectivo_text : no_efectivo_text }}
                </option>
              </select>
              <label class="form-label">{{ tecla_text }}</label>
              <input v-model="tecla" class="form-control border-bottom border-dark p-2"
                     type="text" maxlength="1">
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ actualizar_config_text }}<i
              @click="closeUpdate"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ golpe_text }}</label>
              <select v-model="golpe" class="form-select">
                <option v-for="item in golpes" :key="item.id" :value="item.id">{{ item.golpe }}
                  {{ item.efectivo ? efectivo_text : no_efectivo_text }}
                </option>
              </select>
              <label class="form-label">{{ tecla_text }}</label>
              <input v-model="tecla" class="form-control border-bottom border-dark p-2"
                     type="text" maxlength="1">
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

const GOLPES = gql`query Golpes($idioma:String!) {
    golpes(name: "", idioma:$idioma) {
        id
        golpe
        siglas
        efectivo
    }
}`;
const BUSCAR = gql`query ConfigGolpes($name:String!, $usuario:Int!) {
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
const NUEVO = gql`mutation NuevaTecla($tecla:String!, $golpe:Int!, $usuario:Int!) {
    nuevaTecla(golpe: $golpe, tecla: $tecla, usuario: $usuario) {
        error
        success
    }
}`;
const ACTUALIZAR = gql`mutation ActualizarTecla($id:Int!, $tecla:String!, $golpe:Int!, $usuario:Int!) {
    actualizarTecla(id:$id, golpe: $golpe, tecla: $tecla, usuario: $usuario) {
        error
        success
    }
}`;
const ELIMINAR = gql`mutation EliminarTecla($id:Int!) {
    eliminarTecla(id: $id) {
        success
        error
    }
}`;
export default {
  name: "Teclas",
  data() {
    return {
      configGolpes: [],
      golpes: [],
      name: "",
      showModal: false,
      error: false,
      golpe: 0,
      tecla: "",
      id: 0,
      showUpdate: false,

      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar",
      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      error_text: "No pueden haber campos vacíos",

      configuracion_text: "Configuración de teclas",
      efectivo_text: "Efectivo",
      no_efectivo_text: "No efectivo",
      golpe_text: "Golpe",
      efectividad_text: "Efectividad",
      tecla_text: "Tecla",
      nueva_config_text: "Nueva configuración de tecla",
      actualizar_config_text: "Actualizar configuración de tecla"

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
      this.error_text = "No pueden haber campos vacíos";

      this.configuracion_text = "Configuración de teclas";
      this.efectivo_text = "Efectivo";
      this.no_efectivo_text = "No efectivo";
      this.golpe_text = "Golpe";
      this.efectividad_text = "Efectividad";
      this.tecla_text = "Tecla";
      this.nueva_config_text = "Nueva configuración de tecla";
      this.actualizar_config_text = "Actualizar configuración de tecla";
    }
    if (this.idioma === "ru") {
      this.acciones_text = "Действия";
      this.buscar_text = "Искать";
      this.nuevo_text = "Новый";
      this.editar_text = "Редактировать";
      this.cancelar_text = "Отменить";
      this.guardar_text = "Принять";
      this.error_text = "Не может быть пустых полей";

      this.configuracion_text = "Ключевые настройки";
      this.efectivo_text = "Наличные";
      this.no_efectivo_text = "Нет наличных";
      this.golpe_text = "Удары";
      this.efectividad_text = "Эффективность";
      this.tecla_text = "Клавиши";
      this.nueva_config_text = "Новые настройки клавиш";
      this.actualizar_config_text = "Обновить ключевые настройки";
    }
    if (this.idioma === "in") {
      this.acciones_text = "Actions";
      this.buscar_text = "Search";
      this.nuevo_text = "New";
      this.editar_text = "Edit";
      this.cancelar_text = "Cancel";
      this.guardar_text = "Save";
      this.error_text = "There cannot be empty fields";

      this.configuracion_text = "Key Settings";
      this.efectivo_text = "Effectiveness";
      this.no_efectivo_text = "No Effectiveness";
      this.golpe_text = "Punch";
      this.efectividad_text = "Effectiveness";
      this.tecla_text = "Key";
      this.nueva_config_text = "New key settings";
      this.actualizar_config_text = "Update key settings";
    }
    if (this.idioma === "fr") {
      this.acciones_text = "Actions";
      this.buscar_text = "Chercher";
      this.nuevo_text = "Nouveau";
      this.editar_text = "Modifier";
      this.cancelar_text = "Annuler";
      this.guardar_text = "Accepter";
      this.error_text = "Il ne peut pas y avoir de champs vides";

      this.configuracion_text = "Paramètres clés";
      this.efectivo_text = "Espèces";
      this.no_efectivo_text = "Pas d'argent";
      this.golpe_text = "Claquer";
      this.efectividad_text = "Efficacité";
      this.tecla_text = "Tecla";
      this.nueva_config_text = "Nouveaux paramètres clés";
      this.actualizar_config_text = "Actualizar configuración de tecla";
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
        this.error_text = "No pueden haber campos vacíos";

        this.configuracion_text = "Configuración de teclas";
        this.efectivo_text = "Efectivo";
        this.no_efectivo_text = "No efectivo";
        this.golpe_text = "Golpe";
        this.efectividad_text = "Efectividad";
        this.tecla_text = "Teclas";
        this.nueva_config_text = "Nueva configuración de teclas";
        this.actualizar_config_text = "Actualizar configuración de teclas";
      }
      if (this.idioma === "ru") {
        this.acciones_text = "Действия";
        this.buscar_text = "Искать";
        this.nuevo_text = "Новый";
        this.editar_text = "Редактировать";
        this.cancelar_text = "Отменить";
        this.guardar_text = "Принять";
        this.error_text = "Не может быть пустых полей";

        this.configuracion_text = "Ключевые настройки";
        this.efectivo_text = "Наличные";
        this.no_efectivo_text = "Нет наличных";
        this.golpe_text = "Удары";
        this.efectividad_text = "Эффективность";
        this.tecla_text = "Клавиши";
        this.nueva_config_text = "Новые настройки клавиш";
        this.actualizar_config_text = "Обновить ключевые настройки";
      }
      if (this.idioma === "in") {
        this.acciones_text = "Actions";
        this.buscar_text = "Search";
        this.nuevo_text = "New";
        this.editar_text = "Edit";
        this.cancelar_text = "Cancel";
        this.guardar_text = "Save";
        this.error_text = "There cannot be empty fields";

        this.configuracion_text = "Key Settings";
        this.efectivo_text = "Effectiveness";
        this.no_efectivo_text = "No Effectiveness";
        this.golpe_text = "Punch";
        this.efectividad_text = "Effectiveness";
        this.tecla_text = "Key";
        this.nueva_config_text = "New key settings";
        this.actualizar_config_text = "Update key settings";
      }
      if (this.idioma === "fr") {
        this.acciones_text = "Actions";
        this.buscar_text = "Chercher";
        this.nuevo_text = "Nouveau";
        this.editar_text = "Modifier";
        this.cancelar_text = "Annuler";
        this.guardar_text = "Accepter";
        this.error_text = "Il ne peut pas y avoir de champs vides";

        this.configuracion_text = "Paramètres clés";
        this.efectivo_text = "Espèces";
        this.no_efectivo_text = "Pas d'argent";
        this.golpe_text = "Claquer";
        this.efectividad_text = "Efficacité";
        this.tecla_text = "Tecla";
        this.nueva_config_text = "Nouveaux paramètres clés";
        this.actualizar_config_text = "Actualizar configuración de tecla";
      }
    }
  },
  apollo: {
    configGolpes: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name,
          usuario: this.$store.state.userid
        };
      },
      fetchPolicy: "cache-and-network"
    },
    golpes: {
      query: GOLPES,
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
      if (this.golpe === 0 || this.tecla === "") {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          golpe: this.golpe,
          tecla: this.tecla,
          usuario: this.$store.state.userid
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, usuario: this.$store.state.userid } }]
      }).then(response => {
        if (response.data.nuevaTecla.success) {
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
            title: response.data.nuevaTecla.error
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
      if (this.golpe === 0 || this.tecla === "") {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          golpe: this.golpe,
          tecla: this.tecla,
          usuario: this.$store.state.userid,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, usuario: this.$store.state.userid } }]
      }).then(response => {
        if (response.data.actualizarTecla.success) {
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
            title: response.data.actualizarTecla.error
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
            refetchQueries: [{ query: BUSCAR, variables: { name: this.name, usuario: this.$store.state.userid } }]
          });
          if (data.eliminarTecla.success) {
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
    openUpdate(id, golpe, tecla) {
      this.id = id;
      this.golpe = golpe;
      this.tecla = tecla;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.golpe = 0;
      this.tecla = "";
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.golpe = 0;
      this.tecla = "";
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
