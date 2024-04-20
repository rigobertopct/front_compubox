<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ atletas_text }}</h5>
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
                {{ deporte_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ acciones_text }}
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in deportistas" :key="item.id"
                v-show="this.$store.state.provincia===item.provincia.id || $store.state.group==='Administrador'">
              <td class="text-sm font-weight-normal ps-4">{{ item.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.edad }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.peso }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.deporte.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button
                    @click="openUpdate(item)"
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nuevo_atleta_text }}<i @click="closeModal"
                                                                                                   class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ nombre_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ identidad_text }}</label>
              <input v-model="ci" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ pais_text }}</label>
              <select v-model="pais" class="form-select border-bottom border-dark p-2 mb-3">
                <option v-for="item in paises" :key="item.id" :value="item.id">{{ item.pais }}</option>
              </select>
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ peso_text }}</label>
              <input v-model="peso" class="form-control border-bottom border-dark p-2 mb-3"
                     type="number">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ estatura_text }}</label>
              <input v-model="estatura" class="form-control border-bottom border-dark p-2 mb-3"
                     type="number">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ sexo_text }}</label>
              <select v-model="sexo" class="form-select border-bottom border-dark p-2 mb-3">
                <option value="Femenino">{{ femenino_text }}</option>
                <option value="Masculino">{{ masculino_text }}</option>
              </select>
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ fecha_nacimiento_text }}</label>
              <VueDatePicker v-model="fecha_nacimiento" :enable-time-picker="false" placeholder="Seleccione una fecha"
                             auto-apply locale="es" class="form_fecha mb-3" />
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ anno_deporte_text }}</label>
              <VueDatePicker v-model="anno_deporte" year-picker auto-apply />
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ anno_equipo_nacional_text }}</label>
              <VueDatePicker v-model="anno_nacional" year-picker auto-apply />
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ deporte_text }}</label>
              <select v-model="deporte" class="form-control border-bottom border-dark p-2 mb-3">
                <option v-for="item in deportes" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 servicios">
              <label class="form-label ms-1">{{ disciplina_text }}</label>
              <select class="form-select shadow-none rounded-0 text-black" v-model="disciplina"
                      :disabled="deporte===0">
                <option v-for="item in disciplinas" :key="item.id" :value="item.id" v-show="item.deporte.id===deporte"
                        :disabled="this.disciplinas_selected.includes(item.id)">{{ item.nombre }} {{ item.codigo }}
                </option>
              </select>
              <div class="selected-items">
                <div class="selected-item" v-for="item in disciplinas"
                     v-show="disciplinas_selected.includes(item.id)">
                  <span> {{ item.nombre }} {{ item.codigo }} </span>
                  <span class="remove-item" @click="Quitar(item.id)">x</span>
                </div>
              </div>
            </div>
            <div v-show="error" class="text-danger mt-3 text-center p-2"
                 style="background-color: rgba(255,19,28,0.08)">
              <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                <p class="text-dark">{{ error_text }}</p></div>
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
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ actualizar_atleta_text }}<i
              @click="closeUpdate"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ nombre_text }}</label>
              <input v-model="nombre" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ identidad_text }}</label>
              <input v-model="ci" class="form-control border-bottom border-dark p-2 mb-3"
                     type="text">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ pais_text }}</label>
              <select v-model="pais" class="form-select border-bottom border-dark p-2 mb-3">
                <option v-for="item in paises" :key="item.id" :value="item.id">{{ item.pais }}</option>
              </select>
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ peso_text }}</label>
              <input v-model="peso" class="form-control border-bottom border-dark p-2 mb-3"
                     type="number">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ estatura_text }}</label>
              <input v-model="estatura" class="form-control border-bottom border-dark p-2 mb-3"
                     type="number">
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ sexo_text }}</label>
              <select v-model="sexo" class="form-select border-bottom border-dark p-2 mb-3">
                <option value="Femenino">{{ femenino_text }}</option>
                <option value="Masculino">{{ masculino_text }}</option>
              </select>
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ fecha_nacimiento_text }}</label>
              <VueDatePicker v-model="fecha_nacimiento" :enable-time-picker="false"
                             auto-apply locale="es" class="form_fecha mb-3" />
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ anno_deporte_text }}</label>
              <VueDatePicker v-model="anno_deporte" year-picker auto-apply />
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ anno_equipo_nacional_text }}</label>
              <VueDatePicker v-model="anno_nacional" year-picker auto-apply />
            </div>
            <div class="col-md-6 col-lg-4 col-sm-12">
              <label class="form-label">{{ deporte_text }}</label>
              <select v-model="deporte" class="form-select border-bottom border-dark p-2 mb-3">
                <option v-for="item in deportes" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 servicios">
              <label class="form-label ms-1">{{ disciplina_text }}</label>
              <select class="form-select shadow-none rounded-0 text-black" v-model="disciplina"
                      :disabled="deporte===0">
                <option v-for="item in disciplinas" :key="item.id" :value="item.id" v-show="item.deporte.id===deporte"
                        :disabled="this.disciplinas_selected.includes(item.id)">{{ item.nombre }} {{ item.codigo }}
                </option>
              </select>
              <div class="selected-items">
                <div class="selected-item" v-for="item in disciplinas"
                     v-show="disciplinas_selected.includes(item.id)">
                  <span> {{ item.nombre }}</span>
                  <span class="remove-item" @click="Quitar(item.id)">x</span>
                </div>
              </div>
            </div>
            <div v-show="error" class="text-danger mt-3 text-center p-2"
                 style="background-color: rgba(255,19,28,0.08)">
              <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                <p class="text-dark">{{ error_text }}</p></div>
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

const BUSCAR = gql`
query Deportistas($name:String!) {
    deportistas(name: $name) {
        id
        nombre
        edad
        estatura
        peso
        sexo
        foto
        ci
        annoDeporte
        annoNacional
        fechaNacimiento
        codigo
        isActive
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
        deporte {
            id
            nombre
            siglas
        }
        deportistadisciplinaSet {
            id
            disciplina {
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
    }
}
`;
const NUEVO = gql`
mutation NuevoDeportista(
    $annoDeporte:String!
    $annoNacional:String!
    $ci:String!
    $disciplina:[ID!]
    $fechaNacimiento:Date!
    $nombre:String!
    $pais:ID!
    $sexo:String!
    $edad:Int!
    $peso:Decimal!
    $estatura:Decimal!
    $deporte:ID!
    $provincia:ID!
) {
    nuevoDeportista(
        annoDeporte: $annoDeporte
        annoNacional: $annoNacional
        ci: $ci
        disciplina: $disciplina
        fechaNacimiento: $fechaNacimiento
        nombre: $nombre
        pais: $pais
        sexo: $sexo
        edad: $edad
        peso: $peso
        estatura:$estatura
        deporte:$deporte
        provincia:$provincia
    ) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`
mutation NuevoDeportista(
    $annoDeporte:String!
    $annoNacional:String!
    $ci:String!
    $disciplina:[ID!]
    $fechaNacimiento:Date!
    $nombre:String!
    $pais:ID!
    $sexo:String!
    $edad:Int!
    $peso:Decimal!
    $id:ID!
    $deporte:ID!
    $estatura:Decimal!
) {
    updateDeportista(
        annoDeporte: $annoDeporte
        annoNacional: $annoNacional
        ci: $ci
        disciplina: $disciplina
        fechaNacimiento: $fechaNacimiento
        nombre: $nombre
        pais: $pais
        sexo: $sexo
        edad: $edad
        peso: $peso
        id:$id
        estatura:$estatura
        deporte:$deporte
    ) {
        success
        errors
    }
}`;
const DISCIPLINAS = gql`
query Disciplinas($idioma:String!) {
    disciplinas(name: "", idioma:$idioma) {
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
const DEPORTES = gql`
query Deportes {
    deportes(name: "") {
        id
        nombre
        siglas
    }
}`;
const PAISES = gql`
query Paises {
    paises(name: "") {
        id
        pais
        siglas
    }
}`;
export default {
  name: "Atletas",
  data() {
    return {
      deportistas: [],
      paises: [],
      disciplinas: [],
      deportes: [],
      deporte: 0,
      disciplina: 0,
      name: "",
      showModal: false,
      error: false,
      nombre: "",
      edad: 0,
      estatura: 0,
      peso: 0,
      ci: "",
      pais: 0,
      sexo: "",
      fecha_nacimiento: null,
      anno_deporte: null,
      anno_nacional: null,
      id: 0,
      showUpdate: false,
      disciplinas_selected: [],

      siglas_text: "Siglas",
      actualizar_deporte_text: "Actualizar deporte",
      nuevo_atleta_text: "Nuevo atleta",
      actualizar_atleta_text: "Actualizar atleta",
      identidad_text: "Número de identidad",
      pais_text: "País",
      peso_text: "Peso",
      estatura_text: "Estatura",
      sexo_text: "Sexo",
      fecha_nacimiento_text: "Fecha de nacimiento",
      anno_deporte_text: "Año en el deporte",
      anno_equipo_nacional_text: "Año en el equipo nacional",

      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar",
      error_text: "No pueden haber campos vacíos",
      deporte_text: "Deporte",
      nombre_text: "Nombre",
      femenino_text: "Femenino",
      masculino_text: "Masculino",
      disciplina_text: "Disciplina",
      atletas_text: "Atletas",
      edad_text: "Edad"
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
      this.disciplina_text = "Disciplina";
      this.femenino_text = "Femenino";
      this.masculino_text = "Masculino";

      this.nuevo_deporte = "Nuevo deporte";
      this.siglas_text = "Siglas";
      this.actualizar_atleta_text = "Actualizar atleta";
      this.nuevo_atleta_text = "Nuevo atleta";
      this.identidad_text = "Número de identidad";
      this.pais_text = "País";
      this.peso_text = "Peso";
      this.estatura_text = "Estatura";
      this.sexo_text = "Sexo";
      this.fecha_nacimiento_text = "Fecha de nacimiento";
      this.anno_deporte_text = "Año en el deporte";
      this.anno_equipo_nacional_text = "Año en el equipo nacional";
      this.atletas_text = "Atletas";
      this.edad_text = "Edad";
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
      this.disciplina_text = "Дисциплина";
      this.femenino_text = "Женский";
      this.masculino_text = "Мужской";
      this.deporte_text = "Спорт";

      this.siglas_text = "акроним";
      this.identidad_text = "идентификационный номер";
      this.nuevo_atleta_text = "Новый спортсмен";
      this.actualizar_atleta_text = "Обновление спортсмена";
      this.pais_text = "страна";
      this.peso_text = "Масса";
      this.estatura_text = "Высота";
      this.sexo_text = "Секс";
      this.fecha_nacimiento_text = "Дата рождения";
      this.anno_deporte_text = "Год в спорте";
      this.anno_equipo_nacional_text = "Год в сборной";
      this.atletas_text = "Спортсмены";
      this.edad_text = "Возраст";
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
      this.disciplina_text = "Discipline";
      this.femenino_text = "Female";
      this.masculino_text = "Male";
      this.deporte_text = "Sport";

      this.siglas_text = "Acronym";
      this.nuevo_atleta_text = "New athlete";
      this.actualizar_atleta_text = "Update athlete";
      this.identidad_text = "ID number";
      this.pais_text = "Country";
      this.peso_text = "Weight";
      this.estatura_text = "Height";
      this.sexo_text = "Sex";
      this.fecha_nacimiento_text = "Birthdate";
      this.anno_deporte_text = "Year in sport";
      this.anno_equipo_nacional_text = "Year in the national team";
      this.atletas_text = "Athletes";
      this.edad_text = "Age";
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
      this.disciplina_text = "Discipline";
      this.femenino_text = "Femelle";
      this.masculino_text = "Mâle";
      this.deporte_text = "Sport";

      this.siglas_text = "Acronyme";
      this.nuevo_atleta_text = "Nouvel athlète";
      this.actualizar_atleta_text = "Mettre à jour l'athlète";
      this.identidad_text = "Numéro d'identité";
      this.pais_text = "Pays";
      this.peso_text = "Poids";
      this.estatura_text = "Hauteur";
      this.sexo_text = "Sexe";
      this.fecha_nacimiento_text = "Date de naissance";
      this.anno_deporte_text = "Année sportive";
      this.anno_equipo_nacional_text = "Año en el equipo nacional";
      this.atletas_text = "Les athlètes";
      this.edad_text = "Âge";
    }
  },
  apollo: {
    deportistas: {
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
      query: DEPORTES,
      variables() {
        return {
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    disciplinas: {
      query: DISCIPLINAS,
      variables() {
        return {
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    paises: {
      query: PAISES,
      fetchPolicy: "cache-and-network"
    }
  },
  watch: {
    disciplina(value) {
      this.disciplinas_selected.push(value);
    },
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
        this.disciplina_text = "Disciplina";
        this.femenino_text = "Femenino";
        this.masculino_text = "Masculino";

        this.nuevo_deporte = "Nuevo deporte";
        this.siglas_text = "Siglas";
        this.actualizar_atleta_text = "Actualizar atleta";
        this.nuevo_atleta_text = "Nuevo atleta";
        this.identidad_text = "Número de identidad";
        this.pais_text = "País";
        this.peso_text = "Peso";
        this.estatura_text = "Estatura";
        this.sexo_text = "Sexo";
        this.fecha_nacimiento_text = "Fecha de nacimiento";
        this.anno_deporte_text = "Año en el deporte";
        this.anno_equipo_nacional_text = "Año en el equipo nacional";
        this.atletas_text = "Atletas";
        this.edad_text = "Edad";
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
        this.disciplina_text = "Дисциплина";
        this.femenino_text = "Женский";
        this.masculino_text = "Мужской";
        this.deporte_text = "Спорт";

        this.siglas_text = "акроним";
        this.identidad_text = "идентификационный номер";
        this.nuevo_atleta_text = "Новый спортсмен";
        this.actualizar_atleta_text = "Обновление спортсмена";
        this.pais_text = "страна";
        this.peso_text = "Масса";
        this.estatura_text = "Высота";
        this.sexo_text = "Секс";
        this.fecha_nacimiento_text = "Дата рождения";
        this.anno_deporte_text = "Год в спорте";
        this.anno_equipo_nacional_text = "Год в сборной";
        this.atletas_text = "Спортсмены";
        this.edad_text = "Возраст";
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
        this.disciplina_text = "Discipline";
        this.femenino_text = "Female";
        this.masculino_text = "Male";
        this.deporte_text = "Sport";

        this.siglas_text = "Acronym";
        this.nuevo_atleta_text = "New athlete";
        this.actualizar_atleta_text = "Update athlete";
        this.identidad_text = "ID number";
        this.pais_text = "Country";
        this.peso_text = "Weight";
        this.estatura_text = "Height";
        this.sexo_text = "Sex";
        this.fecha_nacimiento_text = "Birthdate";
        this.anno_deporte_text = "Year in sport";
        this.anno_equipo_nacional_text = "Year in the national team";
        this.atletas_text = "Athletes";
        this.edad_text = "Age";
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
        this.disciplina_text = "Discipline";
        this.femenino_text = "Femelle";
        this.masculino_text = "Mâle";
        this.deporte_text = "Sport";

        this.siglas_text = "Acronyme";
        this.nuevo_atleta_text = "Nouvel athlète";
        this.actualizar_atleta_text = "Mettre à jour l'athlète";
        this.identidad_text = "Numéro d'identité";
        this.pais_text = "Pays";
        this.peso_text = "Poids";
        this.estatura_text = "Hauteur";
        this.sexo_text = "Sexe";
        this.fecha_nacimiento_text = "Date de naissance";
        this.anno_deporte_text = "Année sportive";
        this.anno_equipo_nacional_text = "Año en el equipo nacional";
        this.atletas_text = "Les athlètes";
        this.edad_text = "Âge";
      }
    }
  },
  methods: {
    async Guardar() {
      if (this.nombre === "" || this.peso === 0 || this.estatura === 0 || this.disciplinas_selected.length === 0 ||
        this.anno_deporte === null || this.fecha_nacimiento === null || this.ci === "") {
        this.error = true;
        return false;
      }
      const fecha = new Date();
      this.edad = fecha.getFullYear() - this.fecha_nacimiento.getFullYear();
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          annoDeporte: this.anno_deporte,
          annoNacional: this.anno_nacional ? this.anno_nacional : "0",
          ci: this.ci,
          disciplina: this.disciplinas_selected,
          fechaNacimiento: this.convertirADate(this.fecha_nacimiento),
          nombre: this.nombre,
          pais: this.pais,
          sexo: this.sexo,
          edad: this.edad,
          peso: this.peso,
          deporte: this.deporte,
          estatura: this.estatura,
          provincia: this.$store.state.provincia
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.nuevoDeportista.success) {
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
            title: response.data.nuevoDeportista.errors
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
      if (this.nombre === "" || this.edad === 0 || this.peso === 0 || this.estatura === 0 || this.disciplinas_selected.length === 0 ||
        this.anno_deporte === null || this.fecha_nacimiento === null || this.ci === "") {
        this.error = true;
        return false;
      }
      const fecha = new Date();
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          annoDeporte: this.anno_deporte,
          annoNacional: this.anno_nacional,
          ci: this.ci,
          disciplina: this.disciplinas_selected,
          fechaNacimiento: this.convertirADate(this.fecha_nacimiento),
          nombre: this.nombre,
          pais: this.pais,
          sexo: this.sexo,
          edad: this.edad,
          deporte: this.deporte,
          peso: this.peso,
          estatura: this.estatura,
          id: this.id
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name } }]
      }).then(response => {
        if (response.data.updateDeportista.success) {
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
            title: response.data.updateDeportista.errors
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
    openModal() {
      this.showModal = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    openUpdate(item) {
      this.id = item.id;
      this.nombre = item.nombre;
      this.edad = item.edad;
      this.estatura = item.estatura;
      this.peso = item.peso;
      this.deporte = item.deporte ? item.deporte.id : 0;
      item.deportistadisciplinaSet.forEach(item => {
        this.disciplinas_selected.push(item.disciplina.id);
      });
      console.log(this.disciplinas_selected);
      this.fecha_nacimiento = item.fechaNacimiento;
      this.anno_deporte = item.annoDeporte;
      this.anno_nacional = item.annoNacional;
      this.sexo = item.sexo;
      this.pais = item.pais.id;
      this.ci = item.ci;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.deporte = 0;
      this.disciplina = 0;
      this.nombre = "";
      this.edad = 0;
      this.estatura = 0;
      this.peso = 0;
      this.ci = "";
      this.pais = 0;
      this.sexo = "";
      this.fecha_nacimiento = null;
      this.anno_deporte = null;
      this.anno_nacional = null;
      this.id = 0;
      this.showModal = false;
      this.error = false;
      this.disciplinas_selected = [];
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.deporte = 0;
      this.disciplina = 0;
      this.nombre = "";
      this.edad = 0;
      this.estatura = 0;
      this.peso = 0;
      this.disciplinas_selected = [];
      this.ci = "";
      this.pais = 0;
      this.sexo = "";
      this.fecha_nacimiento = null;
      this.anno_deporte = null;
      this.anno_nacional = null;
      this.id = 0;
      this.showUpdate = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    onTransitionEnd(event) {
      if (event.propertyName === "opacity" && !this.showModal) {
        this.$emit("close");
      }
    },
    convertirADate(fecha) {
      const fechaDate = new Date(fecha); // Crea un objeto Date a partir de la cadena datetime
      const dia = fechaDate.getDate();
      const mes = fechaDate.getMonth() + 1; // ¡Recuerda que los meses en JavaScript van de 0 a 11!
      const anio = fechaDate.getFullYear();
      return `${anio}-${mes < 10 ? "0" : ""}${mes}-${dia < 10 ? "0" : ""}${dia}`;
    },
    Quitar(id) {
      let newArreglo = [];
      this.disciplinas_selected.forEach(item => {
        if (item !== id) {
          newArreglo.push(item);
        }
      });
      this.disciplinas_selected = newArreglo;
      newArreglo = [];
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

.selected-items {
  display: flex;
  margin-top: 10px;
}

.selected-item {
  background-color: lightgray;
  border: 1px solid gray;
  margin: 5px;
  padding: 5px 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.selected-item span {
  margin-right: 5px;
  color: #0d0c1d;
}

.remove-item {
  cursor: pointer;
  margin-left: 5px;
  color: #0d0c1d;
}
</style>
