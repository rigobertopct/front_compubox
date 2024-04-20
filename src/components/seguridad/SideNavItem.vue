<template>
  <div id="basic-info" class="card mt-4">
    <div class="card-header bg-gradient-dark">
      <h5 style="color:#fff">Información Básica</h5>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <div class="col-6">
          <label class="form-label">Nombre</label>
          <input
            class="form-control border-bottom"
            v-model="firstName"
            placeholder="Nombre"
          />
        </div>
        <div class="col-6">
          <label class="form-label">Apellidos</label>
          <input
            class="form-control border-bottom"
            v-model="lastName"
            placeholder="Apellidos"
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <label class="form-label">Usuario</label>
          <input
            class="form-control border-bottom"
            v-model="username"
            placeholder="Usuario"
          />
        </div>
        <div class="col-6">
          <label class="form-label">Correo</label>
          <input
            type="email"
            class="form-control border-bottom"
            v-model="email"
            placeholder="Correo"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
        </div>
        <div class="col-6">
          <material-button
            class="float-end mt-6 mb-0"
            color="dark"
            variant="gradient"
            size="sm"
            @click="updateUsuario"
          >Actualizar Usuario
          </material-button>
        </div>
      </div>
      <div class="row mt-4">
      </div>
    </div>
  </div>
  <div id="password" class="card mt-4">
    <div class="card-header bg-gradient-dark">
      <h5 style="color: #fff">Cambiar Contraseña</h5>
    </div>
    <div class="card-body pt-0">
      <div class="mb-3">
        <label class="form-label">Contraseña anterior</label>
        <input
          v-model="old_password"
          class="form-control border-bottom"
          id="currentPassword"
          autocomplete="false"
          type="password"
          placeholder="Contraseña anterior"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Contraseña nueva</label>
        <input v-model="newpassword" class="form-control border-bottom" id="newPassword" type="password"
               placeholder="Contraseña nueva" />
      </div>
      <div class="mb-3">
        <label class="form-label">Repita la contraseña</label>
        <input
          v-model="repeat_password"
          class="form-control border-bottom"
          id="confirmPassword"
          type="password"
          placeholder="Repita la contraseña"
        />
      </div>
      <h5 class="mt-5">Requisitos de Contraseña</h5>
      <p class="text-muted mb-2">
        Por favor siga esta guia para establecer una contraseña segura:
      </p>
      <ul class="text-muted ps-4 mb-0 float-start">
        <li>
          <span class="text-sm">Uno o mas caracteres especiales</span>
        </li>
        <li>
          <span class="text-sm">Minimo 6 caracteres</span>
        </li>
        <li>
          <span class="text-sm">Uno o mas numeros</span>
        </li>
        <li>
          <span class="text-sm">Cámbiala a menudo</span>
        </li>
      </ul>
      <material-button
        class="float-end mt-6 mb-0"
        color="dark"
        variant="gradient"
        size="sm"
        @click="resetPassword"
      >Cambiar Contraseña
      </material-button
      >
    </div>
  </div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import MaterialBadge from "@/components/MaterialBadge.vue";
import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import gql from "graphql-tag";
import Swal from "sweetalert2";

const USER_ID = gql`
query UserById($id:Int!) {
    userById(id: $id) {
        id
        username
        firstName
        lastName
        email
        isActive
    }
}`;
const UPDATE_USER = gql`
  mutation ActualizarUsuario(
    $apellidos: String!
    $email: String!
    $id: Int!
    $nombre: String!
    $usuario: String!
) {
    actualizarUsuario(
        apellidos: $apellidos
        email: $email
        id: $id
        nombre: $nombre
        usuario: $usuario
    ) {
        error
        success
    }
}
`;
const RESET_PASSWORD = gql`
mutation ActualizarPassword($id:Int!, $password:String!, $newPassword:String!) {
    actualizarPassword(id: $id, newPassword: $newPassword, password: $password) {
        success
        error
    }
}`;
export default {
  name: "SideNavItem",
  components: {
    MaterialButton,
    MaterialSwitch,
    MaterialBadge,
    MaterialAvatar,
    MaterialInput
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      userid: this.$store.state.userid,
      old_password: "",
      newpassword: "",
      repeat_password: ""
    };
  },
  methods: {
    async updateUsuario() {
      this.$apollo
        .mutate({
          mutation: UPDATE_USER,
          variables: {
            id: this.userid,
            usuario: this.username,
            nombre: this.firstName,
            apellidos: this.lastName,
            email: this.email
          }
        }).then(response => {
        if (response.data.actualizarUsuario.success) {
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
            title: "Usuario actualizado"
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
            title: "Error al actualizar el usuario"
          });
        }
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
          title: "Error al actualizar el usuario"
        });
      });
    },
    async resetPassword() {
      if (this.newpassword === this.repeat_password) {
        await this.$apollo.mutate({
          mutation: RESET_PASSWORD,
          variables: {
            id: this.userid,
            newPassword: this.newpassword,
            password: this.old_password
          }
        }).then(response => {
          this.$store.state.IsLogin = true;
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
            title: "Contraseña cambiada"
          });
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
          title: "Las nuevas contraseña no coinciden"
        });
      }
    }
  },
  async created() {
    await this.$apollo.query({
      query: USER_ID,
      variables: {
        id: this.userid
      }
    }).then(response => {
      this.username = response.data.userById.username;
      this.firstName = response.data.userById.firstName;
      this.lastName = response.data.userById.lastName;
      this.email = response.data.userById.email;
    });

  }
};
</script>
