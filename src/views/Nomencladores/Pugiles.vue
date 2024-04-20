<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ pugiles_text }}</h5>
        </div>
        <div class="d-flex justify-content-between m-3">
          <div class="col-3">
            <div class="input-group">
              <input v-model="name" type="text" class="form-control input-icon"
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
                {{ edad_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ peso_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ categorias_text }}
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
            <tr v-for="item in pugiles" :key="item.id"
                v-show="this.$store.state.provincia===item.deportista.provincia.id || $store.state.group==='Administrador'">
              <td class="text-sm font-weight-normal ps-4">{{ item.deportista.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.deportista.edad }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.deportista.peso }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.categoria.categoria }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.deportista.pais.pais }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button
                    @click="openUpdate(item.id, item.deportista.nombre, item.categoria.id,
                     item.deportista.pais.id, item.deportista.peso, item.deportista.edad, item.ranking)"
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{nuevo_pugil_text}}<i @click="closeModal"
                                                                                       class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ nombre_text }}</label>
              <input v-model="nombre" class="form-control mb-2"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ edad_text }}</label>
              <input v-model="edad" class="form-control mb-2"
                     type="number" min="0">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ peso_text }}</label>
              <input v-model="peso" class="form-control mb-2"
                     type="number" min="0">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ categorias_text }}</label>
              <select v-model="categoria" class="form-select mb-2">
                <option v-for="item in categorias" :value="item.id" :key="item.id">{{ item.categoria }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ pais_text }}</label>
              <select v-model="pais" class="form-select mb-2">
                <option v-for="pais in paises" :value="pais.id" :key="pais.id">{{ pais.pais }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ ranking_text }}</label>
              <input v-model="ranking" class="form-control mb-2"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i
                  class="material-icons-round opacity-10 me-2">error</i>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{actualizar_pugil_text}}<i @click="closeUpdate"
                                                                                            class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{nombre_text}}</label>
              <input v-model="nombre" class="form-control mb-2"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{edad_text}}</label>
              <input v-model="edad" class="form-control mb-2"
                     type="number" min="0">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{peso_text}}</label>
              <input v-model="peso" class="form-control mb-2"
                     type="number" min="0">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{categorias_text}}</label>
              <select v-model="categoria" class="form-select mb-2">
                <option v-for="item in categorias" :value="item.id" :key="item.id">{{ item.categoria }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{pais_text}}</label>
              <select v-model="pais" class="form-select mb-2">
                <option v-for="pais in paises" :value="pais.id" :key="pais.id">{{ pais.pais }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ranking_text}}</label>
              <input v-model="ranking" class="form-control mb-2"
                     type="text">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i
                  class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">{{ error_text}}</p></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeUpdate" class="btn btn-secondary" type="button">{{cancelar_text}}</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Actualizar" class="btn btn-dark" type="button">{{guardar_text}}</button>
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
query Pugiles($name:String!) {
    pugiles(name: $name) {
        id
        ranking
        deportista {
            id
            nombre
            edad
            peso
            foto
            pais {
                id
                pais
                siglas
            }
            provincia {
                id
                nombre
                siglas
            }
        }
        categoria {
            id
            categoria
            pesoMin
            pesoMax
        }
    }
}`;
const CATEGORIAS = gql`query Categorias($idioma:String!) {
    categorias(name: "", idioma:$idioma) {
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
const NUEVO = gql`
mutation NuevoPugil(
    $categoria: Int!
    $nombre: String!
    $pais: Int!
    $edad: Int!
    $peso: Decimal!
    $ranking: String!
    $provincia:ID!
) {
    nuevoPugil(
        categoria: $categoria
        nombre: $nombre
        pais: $pais
        edad: $edad
        peso: $peso
        ranking: $ranking
        provincia:$provincia
    ) {
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
      ranking: "",
      pais: 0,
      categoria: 0,
      nombre: "",
      edad: 0,
      peso: 0,
      id: 0,
      showUpdate: false,

      pugiles_text: "Púgiles",
      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar",
      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      categorias_text: "Categoría",

      nombre_text: "Nombre",
      edad_text: "Edad",
      pais_text: "País",
      peso_text: "Peso",
      ranking_text: "Ranking",
      error_text: "No pueden haber campos vacíos",
      nuevo_pugil_text: "Nuevo púgil",
      actualizar_pugil_text: "Actualizar púgil"

    };
  },
  computed: {
    ...mapState(["idioma"])
  },
  watch: {
    idioma() {
      if (this.idioma === "es") {
        this.pugiles_text = "Púgiles";
        this.categorias_text = "Categoría";
        this.acciones_text = "Acciones";
        this.buscar_text = "Buscar";
        this.nuevo_text = "Nuevo";
        this.editar_text = "Editar";
        this.cancelar_text = "Cancelar";
        this.guardar_text = "Guardar";

        this.nombre_text = "Nombre";
        this.edad_text = "Edad";
        this.pais_text = "País";
        this.peso_text = "Peso";
        this.ranking_text = "Ranking";
        this.error_text = "No pueden haber campos vacíos";
        this.nuevo_pugil_text = "Nuevo púgil";
        this.actualizar_pugil_text = "Actualizar púgil";
      }
      if (this.idioma === "ru") {
        this.pugiles_text = "Боксеры";
        this.categorias_text = "Категории";
        this.acciones_text = "Действия";
        this.buscar_text = "Искать";
        this.nuevo_text = "Новый";
        this.editar_text = "Редактировать";
        this.cancelar_text = "Отменить";
        this.guardar_text = "Принять";

        this.nombre_text = "Имя";
        this.edad_text = "Возраст";
        this.pais_text = "Страна";
        this.peso_text = "Масса";
        this.ranking_text = "Рейтинг";
        this.error_text = "Не может быть пустых полей";
        this.nuevo_pugil_text = "новый боксер";
        this.actualizar_pugil_text = "Обновление боксера";
      }
      if (this.idioma === "in") {
        this.pugiles_text = "Boxers";
        this.categorias_text = "Categories";
        this.acciones_text = "Actions";
        this.buscar_text = "Search";
        this.nuevo_text = "New";
        this.editar_text = "Edit";
        this.cancelar_text = "Cancel";
        this.guardar_text = "Save";

        this.nombre_text = "Name";
        this.edad_text = "Age";
        this.pais_text = "País";
        this.peso_text = "Weight";
        this.ranking_text = "Ranking";
        this.error_text = "There cannot be empty fields";
        this.nuevo_pugil_text = "New boxer";
        this.actualizar_pugil_text = "Update boxer";
      }
      if (this.idioma === "fr") {
        this.pugiles_text = "Boxeurs";
        this.categorias_text = "Catégories";
        this.acciones_text = "Actions";
        this.buscar_text = "Chercher";
        this.nuevo_text = "Nouveau";
        this.editar_text = "Modifier";
        this.cancelar_text = "Annuler";
        this.guardar_text = "Accepter";

        this.nombre_text = "Nom";
        this.edad_text = "Âge";
        this.pais_text = "Pays";
        this.peso_text = "Poids";
        this.ranking_text = "Classement";
        this.error_text = "Il ne peut pas y avoir de champs vides";
        this.nuevo_pugil_text = "Nouveau boxeur";
        this.actualizar_pugil_text = "Mettre à jour le boxeur";
      }
    }
  },
  created() {
    if (this.idioma === "es") {
      this.pugiles_text = "Púgiles";
      this.categorias_text = "Categoría";
      this.acciones_text = "Acciones";
      this.buscar_text = "Buscar";
      this.nuevo_text = "Nuevo";
      this.editar_text = "Editar";
      this.cancelar_text = "Cancelar";
      this.guardar_text = "Guardar";

      this.nombre_text = "Nombre";
      this.edad_text = "Edad";
      this.pais_text = "País";
      this.peso_text = "Peso";
      this.ranking_text = "Ranking";
      this.error_text = "No pueden haber campos vacíos";
      this.nuevo_pugil_text = "Nuevo púgil";
      this.actualizar_pugil_text = "Actualizar púgil";
    }
    if (this.idioma === "ru") {
      this.pugiles_text = "Боксеры";
      this.categorias_text = "Категории";
      this.acciones_text = "Действия";
      this.buscar_text = "Искать";
      this.nuevo_text = "Новый";
      this.editar_text = "Редактировать";
      this.cancelar_text = "Отменить";
      this.guardar_text = "Принять";

      this.nombre_text = "Имя";
      this.edad_text = "Возраст";
      this.pais_text = "Страна";
      this.peso_text = "Масса";
      this.ranking_text = "Рейтинг";
      this.error_text = "Не может быть пустых полей";
      this.nuevo_pugil_text = "новый боксер";
      this.actualizar_pugil_text = "Обновление боксера";
    }
    if (this.idioma === "in") {
      this.pugiles_text = "Boxers";
      this.categorias_text = "Categories";
      this.acciones_text = "Actions";
      this.buscar_text = "Search";
      this.nuevo_text = "New";
      this.editar_text = "Edit";
      this.cancelar_text = "Cancel";
      this.guardar_text = "Save";

      this.nombre_text = "Name";
      this.edad_text = "Age";
      this.pais_text = "País";
      this.peso_text = "Weight";
      this.ranking_text = "Ranking";
      this.error_text = "There cannot be empty fields";
      this.nuevo_pugil_text = "New boxer";
      this.actualizar_pugil_text = "Update boxer";
    }
    if (this.idioma === "fr") {
      this.pugiles_text = "Boxeurs";
      this.categorias_text = "Catégories";
      this.acciones_text = "Actions";
      this.buscar_text = "Chercher";
      this.nuevo_text = "Nouveau";
      this.editar_text = "Modifier";
      this.cancelar_text = "Annuler";
      this.guardar_text = "Accepter";

      this.nombre_text = "Nom";
      this.edad_text = "Âge";
      this.pais_text = "Pays";
      this.peso_text = "Poids";
      this.ranking_text = "Classement";
      this.error_text = "Il ne peut pas y avoir de champs vides";
      this.nuevo_pugil_text = "Nouveau boxeur";
      this.actualizar_pugil_text = "Mettre à jour le boxeur";
    }
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
      variables(){
        return{
          idioma:this.idioma
        }
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
      if (this.pais === 0 || this.nombre === "" || this.edad === 0 || this.categoria === 0 || this.peso === 0) {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          categoria: this.categoria,
          nombre: this.nombre,
          pais: this.pais,
          edad: this.edad,
          peso: this.peso,
          ranking: this.ranking,
          provincia: this.$store.state.provincia
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
            title: response.data.nuevoPugil.errors
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
            title: response.data.actualizarPugil.errors
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
              title: "Hay combates asociados a este púgil"
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
    openUpdate(id, nombre, categoria, pais, peso, edad, ranking) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.pais = pais;
      this.peso = peso;
      this.edad = edad;
      this.ranking = ranking;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.id = 0;
      this.nombre = "";
      this.categoria = 0;
      this.pais = 0;
      this.ranking = 0;
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
      this.ranking = 0;
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

</style>
