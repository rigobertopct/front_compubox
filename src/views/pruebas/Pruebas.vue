<template>
  <div class="mt-4 row">
    <div class="col-12">
      <div class="card shadow-lg">
        <!-- Card header -->
        <div class="card-header">
          <h5 class="mb-0">{{ prueba_text }}</h5>
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
                {{ fecha_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ deportista_text }}
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ lugar_text }}
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
            <tr v-for="item in pruebas" :key="item.id"
                v-show="this.$store.state.provincia===item.deportista.provincia.id || $store.state.group==='Administrador'">
              <td class="text-sm font-weight-normal ps-4">{{ item.fecha }}</td>
              <td class="text-sm font-weight-normal ps-4">
                {{ $store.state.group !== "Administrador" ? item.deportista.codigo : item.deportista.nombre }}
              </td>
              <td class="text-sm font-weight-normal ps-4">{{ item.lugar.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">{{ item.deportista.deporte.nombre }}</td>
              <td class="text-sm font-weight-normal ps-4">
                <div class="btn-group" role="group">
                  <button data-bs-toggle="tooltip" data-bs-placement="top"
                          :title="llenar_indicadores_text" data-container="body" data-animation="true"
                          class="btn btn-success p-1 ms-1" @click="openIndicadores(item.id)">
                    <i class="material-icons opacity-10">add</i></button>
                  <button @click="openUpdate(item)"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :title="editar_text" data-container="body" data-animation="true"
                          class="btn btn-info p-1 ms-1">
                    <i class="material-icons opacity-10">check</i></button>
                  <button data-bs-toggle="tooltip" data-bs-placement="top"
                          :title="ver_indicadores_text" data-container="body" data-animation="true"
                          class="btn btn-success p-1 ms-1" @click="openVer_Indicadores(item.id)">
                    <i class="material-icons opacity-10">visibility</i></button>
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
            <h4 class="text-start"><i class="fa fa-plus-square me-2"></i>{{ nueva_prueba_text }}<i @click="closeModal"
                                                                                                   class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ fecha_text }}</label>
              <VueDatePicker v-model="fecha" :enable-time-picker="false"
                             auto-apply locale="es" class="form_fecha mb-3" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ deportista_text }}</label>
              <select v-model="deportista" class="form-select mb-3 p-2 border-bottom border-dark">
                <option v-for="item in deportistas" :key="item.id" :value="item.id"
                        v-show="this.$store.state.provincia===item.provincia.id || $store.state.group==='Administrador'">
                  {{ $store.state.group !== "Administrador" ? item.codigo : item.nombre
                  }}
                </option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ lugar_text }}</label>
              <select v-model="lugar" class="form-select mb-3 p-2 border-bottom border-dark">
                <option v-for="item in lugares" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <label class="form-label">{{ etapa_competitivs_text }}</label>
              <select class="form-select mb-3 p-2 border-bottom border-dark" v-model="etapa">
                <option>{{ preparacion_general_text }}</option>
                <option>{{ preparacion_especial_text }}</option>
                <option>{{ preparacion_precompetitiva_text }}</option>
                <option>{{ preparacion_competitiva_text }}</option>
              </select>
            </div>
            <div v-show="error" class="text-danger mt-3 text-center p-2 border-bottom border-dark"
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
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ actualizar_text }}<i @click="closeUpdate"
                                                                                                   class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-12 col-lg-6">
              <label class="form-label">{{ fecha_text }}</label>
              <VueDatePicker v-model="fecha" :enable-time-picker="false"
                             auto-apply locale="es" class="form_fecha mb-3" />
            </div>
            <div class="col-md-6 col-sm-12 col-lg-6">
              <label class="form-label">{{ deportista_text }}</label>
              <select v-model="deportista" class="form-control mb-3 p-2 border-bottom border-dark">
                <option v-for="item in deportistas" :key="item.id" :value="item.id"
                        v-show="this.$store.state.provincia===item.provincia.id || $store.state.group==='Administrador'">
                  {{ $store.state.group !== "Administrador" ? item.codigo : item.nombre
                  }}
                </option>
              </select>
            </div>
            <div class="col-md-6 col-sm-12 col-lg-6">
              <label class="form-label">{{ lugar_text }}</label>
              <select v-model="lugar" class="form-control mb-3 p-2 border-bottom border-dark">
                <option v-for="item in lugares" :key="item.id" :value="item.id">{{ item.nombre }}</option>
              </select>
            </div>
            <div class="col-6">
              <label class="form-label">{{ etapa_competitivs_text }}</label>
              <select class="form-select mb-3 p-2 border-bottom border-dark" v-model="etapa">
                <option>{{ preparacion_general_text }}</option>
                <option>{{ preparacion_especial_text }}</option>
                <option>{{ preparacion_precompetitiva_text }}</option>
                <option>{{ preparacion_competitiva_text }}</option>
              </select>
            </div>
            <div class="col-12">
              <label class="form-label">{{ valoraciones_text }}</label>
              <textarea class="form-control p-2 border-bottom border-dark" v-model="valoraciones"></textarea>
            </div>
            <div class="col-12">
              <label class="form-label">{{ observaciones_text }}</label>
              <textarea class="form-control p-2 border-bottom border-dark" v-model="observaciones"></textarea>
            </div>
            <div v-show="error" class="text-danger mt-3 text-center p-2 border-bottom border-dark"
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
    <div class="divModal Indicadores">
      <div v-if="showIndicadores" :class="['modal', { 'show': showIndicadores }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ llenar_indicadores_text }}<i
              @click="closeIndicadores"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ prueba_text }}</label>
              <select v-model="prueba" class="form-select border-dark border-bottom p-2 mb-3">
                <option value="rast">{{ rast_text }}</option>
                <option value="carlson">{{ carlson_text }}</option>
              </select>
              <div class="row mb-2" v-show="prueba==='rast'">
                <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label">{{ tiempo1_text }}</label>
                  <input v-model="tiempo1" class="form-control border-bottom border-dark p-2 w-25"
                         type="text">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label">{{ tiempo2_text }}</label>
                  <input v-model="tiempo2" class="form-control border-bottom border-dark p-2 w-25"
                         type="text">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label">{{ tiempo3_text }}</label>
                  <input v-model="tiempo3" class="form-control border-bottom border-dark p-2 w-25"
                         type="text">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label">{{ tiempo4_text }}</label>
                  <input v-model="tiempo4" class="form-control border-bottom border-dark p-2 w-25"
                         type="text">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label">{{ tiempo5_text }}</label>
                  <input v-model="tiempo5" class="form-control border-bottom border-dark p-2 w-25"
                         type="text">
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                  <label class="form-label">{{ tiempo6_text }}</label>
                  <input v-model="tiempo6" class="form-control border-bottom border-dark p-2 w-25"
                         type="text">
                </div>
              </div>
              <div v-show="prueba==='carlson'">
                <div v-if="ventana" class="row mb-2">
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ frecuencia_cardiaca_antes_text }}</label>
                    <input v-model="frecuenciaCardiacaAntes" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ presion_arterial_antes_text }}</label>
                    <input v-model="presionSistolicaAntes" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ preseion_arterial_antes_text }}</label>
                    <input v-model="presionDiastolicaAntes" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">

                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_1 }}</label>
                    <input v-model="contactosUno" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_2 }}</label>
                    <input v-model="contactosDos" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_3 }}</label>
                    <input v-model="contactosTres" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_4 }}</label>
                    <input v-model="contactosQuatro" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_5 }}</label>
                    <input v-model="contactosCinco" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_6 }}</label>
                    <input v-model="contactosSeis" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_7 }}</label>
                    <input v-model="contactosSiete" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_8 }}</label>
                    <input v-model="contactosOcho" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label">{{ contactos_palier_9 }}</label>
                    <input v-model="contactosNueve" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-3">
                    <label class="form-label">{{ contactos_palier_10 }}</label>
                    <input v-model="contactosDiez" class="form-control border-bottom border-dark p-2 w-25"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-3">

                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 d-flex justify-content-between align-items-center mb-3">

                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
                    <button class="btn btn-dark" @click="ventana=false"><i
                      class="material-icons opacity-10">arrow_forward_ios</i></button>
                  </div>
                </div>
                <div v-else class="row mb-2">
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ frecuencia_cardiaca_despues_text }}</label>
                    <input v-model="frecuenciaCardiacaDespues" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ presion_arterial_despues_text }}</label>
                    <input v-model="presionSistolicaDespues" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ preseion_arterial_despues_text }}</label>
                    <input v-model="presionDiastolicaDespues" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                  </div>

                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ frecuencia_cardiaca_uno_text }}</label>
                    <input v-model="frecuenciaCardiacaMinUno" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ frecuencia_cardiaca_tres_text }}</label>
                    <input v-model="frecuenciaCardiacaMinTres" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ frecuencia_cardiaca_cinco_text }}</label>
                    <input v-model="frecuenciaCardiacaMinCinco" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-3 col-md-3 col-sm-12 mb-3">
                    <label class="form-label">{{ frecuencia_cardiaca_siete_text }}</label>
                    <input v-model="frecuenciaCardiacaMinSiete" class="form-control border-bottom border-dark p-2"
                           type="text">
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
                    <button class="btn btn-dark" @click="ventana=true"><i
                      class="material-icons opacity-10">arrow_back_ios</i></button>
                  </div>
                </div>
              </div>
              <div v-show="error" class="text-danger mt-3 text-center p-2"
                   style="background-color: rgba(255,19,28,0.08)">
                <div class="d-flex align-center justify-content-center"><i class="material-icons-round opacity-10 me-2">error</i>
                  <p class="text-dark">{{ error_text }}</p></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">
              <button @click="closeIndicadores" class="btn btn-secondary" type="button">{{ cancelar_text }}</button>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="Guardar_indicadores" class="btn btn-dark" type="button">{{ guardar_text }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divModal Show_Indicadores">
      <div v-if="verIndicadores" :class="['modal', { 'show': verIndicadores }]" @transitionend="onTransitionEnd">
        <div class="modal-content">
          <div class="row mb-3 border-bottom border-dark">
            <h4 class="text-start"><i class="fa fa-pencil-square me-2"></i>{{ ver_indicadores_text }}<i
              @click="closeVer_Indicadores"
              class="material-icons-round opacity-10 modal-icon">close</i>
            </h4>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label">{{ prueba_text }}</label>
              <select v-model="prueba" class="form-select border-dark border-bottom p-2 mb-3">
                <option value="rast">{{ rast_text }}</option>
                <option value="carlson">{{ carlson_text }}</option>
              </select>
              <div v-show="prueba==='rast'">
                <div class="row mb-2" v-for="item in rast" :key="item.id" v-show="item.prueba.id===id">
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ distancia_text }}</span>
                    <span>{{ item.distancia }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">

                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">

                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ tiempo1_text }}</span>
                    <span>{{ item.tiempoUno }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ tiempo2_text }}</span>
                    <span>{{ item.tiempoDos }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ tiempo3_text }}</span>
                    <span>{{ item.tiempoTres }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ tiempo4_text }}</span>
                    <span>{{ item.tiempoQuatro }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ tiempo5_text }}</span>
                    <span>{{ item.tiempoCinco }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ tiempo6_text }}</span>
                    <span>{{ item.tiempoSeis }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_palier1_text }}</span>
                    <span>{{ item.potenciaUno }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_palier2_text }}</span>
                    <span>{{ item.potenciaDos }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_palier3_text }}</span>
                    <span>{{ item.potenciaTres }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_palier4_text }}</span>
                    <span>{{ item.potenciaQuatro }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_palier5_text }}</span>
                    <span>{{ item.potenciaCinco }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_palier6_text }}</span>
                    <span>{{ item.potenciaSeis }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_maxima_text }} </span>
                    <span>{{ item.potenciaMaxima }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_minima_text }}</span>
                    <span>{{ item.potenciaMinima }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_media_text }}</span>
                    <span>{{ item.potenciaMedia }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ sumatoria_tiempos_text }} </span>
                    <span>{{ item.sumatoriaTiempo }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ potencia_relativa }}</span>
                    <span>{{ item.potenciaRelativa }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ indice_fatiga_text }}</span>
                    <span>{{ item.indiceFatiga }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ evaluacion_text }}</span>
                    <span>{{ item.evaluacion }}</span>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                    <span class="text-bold">{{ normalidad_potencia_text }}</span>
                    <span>{{ item.normalidadPotenciaMaxima }}</span>
                  </div>
                </div>
              </div>
              <div v-show="prueba==='carlson'">
                <div v-if="!curva">
                  <div class="row mb-2" v-for="item in carlson" :key="item.id" v-show="item.prueba.id===id">
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ frecuencia_cardiaca_antes_text }}</span>
                      <span>{{ item.frecuenciaCardiacaAntes }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ presion_arterial_antes_text }}</span>
                      <span>{{ item.presionSistolicaAntes }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ preseion_arterial_antes_text }}</span>
                      <span>{{ item.presionDiastolicaAntes }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_1 }}</span>
                      <span>{{ item.contactosUno }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_2 }}</span>
                      <span>{{ item.contactosDos }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_3 }}</span>
                      <span>{{ item.contactosTres }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_4 }}</span>
                      <span>{{ item.contactosQuatro }}</span>

                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_5 }}</span>
                      <span>{{ item.contactosCinco }}</span>

                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_6 }}</span>
                      <span>{{ item.contactosSeis }}</span>

                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_7 }}</span>
                      <span>{{ item.contactosSiete }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_8 }}</span>
                      <span>{{ item.contactosOcho }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_9 }}</span>
                      <span>{{ item.contactosNueve }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ contactos_palier_10 }}</span>
                      <span>{{ item.contactosDiez }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ frecuencia_cardiaca_despues_text }}</span>
                      <span>{{ item.frecuenciaCardiacaDespues }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ presion_arterial_despues_text }}</span>
                      <span>{{ item.presionSistolicaDespues }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ preseion_arterial_despues_text }}</span>
                      <span>{{ item.presionDiastolicaDespues }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ presion_arterial_diferencial_antes_text }}</span>
                      <span>{{ item.presionArterealDiferencialAntes }}</span>

                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ sumatoria_contactos_text }}</span>
                      <span>{{ item.sumatoriaContactos }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ reserva_frecuencia_text }}</span>
                      <span>{{ item.reservaFrecuencia }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ presion_arterial_diferencial_despues_text }} </span>
                      <span>{{ item.presionArterealDiferencialDespues }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ frecuencia_cardiaca_uno_text }} </span>
                      <span>{{ item.frecuenciaCardiacaMinUno }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ frecuencia_cardiaca_tres_text }} </span>
                      <span>{{ item.frecuenciaCardiacaMinTres }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ frecuencia_cardiaca_cinco_text }} </span>
                      <span>{{ item.frecuenciaCardiacaMinCinco }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ frecuencia_cardiaca_siete_text }} </span>
                      <span>{{ item.frecuenciaCardiacaMinSiete }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ sumatoria_latidos_text }} </span>
                      <span>{{ item.sumatoriaLatidosRecuperacion }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ potencia_erogada_text }} </span>
                      <span>{{ item.potenciaLatidos }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ reaccion_text }}</span>
                      <span>{{ item.indiceCalidad }}</span>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-between align-items-center">
                      <span class="text-bold">{{ evaluacion_icrcv }}</span>
                      <span>{{ item.evaluacion }}</span>
                    </div>

                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end">
                    <button class="btn btn-dark" @click="curva=true"><i
                      class="material-icons opacity-10">arrow_forward_ios</i></button>
                  </div>
                </div>
                <div v-else class="p-3 card-body" style="height: 300px">
                  <h5>{{ ecuacion_carslon }}</h5>
                  <default-line-chart
                    id="chart-line3"
                    height="200"
                    :title="title_grafico_text"
                    :chart="{
                      labels: [
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10'
                      ],
                      datasets: [
                        {
                          label: curva_carlson_text,
                          data: elementos_curva,
                        },
                         {
                          label: extandar_maximon_text,
                          data: lineaRecta,
                        },
                      ],
                    }"
                  />
                  <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-start">
                    <button class="btn btn-dark" @click="curva=false"><i
                      class="material-icons opacity-10">arrow_back_ios</i></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="row">
            <div class="col-6 d-flex justify-content-start">

            </div>
            <div class="col-6 d-flex justify-content-end">
              <button @click="closeVer_Indicadores" class="btn btn-secondary" type="button">{{ cerrar_text }}</button>
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
import DefaultLineChart from "@/examples/Charts/DefaultLineChart.vue";
import { mapState } from "vuex";

const BUSCAR = gql`
query Pruebas($name:String!, $idioma:String!) {
    pruebas(name: $name, idioma:$idioma) {
        id
        fecha
        archivo
        etapa
        observaciones
        valoracion
        deportista {
            id
            nombre
            edad
            peso
            estatura
            sexo
            foto
            ci
            annoDeporte
            annoNacional
            fechaNacimiento
            codigo
            isActive
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
        }
        lugar {
            id
            nombre
            isActive
        }
    }
}
`;
const NUEVO = gql`
mutation NuevaPrueba(
    $deportista:ID!
    $fecha:Date!
    $lugar:ID!
    $etapa:String!,
    $idioma:String!
) {
    nuevaPrueba(
        deportista: $deportista
        fecha: $fecha
        lugar: $lugar
        etapa:$etapa
        idioma:$idioma
    ) {
        success
        errors
    }
}`;
const ACTUALIZAR = gql`
mutation UpdatePrueba(
    $deportista:ID!
    $fecha:Date!
    $lugar:ID!
    $observaciones:String!
    $valoracion:String!
    $id:ID!
    $etapa:String!
) {
    updatePrueba(
        deportista: $deportista
        fecha: $fecha
        lugar: $lugar
        observaciones: $observaciones
        valoracion: $valoracion
        id:$id
        etapa:$etapa
    ) {
        success
        errors
    }
}`;
const ATLETAS = gql`
query Deportistas {
    deportistas(name: "") {
        id
        nombre
        edad
        peso
        estatura
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
        deporte {
                id
                nombre
                siglas
            }
        provincia {
            id
            nombre
            siglas
        }
    }
}
`;
const LUGARES = gql`
query Lugares($idioma:String!) {
    lugares(name: "", idioma:$idioma) {
        id
        nombre
        isActive
    }
}`;
const NUEVO_RAST = gql`
mutation NuevaRast(
    $distancia:Decimal!
    $prueba:ID!
    $tiempoCinco:Decimal!
    $tiempoDos:Decimal!
    $tiempoQuatro:Decimal!
    $tiempoSeis:Decimal!
    $tiempoTres:Decimal!
    $tiempoUno:Decimal!
) {
    nuevaRast(
        distancia: $distancia
        prueba: $prueba
        tiempoCinco: $tiempoCinco
        tiempoDos: $tiempoDos
        tiempoQuatro: $tiempoQuatro
        tiempoSeis: $tiempoSeis
        tiempoTres: $tiempoTres
        tiempoUno: $tiempoUno
    ) {
        success
        errors
    }
}`;
const UPDATE_RAST = gql`
mutation UpdateRast (
    $distancia:Decimal!
    $prueba:ID!
    $tiempoCinco:Decimal!
    $tiempoDos:Decimal!
    $tiempoQuatro:Decimal!
    $tiempoSeis:Decimal!
    $tiempoTres:Decimal!
    $tiempoUno:Decimal!
    $id:ID!
) {
    updateRast(
        distancia: $distancia
        prueba: $prueba
        tiempoCinco: $tiempoCinco
        tiempoDos: $tiempoDos
        tiempoQuatro: $tiempoQuatro
        tiempoSeis: $tiempoSeis
        tiempoTres: $tiempoTres
        tiempoUno: $tiempoUno
        id:$id
    ) {
        success
        errors
    }
}`;
const NUEVO_CARLSON = gql`
mutation NuevaCarlson(
      $contactosUno:Int!
      $contactosDos:Int!
      $contactosTres:Int!
      $contactosQuatro:Int!
      $contactosCinco:Int!
      $contactosSeis:Int!
      $contactosSiete:Int!
      $contactosOcho:Int!
      $contactosNueve:Int!
      $contactosDiez:Int!

      $frecuenciaCardiacaAntes:Int!
      $presionSistolicaAntes:Decimal!
      $presionDiastolicaAntes:Decimal!

      $frecuenciaCardiacaDespues:Int!
      $presionSistolicaDespues:Decimal!
      $presionDiastolicaDespues:Decimal!

      $frecuenciaCardiacaMinUno:Int!
      $frecuenciaCardiacaMinTres:Int!
      $frecuenciaCardiacaMinCinco:Int!
      $frecuenciaCardiacaMinSiete:Int!



      $prueba:ID!
) {
    nuevaCarlson(
        contactosCinco: $contactosCinco
        contactosDiez: $contactosDiez
        contactosDos: $contactosDos
        contactosNueve: $contactosNueve
        contactosOcho: $contactosOcho
        contactosQuatro: $contactosQuatro
        contactosSeis: $contactosSeis
        contactosSiete: $contactosSiete
        contactosTres: $contactosTres
        contactosUno: $contactosUno
        frecuenciaCardiacaAntes: $frecuenciaCardiacaAntes
        frecuenciaCardiacaDespues: $frecuenciaCardiacaDespues
        frecuenciaCardiacaMinCinco: $frecuenciaCardiacaMinCinco
        frecuenciaCardiacaMinSiete: $frecuenciaCardiacaMinSiete
        frecuenciaCardiacaMinTres: $frecuenciaCardiacaMinTres
        frecuenciaCardiacaMinUno: $frecuenciaCardiacaMinUno
        presionDiastolicaAntes: $presionDiastolicaAntes
        presionDiastolicaDespues: $presionDiastolicaDespues
        presionSistolicaAntes: $presionSistolicaAntes
        presionSistolicaDespues: $presionSistolicaDespues
        prueba: $prueba
    ) {
        success
        error
    }
}
`;
const UPDATE_CARLSON = gql`
mutation UpdateCarlson (
      $contactosUno:Int!
      $contactosDos:Int!
      $contactosTres:Int!
      $contactosQuatro:Int!
      $contactosCinco:Int!
      $contactosSeis:Int!
      $contactosSiete:Int!
      $contactosOcho:Int!
      $contactosNueve:Int!
      $contactosDiez:Int!

      $frecuenciaCardiacaAntes:Int!
      $presionSistolicaAntes:Decimal!
      $presionDiastolicaAntes:Decimal!

      $frecuenciaCardiacaDespues:Int!
      $presionSistolicaDespues:Decimal!
      $presionDiastolicaDespues:Decimal!

      $frecuenciaCardiacaMinUno:Int!
      $frecuenciaCardiacaMinTres:Int!
      $frecuenciaCardiacaMinCinco:Int!
      $frecuenciaCardiacaMinSiete:Int!


      $id:ID!
      $prueba:ID!
) {
    updateCarlson(
        contactosCinco: $contactosCinco
        contactosDiez: $contactosDiez
        contactosDos: $contactosDos
        contactosNueve: $contactosNueve
        contactosOcho: $contactosOcho
        contactosQuatro: $contactosQuatro
        contactosSeis: $contactosSeis
        contactosSiete: $contactosSiete
        contactosTres: $contactosTres
        contactosUno: $contactosUno
        frecuenciaCardiacaAntes: $frecuenciaCardiacaAntes
        frecuenciaCardiacaDespues: $frecuenciaCardiacaDespues
        frecuenciaCardiacaMinCinco: $frecuenciaCardiacaMinCinco
        frecuenciaCardiacaMinSiete: $frecuenciaCardiacaMinSiete
        frecuenciaCardiacaMinTres: $frecuenciaCardiacaMinTres
        frecuenciaCardiacaMinUno: $frecuenciaCardiacaMinUno
        presionDiastolicaAntes: $presionDiastolicaAntes
        presionDiastolicaDespues: $presionDiastolicaDespues
        presionSistolicaAntes: $presionSistolicaAntes
        presionSistolicaDespues: $presionSistolicaDespues
        prueba: $prueba
        id:$id
    ) {
        success
        error
    }
}
`;
const CARLSON = gql`
query Carlson {
    carlson {
        id
        frecuenciaCardiacaAntes
        frecuenciaCardiacaDespues
        frecuenciaCardiacaMinUno
        frecuenciaCardiacaMinTres
        frecuenciaCardiacaMinCinco
        frecuenciaCardiacaMinSiete
        presionSistolicaAntes
        presionDiastolicaAntes
        presionSistolicaDespues
        presionDiastolicaDespues
        contactosUno
        contactosDos
        contactosTres
        contactosQuatro
        contactosCinco
        contactosSeis
        contactosSiete
        contactosOcho
        contactosNueve
        contactosDiez
        presionArterealDiferencialAntes
        presionArterealDiferencialDespues
        sumatoriaContactos
        reservaFrecuencia
        sumatoriaLatidosRecuperacion
        potenciaLatidos
        indiceCalidad
        evaluacion
        prueba {
            id
        }
    }
}`;
const RAST = gql`
query Rast {
    rast {
        id
        distancia
        tiempoUno
        tiempoDos
        tiempoTres
        tiempoQuatro
        tiempoCinco
        tiempoSeis
        sumatoriaTiempo
        potenciaUno
        potenciaDos
        potenciaTres
        potenciaQuatro
        potenciaCinco
        potenciaSeis
        potenciaMaxima
        potenciaMinima
        potenciaMedia
        potenciaRelativa
        indiceFatiga
        evaluacion
        normalidadPotenciaMaxima
        prueba {
            id
        }
    }
}
`;
const VERIFICAR_RAST = gql`
query VerificarPruebasRast($id:ID!) {
    verificarPruebasRast(id: $id)
}`;
const VERIFICAR_CARLSON = gql`
query VerificarPruebasCarlson($id:ID!) {
    verificarPruebasCarlson(id: $id)
}`;
const RAST_PRUEBA = gql`
query RastPrueba($id:ID!) {
    rastPrueba(id: $id) {
        id
        distancia
        tiempoUno
        tiempoDos
        tiempoTres
        tiempoQuatro
        tiempoCinco
        tiempoSeis
        sumatoriaTiempo
        potenciaUno
        potenciaDos
        potenciaTres
        potenciaQuatro
        potenciaCinco
        potenciaSeis
        potenciaMaxima
        potenciaMinima
        potenciaMedia
        potenciaRelativa
        indiceFatiga
        evaluacion
        normalidadPotenciaMaxima
    }
}`;
const CARLSON_PRUEBA = gql`
query CarlsonPrueba($id:ID!) {
    carlsonPrueba(id: $id) {
        id
        frecuenciaCardiacaAntes
        frecuenciaCardiacaDespues
        frecuenciaCardiacaMinUno
        frecuenciaCardiacaMinTres
        frecuenciaCardiacaMinCinco
        frecuenciaCardiacaMinSiete
        presionSistolicaAntes
        presionDiastolicaAntes
        presionSistolicaDespues
        presionDiastolicaDespues
        contactosUno
        contactosDos
        contactosTres
        contactosQuatro
        contactosCinco
        contactosSeis
        contactosSiete
        contactosOcho
        contactosNueve
        contactosDiez
        presionArterealDiferencialAntes
        presionArterealDiferencialDespues
        sumatoriaContactos
        reservaFrecuencia
        sumatoriaLatidosRecuperacion
        potenciaLatidos
        indiceCalidad
        evaluacion
    }
}`;
export default {
  name: "Pruebas",
  components: { DefaultLineChart },
  data() {
    return {
      pruebas: [],
      carlson: [],
      rast: [],
      name: "",
      lugares: [],
      deportistas: [],
      showModal: false,
      showIndicadores: false,
      verIndicadores: false,
      error: false,
      fecha: null,
      deportista: 0,
      lugar: 0,
      observaciones: "",
      valoraciones: "",
      id: 0,
      showUpdate: false,
      ventana: true,
      etapa: "",
      prueba: "",
      distancia: 0,
      tiempo1: 0,
      tiempo2: 0,
      tiempo3: 0,
      tiempo4: 0,
      tiempo5: 0,
      tiempo6: 0,
      curva: false,

      frecuenciaCardiacaAntes: 0,
      presionSistolicaAntes: 0,
      presionDiastolicaAntes: 0,
      contactosUno: 0,
      contactosDos: 0,
      contactosTres: 0,
      contactosQuatro: 0,
      contactosCinco: 0,
      contactosSeis: 0,
      contactosSiete: 0,
      contactosOcho: 0,
      contactosNueve: 0,
      contactosDiez: 0,
      frecuenciaCardiacaDespues: 0,
      presionSistolicaDespues: 0,
      presionDiastolicaDespues: 0,
      frecuenciaCardiacaMinUno: 0,
      frecuenciaCardiacaMinTres: 0,
      frecuenciaCardiacaMinCinco: 0,
      frecuenciaCardiacaMinSiete: 0,
      elementos_curva: [],
      lineaRecta: [],
      ecuacion_carslon: "",
      accion: "nuevo",
      rast_id: 0,
      carlson_id: 0,

      deportista_text: "Deportista",
      lugar_text: "Lugar",
      deporte_text: "Deporte",
      llenar_indicadores_text: "Llenar indicadores",
      ver_indicadores_text: "Ver indicadores",
      nueva_prueba_text: "Nueva prueba",
      etapa_competitivs_text: "Etapa competitiva",
      preparacion_general_text: "Preparación general",
      preparacion_especial_text: "Preparación especial",
      preparacion_precompetitiva_text: "Preparación precompetitiva",
      preparacion_competitiva_text: "Preparación competitiva",
      valoraciones_text: "Valoraciones",
      observaciones_text: "Observaciones",
      prueba_text: "Prueba",
      rast_text: "RAST (Running-Based Anaerobic Sprint Test)",
      carlson_text: "TEST DE CURVA DE FATIGA DE CARLSON",
      tiempo1_text: "Tiempo de Palier 1",
      tiempo2_text: "Tiempo de Palier 2",
      tiempo3_text: "Tiempo de Palier 3",
      tiempo4_text: "Tiempo de Palier 4",
      tiempo5_text: "Tiempo de Palier 5",
      tiempo6_text: "Tiempo de Palier 6",
      frecuencia_cardiaca_antes_text: "Frecuencia cardiaca Reposo",
      presion_arterial_antes_text: "Presión Arterial Sistólica Reposo",
      preseion_arterial_antes_text: "Presión Arterial Diastólica Reposo",
      contactos_palier_1: "Contactos Palier 1",
      contactos_palier_2: "Contactos Palier 2",
      contactos_palier_3: "Contactos Palier 3",
      contactos_palier_4: "Contactos Palier 4",
      contactos_palier_5: "Contactos Palier 5",
      contactos_palier_6: "Contactos Palier 6",
      contactos_palier_7: "Contactos Palier 7",
      contactos_palier_8: "Contactos Palier 8",
      contactos_palier_9: "Contactos Palier 9",
      contactos_palier_10: "Contactos Palier 10",
      frecuencia_cardiaca_despues_text: "Frecuencia cardiaca post-carga",
      presion_arterial_despues_text: "Presión Arterial Sistólica Carga",
      preseion_arterial_despues_text: "Presión Arterial Diastólica Carga",
      frecuencia_cardiaca_uno_text: "Frecuencia cardiaca Recuperación al primer minuto",
      frecuencia_cardiaca_tres_text: "Frecuencia cardiaca Recuperación al tercer minuto",
      frecuencia_cardiaca_cinco_text: "Frecuencia cardiaca Recuperación al quinto minuto",
      frecuencia_cardiaca_siete_text: "Frecuencia cardiaca Recuperación al séptimo minuto",
      potencia_palier1_text: "Potencia Palier 1",
      potencia_palier2_text: "Potencia Palier 2",
      potencia_palier3_text: "Potencia Palier 3",
      potencia_palier4_text: "Potencia Palier 4",
      potencia_palier5_text: "Potencia Palier 5",
      potencia_palier6_text: "Potencia Palier 6",
      potencia_maxima_text: "Potencia máxima",
      potencia_minima_text: "Potencia mínima",
      potencia_media_text: "Potencia media",
      sumatoria_tiempos_text: "Sumatoria de tiempos",
      potencia_relativa: "Potencia relativa",
      indice_fatiga_text: "Índice de Fatiga",
      evaluacion_text: "Evaluación",
      normalidad_potencia_text: "Normalidad de potencia máxima",

      presion_arterial_diferencial_antes_text: "Presión Arterial diferencial Reposo",
      sumatoria_contactos_text: "Sumatoria de contactos",
      reserva_frecuencia_text: "Reserva de frecuencia cardiaca",
      presion_arterial_diferencial_despues_text: "Presión Arterial diferencial carga",
      sumatoria_latidos_text: "Sumatoria de latidos en Recuperación",
      potencia_erogada_text: "Potencia erogada por latido",
      reaccion_text: "Reacción Cardiovascular",
      evaluacion_icrcv: "Evaluación del ICRCV",
      curva_carlson_text: "Curva de carlson",
      extandar_maximon_text: "Estandar maximon",
      actualizar_text: "Actualizar prueba",

      cancelar_text: "Cancelar",
      guardar_text: "Guardar",
      acciones_text: "Acciones",
      buscar_text: "Buscar",
      nuevo_text: "Nuevo",
      editar_text: "Editar",
      fecha_text: "Fecha",
      error_text: "No pueden haber campos vacíos",
      cerrar_text: "Cerrar",
      title_grafico_text: "La línea de regresión lineal es",
      distancia_text: "Distancia"
    };
  },
  apollo: {
    pruebas: {
      query: BUSCAR,
      variables() {
        return {
          name: this.name,
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    lugares: {
      query: LUGARES,
      variables() {
        return {
          idioma: this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    deportistas: {
      query: ATLETAS,
      fetchPolicy: "cache-and-network"
    },
    carlson: {
      query: CARLSON,
      fetchPolicy: "cache-and-network"
    },
    rast: {
      query: RAST,
      fetchPolicy: "cache-and-network"
    }
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
      this.fecha_text = "Fecha";
      this.actualizar_text = "Actualizar prueba";
      this.cerrar_text = "Cerrar";
      this.distancia_text = "Distancia";
      this.title_grafico_text = "La línea de regresión lineal es";

      this.deportista_text = "Deportista";
      this.lugar_text = "Lugar";
      this.deporte_text = "Deporte";
      this.llenar_indicadores_text = "Llenar indicadores";
      this.ver_indicadores_text = "Ver indicadores";
      this.nueva_prueba_text = "Nueva prueba";
      this.etapa_competitivs_text = "Etapa competitiva";
      this.preparacion_general_text = "Preparación general";
      this.preparacion_especial_text = "Preparación especial";
      this.preparacion_precompetitiva_text = "Preparación precompetitiva";
      this.preparacion_competitiva_text = "Preparación competitiva";
      this.valoraciones_text = "Valoraciones";
      this.observaciones_text = "Observaciones";
      this.prueba_text = "Prueba";
      this.rast_text = "RAST (Running-Based Anaerobic Sprint Test)";
      this.carlson_text = "TEST DE CURVA DE FATIGA DE CARLSON";
      this.tiempo1_text = "Tiempo de Palier 1";
      this.tiempo2_text = "Tiempo de Palier 2";
      this.tiempo3_text = "Tiempo de Palier 3";
      this.tiempo4_text = "Tiempo de Palier 4";
      this.tiempo5_text = "Tiempo de Palier 5";
      this.tiempo6_text = "Tiempo de Palier 6";
      this.frecuencia_cardiaca_antes_text = "Frecuencia cardiaca Reposo";
      this.presion_arterial_antes_text = "Presión Arterial Sistólica Reposo";
      this.preseion_arterial_antes_text = "Presión Arterial Diastólica Reposo";
      this.contactos_palier_1 = "Contactos Palier 1";
      this.contactos_palier_2 = "Contactos Palier 2";
      this.contactos_palier_3 = "Contactos Palier 3";
      this.contactos_palier_4 = "Contactos Palier 4";
      this.contactos_palier_5 = "Contactos Palier 5";
      this.contactos_palier_6 = "Contactos Palier 6";
      this.contactos_palier_7 = "Contactos Palier 7";
      this.contactos_palier_8 = "Contactos Palier 8";
      this.contactos_palier_9 = "Contactos Palier 9";
      this.contactos_palier_10 = "Contactos Palier 10";
      this.frecuencia_cardiaca_despues_text = "Frecuencia cardiaca post-carga";
      this.presion_arterial_despues_text = "Presión Arterial Sistólica Carga";
      this.preseion_arterial_despues_text = "Presión Arterial Diastólica Carga";
      this.frecuencia_cardiaca_uno_text = "Frecuencia cardiaca Recuperación al primer minuto";
      this.frecuencia_cardiaca_tres_text = "Frecuencia cardiaca Recuperación al tercer minuto";
      this.frecuencia_cardiaca_cinco_text = "Frecuencia cardiaca Recuperación al quinto minuto";
      this.frecuencia_cardiaca_siete_text = "Frecuencia cardiaca Recuperación al séptimo minuto";
      this.potencia_palier1_text = "Potencia Palier 1";
      this.potencia_palier2_text = "Potencia Palier 2";
      this.potencia_palier3_text = "Potencia Palier 3";
      this.potencia_palier4_text = "Potencia Palier 4";
      this.potencia_palier5_text = "Potencia Palier 5";
      this.potencia_palier6_text = "Potencia Palier 6";
      this.potencia_maxima_text = "Potencia máxima";
      this.potencia_minima_text = "Potencia mínima";
      this.potencia_media_text = "Potencia media";
      this.sumatoria_tiempos_text = "Sumatoria de tiempos";
      this.potencia_relativa = "Potencia relativa";
      this.indice_fatiga_text = "Índice de Fatiga";
      this.evaluacion_text = "Evaluación";
      this.normalidad_potencia_text = "Normalidad de potencia máxima";

      this.presion_arterial_diferencial_antes_text = "Presión Arterial diferencial Reposo";
      this.sumatoria_contactos_text = "Sumatoria de contactos";
      this.reserva_frecuencia_text = "Reserva de frecuencia cardiaca";
      this.presion_arterial_diferencial_despues_text = "Presión Arterial diferencial carga";
      this.sumatoria_latidos_text = "Sumatoria de latidos en Recuperación";
      this.potencia_erogada_text = "Potencia erogada por latido";
      this.reaccion_text = "Reacción Cardiovascular";
      this.evaluacion_icrcv = "Evaluación del ICRCV";
      this.curva_carlson_text = "Curva de carlson";
      this.extandar_maximon_text = "Estandar maximon";
    }
    if (this.idioma === "ru") {
      this.acciones_text = "Действия";
      this.buscar_text = "Искать";
      this.nuevo_text = "Новый";
      this.editar_text = "Редактировать";
      this.cancelar_text = "Отменить";
      this.guardar_text = "Принять";
      this.error_text = "Не может быть пустых полей";
      this.fecha_text = "Дата";
      this.actualizar_text = "Обновление теста";
      this.cerrar_text = "Закрывать";
      this.distancia_text = "Расстояние";
      this.title_grafico_text = "Линия линейной регрессии";

      this.deportista_text = "Спортсмен";
      this.lugar_text = "Место";
      this.deporte_text = "Спорт";
      this.llenar_indicadores_text = "Заполнять индикаторы";
      this.ver_indicadores_text = "Посмотреть индикаторы";
      this.nueva_prueba_text = "Новый тест";
      this.etapa_competitivs_text = "Соревновательный этап";
      this.preparacion_general_text = "Общая подготовка";
      this.preparacion_especial_text = "Cпециальная подготовка";
      this.preparacion_precompetitiva_text = "Предсоревновательная подготовка";
      this.preparacion_competitiva_text = "Соревновательная подготовка";
      this.valoraciones_text = "Оценки";
      this.observaciones_text = "Наблюдения";
      this.prueba_text = "Tести";
      this.rast_text = "RAST (анаэробный спринтерский тест на основе бега)";
      this.carlson_text = "ТЕСТ КРИВОЙ УСТАЛОСТИ КАРЛСОНА";
      this.tiempo1_text = "Время Пальерa 1";
      this.tiempo2_text = "Время Пальерa 2";
      this.tiempo3_text = "Время Пальерa 3";
      this.tiempo4_text = "Время Пальерa 4";
      this.tiempo5_text = "Время Пальерa 5";
      this.tiempo6_text = "Время Пальерa 6";
      this.frecuencia_cardiaca_antes_text = "Пульс в состоянии покоя";
      this.presion_arterial_antes_text = "Систолическое артериальное давление в состоянии покоя";
      this.preseion_arterial_antes_text = "Диастолическое артериальное давление в состоянии покоя";
      this.contactos_palier_1 = "Контакты Пальерa  1";
      this.contactos_palier_2 = "Контакты Пальерa  2";
      this.contactos_palier_3 = "Контакты Пальерa  3";
      this.contactos_palier_4 = "Контакты Пальерa  4";
      this.contactos_palier_5 = "Контакты Пальерa  5";
      this.contactos_palier_6 = "Контакты Пальерa  6";
      this.contactos_palier_7 = "Контакты Пальерa  7";
      this.contactos_palier_8 = "Контакты Пальерa  8";
      this.contactos_palier_9 = "Контакты Пальерa  9";
      this.contactos_palier_10 = "Контакты Пальерa  10";
      this.frecuencia_cardiaca_despues_text = "Частота пульса после нагрузки";
      this.presion_arterial_despues_text = "Систолическое артериальное давление с нагрузкой";
      this.preseion_arterial_despues_text = "Диастолическое артериальное давление с нагрузкой";
      this.frecuencia_cardiaca_uno_text = "Пульс Bосстановление в первую минуту";
      this.frecuencia_cardiaca_tres_text = "Пульс Bосстановление на третьей минуте";
      this.frecuencia_cardiaca_cinco_text = "Пульс Bосстановление на пятой минутe";
      this.frecuencia_cardiaca_siete_text = "Пульс Bосстановление на седьмой минутe";
      this.potencia_palier1_text = "Mощность Пальерa 1";
      this.potencia_palier2_text = "Mощность Пальерa 2";
      this.potencia_palier3_text = "Mощность Пальерa 3";
      this.potencia_palier4_text = "Mощность Пальерa 4";
      this.potencia_palier5_text = "Mощность Пальерa 5";
      this.potencia_palier6_text = "Mощность Пальерa 6";
      this.potencia_maxima_text = "Максимальная мощность";
      this.potencia_minima_text = "Минимальная мощность";
      this.potencia_media_text = "Средняя мощность";
      this.sumatoria_tiempos_text = "Сумма времен";
      this.potencia_relativa = "Относительная мощность";
      this.indice_fatiga_text = "Индекс усталости";
      this.evaluacion_text = "Оценка";
      this.normalidad_potencia_text = "Нормальность максимальной мощности";

      this.presion_arterial_diferencial_antes_text = "Дифференциальное артериальное давление в покое";
      this.sumatoria_contactos_text = "Сумма контактов";
      this.reserva_frecuencia_text = "Резерв сердечного ритма";
      this.presion_arterial_diferencial_despues_text = "Дифференциальная нагрузка артериального давления";
      this.sumatoria_latidos_text = "Сумма пульсов в Восстановление";
      this.potencia_erogada_text = "Мощность, передаваемая за удар";
      this.reaccion_text = "Сердечно-сосудистая реакция";
      this.evaluacion_icrcv = "Оценка ICRCV";
      this.curva_carlson_text = "Кривая Карлсона";
      this.extandar_maximon_text = "Максимон стандарт";
    }
    if (this.idioma === "in") {
      this.acciones_text = "Actions";
      this.buscar_text = "Search";
      this.nuevo_text = "New";
      this.editar_text = "Edit";
      this.cancelar_text = "Cancel";
      this.guardar_text = "Save";
      this.error_text = "There cannot be empty fields";
      this.fecha_text = "Date";
      this.actualizar_text = "Update test";
      this.cerrar_text = "Close";
      this.distancia_text = "Distance";
      this.title_grafico_text = "The linear regression line is";

      this.deportista_text = "Sportsman";
      this.lugar_text = "Place";
      this.deporte_text = "Sport";
      this.llenar_indicadores_text = "Fill indicators";
      this.ver_indicadores_text = "See indicators";
      this.nueva_prueba_text = "New test";
      this.etapa_competitivs_text = "Competitive stage";
      this.preparacion_general_text = "General preparation";
      this.preparacion_especial_text = "Special preparation";
      this.preparacion_precompetitiva_text = "Pre-competitive preparation";
      this.preparacion_competitiva_text = "Competitive preparation";
      this.valoraciones_text = "Ratings";
      this.observaciones_text = "Observations";
      this.prueba_text = "Test";
      this.rast_text = "RAST (Running-Based Anaerobic Sprint Test)";
      this.carlson_text = "CARLSON FATIGUE CURVE TEST";
      this.tiempo1_text = "Bearing time 1";
      this.tiempo2_text = "Bearing time 2";
      this.tiempo3_text = "Bearing time 3";
      this.tiempo4_text = "Bearing time 4";
      this.tiempo5_text = "Bearing time 5";
      this.tiempo6_text = "Bearing time 6";
      this.frecuencia_cardiaca_antes_text = "Heart rate Rest";
      this.presion_arterial_antes_text = "Resting Systolic Blood Pressure";
      this.preseion_arterial_antes_text = "Resting Diastolic Blood Pressure";
      this.contactos_palier_1 = "Bearing Contacts 1";
      this.contactos_palier_2 = "Bearing Contacts 2";
      this.contactos_palier_3 = "Bearing Contacts 3";
      this.contactos_palier_4 = "Bearing Contacts 4";
      this.contactos_palier_5 = "Bearing Contacts 5";
      this.contactos_palier_6 = "Bearing Contacts 6";
      this.contactos_palier_7 = "Bearing Contacts 7";
      this.contactos_palier_8 = "Bearing Contacts 8";
      this.contactos_palier_9 = "Bearing Contacts 9";
      this.contactos_palier_10 = "Bearing Contacts 10";
      this.frecuencia_cardiaca_despues_text = "Post-load heart rate";
      this.presion_arterial_despues_text = "Systolic Blood Pressure Load";
      this.preseion_arterial_despues_text = "Diastolic Blood Pressure Load";
      this.frecuencia_cardiaca_uno_text = "Heart rate Recovery within 1 minute";
      this.frecuencia_cardiaca_tres_text = "Heart rate Recovery at the 3 minute";
      this.frecuencia_cardiaca_cinco_text = "Heart rate Recovery at 5 minutes";
      this.frecuencia_cardiaca_siete_text = "Heart rate Recovery at the 7 minute";
      this.potencia_palier1_text = "Power Shaft 1";
      this.potencia_palier2_text = "Power Shaft 2";
      this.potencia_palier3_text = "Power Shaft 3";
      this.potencia_palier4_text = "Power Shaft 4";
      this.potencia_palier5_text = "Power Shaft 5";
      this.potencia_palier6_text = "Power Shaft 6";
      this.potencia_maxima_text = "Maximum power";
      this.potencia_minima_text = "Minimum power";
      this.potencia_media_text = "Medium power";
      this.sumatoria_tiempos_text = "Sum of times";
      this.potencia_relativa = "Relative power";
      this.indice_fatiga_text = "Fatigue Index";
      this.evaluacion_text = "Assessment";
      this.normalidad_potencia_text = "Maximum power normality";

      this.presion_arterial_diferencial_antes_text = "Differential Blood Pressure Rest";
      this.sumatoria_contactos_text = "Sum of contacts";
      this.reserva_frecuencia_text = "Heart rate reserve";
      this.presion_arterial_diferencial_despues_text = "Differential Blood Pressure Load";
      this.sumatoria_latidos_text = "Sum of heartbeats in Recovery";
      this.potencia_erogada_text = "Power delivered per beat";
      this.reaccion_text = "Cardiovascular Reaction";
      this.evaluacion_icrcv = "ICRCV evaluation";
      this.curva_carlson_text = "Carlson curve";
      this.extandar_maximon_text = "Maximon standard";
    }
    if (this.idioma === "fr") {
      this.acciones_text = "Actions";
      this.buscar_text = "Chercher";
      this.nuevo_text = "Nouveau";
      this.editar_text = "Modifier";
      this.cancelar_text = "Annuler";
      this.guardar_text = "Accepter";
      this.error_text = "Il ne peut pas y avoir de champs vides";
      this.fecha_text = "Date";
      this.actualizar_text = "Test de mise à jour";
      this.cerrar_text = "Fermer";
      this.distancia_text = "Distance";
      this.title_grafico_text = "La droite de régression linéaire est";

      this.deportista_text = "Sportif";
      this.lugar_text = "Lieu";
      this.deporte_text = "Sport";
      this.llenar_indicadores_text = "Indicateurs de remplissage";
      this.ver_indicadores_text = "Voir les indicateurs";
      this.nueva_prueba_text = "Nouvel essai";
      this.etapa_competitivs_text = "Étape compétitive";
      this.preparacion_general_text = "Préparation générale";
      this.preparacion_especial_text = "Préparation spéciale";
      this.preparacion_precompetitiva_text = "Préparation pré-compétitive";
      this.preparacion_competitiva_text = "Préparation compétitive";
      this.valoraciones_text = "Notes";
      this.observaciones_text = "Observations";
      this.prueba_text = "Test";
      this.rast_text = "RAST (Test de sprint anaérobie basé sur la course)";
      this.carlson_text = "TEST DE COURBE DE FATIGUE CARLSON";
      this.tiempo1_text = "Temps de roulement 1";
      this.tiempo2_text = "Temps de roulement 2";
      this.tiempo3_text = "Temps de roulement 3";
      this.tiempo4_text = "Temps de roulement 4";
      this.tiempo5_text = "Temps de roulement 5";
      this.tiempo6_text = "Temps de roulement 6";
      this.frecuencia_cardiaca_antes_text = "Fréquence cardiaque Repos";
      this.presion_arterial_antes_text = "Pression artérielle systolique au repos";
      this.preseion_arterial_antes_text = "Pression artérielle diastolique au repos";
      this.contactos_palier_1 = "Contacts de roulement 1";
      this.contactos_palier_2 = "Contacts de roulement 2";
      this.contactos_palier_3 = "Contacts de roulement 3";
      this.contactos_palier_4 = "Contacts de roulement 4";
      this.contactos_palier_5 = "Contacts de roulement 5";
      this.contactos_palier_6 = "Contacts de roulement 6";
      this.contactos_palier_7 = "Contacts de roulement 7";
      this.contactos_palier_8 = "Contacts de roulement 8";
      this.contactos_palier_9 = "Contacts de roulement 9";
      this.contactos_palier_10 = "Contacts de roulement 10";
      this.frecuencia_cardiaca_despues_text = "Fréquence cardiaque après chargement";
      this.presion_arterial_despues_text = "Charge de pression artérielle systolique";
      this.preseion_arterial_despues_text = "Charge de pression artérielle diastolique";
      this.frecuencia_cardiaca_uno_text = "Récupération de la fréquence cardiaque en 1 minute";
      this.frecuencia_cardiaca_tres_text = "Récupération de la fréquence cardiaque à la 3 minute";
      this.frecuencia_cardiaca_cinco_text = "Récupération de la fréquence cardiaque à 5 minutes";
      this.frecuencia_cardiaca_siete_text = "Récupération de la fréquence cardiaque à la 7 minute";
      this.potencia_palier1_text = "Arbre de puissance 1";
      this.potencia_palier2_text = "Arbre de puissance 2";
      this.potencia_palier3_text = "Arbre de puissance 3";
      this.potencia_palier4_text = "Arbre de puissance 4";
      this.potencia_palier5_text = "Arbre de puissance 5";
      this.potencia_palier6_text = "Arbre de puissance 6";
      this.potencia_maxima_text = "Puissance maximum";
      this.potencia_minima_text = "Puissance minimale";
      this.potencia_media_text = "Puissance moyenne";
      this.sumatoria_tiempos_text = "Somme des temps";
      this.potencia_relativa = "Puissance relative";
      this.indice_fatiga_text = "Indice de fatigue";
      this.evaluacion_text = "Évaluation";
      this.normalidad_potencia_text = "Normalité de puissance maximale";

      this.presion_arterial_diferencial_antes_text = "Repos de tension artérielle différentielle";
      this.sumatoria_contactos_text = "Somme des contacts";
      this.reserva_frecuencia_text = "Réserve de fréquence cardiaque";
      this.presion_arterial_diferencial_despues_text = "Charge de pression artérielle différentielle";
      this.sumatoria_latidos_text = "Somme des battements de coeur en récupération";
      this.potencia_erogada_text = "Puissance délivrée par battement";
      this.reaccion_text = "Réaction cardiovasculaire";
      this.evaluacion_icrcv = "Évaluation ICRCV";
      this.curva_carlson_text = "Courbe de Carlson";
      this.extandar_maximon_text = "Norme Maximon";
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
        this.fecha_text = "Fecha";
        this.actualizar_text = "Actualizar prueba";
        this.cerrar_text = "Cerrar";
        this.distancia_text = "Distancia";
        this.title_grafico_text = "La línea de regresión lineal es";

        this.deportista_text = "Deportista";
        this.lugar_text = "Lugar";
        this.deporte_text = "Deporte";
        this.llenar_indicadores_text = "Llenar indicadores";
        this.ver_indicadores_text = "Ver indicadores";
        this.nueva_prueba_text = "Nueva prueba";
        this.etapa_competitivs_text = "Etapa competitiva";
        this.preparacion_general_text = "Preparación general";
        this.preparacion_especial_text = "Preparación especial";
        this.preparacion_precompetitiva_text = "Preparación precompetitiva";
        this.preparacion_competitiva_text = "Preparación competitiva";
        this.valoraciones_text = "Valoraciones";
        this.observaciones_text = "Observaciones";
        this.prueba_text = "Prueba";
        this.rast_text = "RAST (Running-Based Anaerobic Sprint Test)";
        this.carlson_text = "TEST DE CURVA DE FATIGA DE CARLSON";
        this.tiempo1_text = "Tiempo de Palier 1";
        this.tiempo2_text = "Tiempo de Palier 2";
        this.tiempo3_text = "Tiempo de Palier 3";
        this.tiempo4_text = "Tiempo de Palier 4";
        this.tiempo5_text = "Tiempo de Palier 5";
        this.tiempo6_text = "Tiempo de Palier 6";
        this.frecuencia_cardiaca_antes_text = "Frecuencia cardiaca Reposo";
        this.presion_arterial_antes_text = "Presión Arterial Sistólica Reposo";
        this.preseion_arterial_antes_text = "Presión Arterial Diastólica Reposo";
        this.contactos_palier_1 = "Contactos Palier 1";
        this.contactos_palier_2 = "Contactos Palier 2";
        this.contactos_palier_3 = "Contactos Palier 3";
        this.contactos_palier_4 = "Contactos Palier 4";
        this.contactos_palier_5 = "Contactos Palier 5";
        this.contactos_palier_6 = "Contactos Palier 6";
        this.contactos_palier_7 = "Contactos Palier 7";
        this.contactos_palier_8 = "Contactos Palier 8";
        this.contactos_palier_9 = "Contactos Palier 9";
        this.contactos_palier_10 = "Contactos Palier 10";
        this.frecuencia_cardiaca_despues_text = "Frecuencia cardiaca post-carga";
        this.presion_arterial_despues_text = "Presión Arterial Sistólica Carga";
        this.preseion_arterial_despues_text = "Presión Arterial Diastólica Carga";
        this.frecuencia_cardiaca_uno_text = "Frecuencia cardiaca Recuperación al primer minuto";
        this.frecuencia_cardiaca_tres_text = "Frecuencia cardiaca Recuperación al tercer minuto";
        this.frecuencia_cardiaca_cinco_text = "Frecuencia cardiaca Recuperación al quinto minuto";
        this.frecuencia_cardiaca_siete_text = "Frecuencia cardiaca Recuperación al séptimo minuto";
        this.potencia_palier1_text = "Potencia Palier 1";
        this.potencia_palier2_text = "Potencia Palier 2";
        this.potencia_palier3_text = "Potencia Palier 3";
        this.potencia_palier4_text = "Potencia Palier 4";
        this.potencia_palier5_text = "Potencia Palier 5";
        this.potencia_palier6_text = "Potencia Palier 6";
        this.potencia_maxima_text = "Potencia máxima";
        this.potencia_minima_text = "Potencia mínima";
        this.potencia_media_text = "Potencia media";
        this.sumatoria_tiempos_text = "Sumatoria de tiempos";
        this.potencia_relativa = "Potencia relativa";
        this.indice_fatiga_text = "Índice de Fatiga";
        this.evaluacion_text = "Evaluación";
        this.normalidad_potencia_text = "Normalidad de potencia máxima";

        this.presion_arterial_diferencial_antes_text = "Presión Arterial diferencial Reposo";
        this.sumatoria_contactos_text = "Sumatoria de contactos";
        this.reserva_frecuencia_text = "Reserva de frecuencia cardiaca";
        this.presion_arterial_diferencial_despues_text = "Presión Arterial diferencial carga";
        this.sumatoria_latidos_text = "Sumatoria de latidos en Recuperación";
        this.potencia_erogada_text = "Potencia erogada por latido";
        this.reaccion_text = "Reacción Cardiovascular";
        this.evaluacion_icrcv = "Evaluación del ICRCV";
        this.curva_carlson_text = "Curva de carlson";
        this.extandar_maximon_text = "Estandar maximon";
      }
      if (this.idioma === "ru") {
        this.acciones_text = "Действия";
        this.buscar_text = "Искать";
        this.nuevo_text = "Новый";
        this.editar_text = "Редактировать";
        this.cancelar_text = "Отменить";
        this.guardar_text = "Принять";
        this.error_text = "Не может быть пустых полей";
        this.fecha_text = "Дата";
        this.actualizar_text = "Обновление теста";
        this.cerrar_text = "Закрывать";
        this.distancia_text = "Расстояние";
        this.title_grafico_text = "Линия линейной регрессии";

        this.deportista_text = "Спортсмен";
        this.lugar_text = "Место";
        this.deporte_text = "Спорт";
        this.llenar_indicadores_text = "Заполнять индикаторы";
        this.ver_indicadores_text = "Посмотреть индикаторы";
        this.nueva_prueba_text = "Новый тест";
        this.etapa_competitivs_text = "Соревновательный этап";
        this.preparacion_general_text = "Общая подготовка";
        this.preparacion_especial_text = "Cпециальная подготовка";
        this.preparacion_precompetitiva_text = "Предсоревновательная подготовка";
        this.preparacion_competitiva_text = "Соревновательная подготовка";
        this.valoraciones_text = "Оценки";
        this.observaciones_text = "Наблюдения";
        this.prueba_text = "Tести";
        this.rast_text = "RAST (анаэробный спринтерский тест на основе бега)";
        this.carlson_text = "ТЕСТ КРИВОЙ УСТАЛОСТИ КАРЛСОНА";
        this.tiempo1_text = "Время Пальерa 1";
        this.tiempo2_text = "Время Пальерa 2";
        this.tiempo3_text = "Время Пальерa 3";
        this.tiempo4_text = "Время Пальерa 4";
        this.tiempo5_text = "Время Пальерa 5";
        this.tiempo6_text = "Время Пальерa 6";
        this.frecuencia_cardiaca_antes_text = "Пульс в состоянии покоя";
        this.presion_arterial_antes_text = "Систолическое артериальное давление в состоянии покоя";
        this.preseion_arterial_antes_text = "Диастолическое артериальное давление в состоянии покоя";
        this.contactos_palier_1 = "Контакты Пальерa  1";
        this.contactos_palier_2 = "Контакты Пальерa  2";
        this.contactos_palier_3 = "Контакты Пальерa  3";
        this.contactos_palier_4 = "Контакты Пальерa  4";
        this.contactos_palier_5 = "Контакты Пальерa  5";
        this.contactos_palier_6 = "Контакты Пальерa  6";
        this.contactos_palier_7 = "Контакты Пальерa  7";
        this.contactos_palier_8 = "Контакты Пальерa  8";
        this.contactos_palier_9 = "Контакты Пальерa  9";
        this.contactos_palier_10 = "Контакты Пальерa  10";
        this.frecuencia_cardiaca_despues_text = "Частота пульса после нагрузки";
        this.presion_arterial_despues_text = "Систолическое артериальное давление с нагрузкой";
        this.preseion_arterial_despues_text = "Диастолическое артериальное давление с нагрузкой";
        this.frecuencia_cardiaca_uno_text = "Пульс Bосстановление в первую минуту";
        this.frecuencia_cardiaca_tres_text = "Пульс Bосстановление на третьей минуте";
        this.frecuencia_cardiaca_cinco_text = "Пульс Bосстановление на пятой минутe";
        this.frecuencia_cardiaca_siete_text = "Пульс Bосстановление на седьмой минутe";
        this.potencia_palier1_text = "Mощность Пальерa 1";
        this.potencia_palier2_text = "Mощность Пальерa 2";
        this.potencia_palier3_text = "Mощность Пальерa 3";
        this.potencia_palier4_text = "Mощность Пальерa 4";
        this.potencia_palier5_text = "Mощность Пальерa 5";
        this.potencia_palier6_text = "Mощность Пальерa 6";
        this.potencia_maxima_text = "Максимальная мощность";
        this.potencia_minima_text = "Минимальная мощность";
        this.potencia_media_text = "Средняя мощность";
        this.sumatoria_tiempos_text = "Сумма времен";
        this.potencia_relativa = "Относительная мощность";
        this.indice_fatiga_text = "Индекс усталости";
        this.evaluacion_text = "Оценка";
        this.normalidad_potencia_text = "Нормальность максимальной мощности";

        this.presion_arterial_diferencial_antes_text = "Дифференциальное артериальное давление в покое";
        this.sumatoria_contactos_text = "Сумма контактов";
        this.reserva_frecuencia_text = "Резерв сердечного ритма";
        this.presion_arterial_diferencial_despues_text = "Дифференциальная нагрузка артериального давления";
        this.sumatoria_latidos_text = "Сумма пульсов в Восстановление";
        this.potencia_erogada_text = "Мощность, передаваемая за удар";
        this.reaccion_text = "Сердечно-сосудистая реакция";
        this.evaluacion_icrcv = "Оценка ICRCV";
        this.curva_carlson_text = "Кривая Карлсона";
        this.extandar_maximon_text = "Максимон стандарт";
      }
      if (this.idioma === "in") {
        this.acciones_text = "Actions";
        this.buscar_text = "Search";
        this.nuevo_text = "New";
        this.editar_text = "Edit";
        this.cancelar_text = "Cancel";
        this.guardar_text = "Save";
        this.error_text = "There cannot be empty fields";
        this.fecha_text = "Date";
        this.actualizar_text = "Update test";
        this.cerrar_text = "Close";
        this.distancia_text = "Distance";
        this.title_grafico_text = "The linear regression line is";

        this.deportista_text = "Sportsman";
        this.lugar_text = "Place";
        this.deporte_text = "Sport";
        this.llenar_indicadores_text = "Fill indicators";
        this.ver_indicadores_text = "See indicators";
        this.nueva_prueba_text = "New test";
        this.etapa_competitivs_text = "Competitive stage";
        this.preparacion_general_text = "General preparation";
        this.preparacion_especial_text = "Special preparation";
        this.preparacion_precompetitiva_text = "Pre-competitive preparation";
        this.preparacion_competitiva_text = "Competitive preparation";
        this.valoraciones_text = "Ratings";
        this.observaciones_text = "Observations";
        this.prueba_text = "Test";
        this.rast_text = "RAST (Running-Based Anaerobic Sprint Test)";
        this.carlson_text = "CARLSON FATIGUE CURVE TEST";
        this.tiempo1_text = "Bearing time 1";
        this.tiempo2_text = "Bearing time 2";
        this.tiempo3_text = "Bearing time 3";
        this.tiempo4_text = "Bearing time 4";
        this.tiempo5_text = "Bearing time 5";
        this.tiempo6_text = "Bearing time 6";
        this.frecuencia_cardiaca_antes_text = "Heart rate Rest";
        this.presion_arterial_antes_text = "Resting Systolic Blood Pressure";
        this.preseion_arterial_antes_text = "Resting Diastolic Blood Pressure";
        this.contactos_palier_1 = "Bearing Contacts 1";
        this.contactos_palier_2 = "Bearing Contacts 2";
        this.contactos_palier_3 = "Bearing Contacts 3";
        this.contactos_palier_4 = "Bearing Contacts 4";
        this.contactos_palier_5 = "Bearing Contacts 5";
        this.contactos_palier_6 = "Bearing Contacts 6";
        this.contactos_palier_7 = "Bearing Contacts 7";
        this.contactos_palier_8 = "Bearing Contacts 8";
        this.contactos_palier_9 = "Bearing Contacts 9";
        this.contactos_palier_10 = "Bearing Contacts 10";
        this.frecuencia_cardiaca_despues_text = "Post-load heart rate";
        this.presion_arterial_despues_text = "Systolic Blood Pressure Load";
        this.preseion_arterial_despues_text = "Diastolic Blood Pressure Load";
        this.frecuencia_cardiaca_uno_text = "Heart rate Recovery within 1 minute";
        this.frecuencia_cardiaca_tres_text = "Heart rate Recovery at the 3 minute";
        this.frecuencia_cardiaca_cinco_text = "Heart rate Recovery at 5 minutes";
        this.frecuencia_cardiaca_siete_text = "Heart rate Recovery at the 7 minute";
        this.potencia_palier1_text = "Power Shaft 1";
        this.potencia_palier2_text = "Power Shaft 2";
        this.potencia_palier3_text = "Power Shaft 3";
        this.potencia_palier4_text = "Power Shaft 4";
        this.potencia_palier5_text = "Power Shaft 5";
        this.potencia_palier6_text = "Power Shaft 6";
        this.potencia_maxima_text = "Maximum power";
        this.potencia_minima_text = "Minimum power";
        this.potencia_media_text = "Medium power";
        this.sumatoria_tiempos_text = "Sum of times";
        this.potencia_relativa = "Relative power";
        this.indice_fatiga_text = "Fatigue Index";
        this.evaluacion_text = "Assessment";
        this.normalidad_potencia_text = "Maximum power normality";

        this.presion_arterial_diferencial_antes_text = "Differential Blood Pressure Rest";
        this.sumatoria_contactos_text = "Sum of contacts";
        this.reserva_frecuencia_text = "Heart rate reserve";
        this.presion_arterial_diferencial_despues_text = "Differential Blood Pressure Load";
        this.sumatoria_latidos_text = "Sum of heartbeats in Recovery";
        this.potencia_erogada_text = "Power delivered per beat";
        this.reaccion_text = "Cardiovascular Reaction";
        this.evaluacion_icrcv = "ICRCV evaluation";
        this.curva_carlson_text = "Carlson curve";
        this.extandar_maximon_text = "Maximon standard";
      }
      if (this.idioma === "fr") {
        this.acciones_text = "Actions";
        this.buscar_text = "Chercher";
        this.nuevo_text = "Nouveau";
        this.editar_text = "Modifier";
        this.cancelar_text = "Annuler";
        this.guardar_text = "Accepter";
        this.error_text = "Il ne peut pas y avoir de champs vides";
        this.fecha_text = "Date";
        this.actualizar_text = "Test de mise à jour";
        this.cerrar_text = "Fermer";
        this.distancia_text = "Distance";
        this.title_grafico_text = "La droite de régression linéaire est";

        this.deportista_text = "Sportif";
        this.lugar_text = "Lieu";
        this.deporte_text = "Sport";
        this.llenar_indicadores_text = "Indicateurs de remplissage";
        this.ver_indicadores_text = "Voir les indicateurs";
        this.nueva_prueba_text = "Nouvel essai";
        this.etapa_competitivs_text = "Étape compétitive";
        this.preparacion_general_text = "Préparation générale";
        this.preparacion_especial_text = "Préparation spéciale";
        this.preparacion_precompetitiva_text = "Préparation pré-compétitive";
        this.preparacion_competitiva_text = "Préparation compétitive";
        this.valoraciones_text = "Notes";
        this.observaciones_text = "Observations";
        this.prueba_text = "Test";
        this.rast_text = "RAST (Test de sprint anaérobie basé sur la course)";
        this.carlson_text = "TEST DE COURBE DE FATIGUE CARLSON";
        this.tiempo1_text = "Temps de roulement 1";
        this.tiempo2_text = "Temps de roulement 2";
        this.tiempo3_text = "Temps de roulement 3";
        this.tiempo4_text = "Temps de roulement 4";
        this.tiempo5_text = "Temps de roulement 5";
        this.tiempo6_text = "Temps de roulement 6";
        this.frecuencia_cardiaca_antes_text = "Fréquence cardiaque Repos";
        this.presion_arterial_antes_text = "Pression artérielle systolique au repos";
        this.preseion_arterial_antes_text = "Pression artérielle diastolique au repos";
        this.contactos_palier_1 = "Contacts de roulement 1";
        this.contactos_palier_2 = "Contacts de roulement 2";
        this.contactos_palier_3 = "Contacts de roulement 3";
        this.contactos_palier_4 = "Contacts de roulement 4";
        this.contactos_palier_5 = "Contacts de roulement 5";
        this.contactos_palier_6 = "Contacts de roulement 6";
        this.contactos_palier_7 = "Contacts de roulement 7";
        this.contactos_palier_8 = "Contacts de roulement 8";
        this.contactos_palier_9 = "Contacts de roulement 9";
        this.contactos_palier_10 = "Contacts de roulement 10";
        this.frecuencia_cardiaca_despues_text = "Fréquence cardiaque après chargement";
        this.presion_arterial_despues_text = "Charge de pression artérielle systolique";
        this.preseion_arterial_despues_text = "Charge de pression artérielle diastolique";
        this.frecuencia_cardiaca_uno_text = "Récupération de la fréquence cardiaque en 1 minute";
        this.frecuencia_cardiaca_tres_text = "Récupération de la fréquence cardiaque à la 3 minute";
        this.frecuencia_cardiaca_cinco_text = "Récupération de la fréquence cardiaque à 5 minutes";
        this.frecuencia_cardiaca_siete_text = "Récupération de la fréquence cardiaque à la 7 minute";
        this.potencia_palier1_text = "Arbre de puissance 1";
        this.potencia_palier2_text = "Arbre de puissance 2";
        this.potencia_palier3_text = "Arbre de puissance 3";
        this.potencia_palier4_text = "Arbre de puissance 4";
        this.potencia_palier5_text = "Arbre de puissance 5";
        this.potencia_palier6_text = "Arbre de puissance 6";
        this.potencia_maxima_text = "Puissance maximum";
        this.potencia_minima_text = "Puissance minimale";
        this.potencia_media_text = "Puissance moyenne";
        this.sumatoria_tiempos_text = "Somme des temps";
        this.potencia_relativa = "Puissance relative";
        this.indice_fatiga_text = "Indice de fatigue";
        this.evaluacion_text = "Évaluation";
        this.normalidad_potencia_text = "Normalité de puissance maximale";

        this.presion_arterial_diferencial_antes_text = "Repos de tension artérielle différentielle";
        this.sumatoria_contactos_text = "Somme des contacts";
        this.reserva_frecuencia_text = "Réserve de fréquence cardiaque";
        this.presion_arterial_diferencial_despues_text = "Charge de pression artérielle différentielle";
        this.sumatoria_latidos_text = "Somme des battements de coeur en récupération";
        this.potencia_erogada_text = "Puissance délivrée par battement";
        this.reaccion_text = "Réaction cardiovasculaire";
        this.evaluacion_icrcv = "Évaluation ICRCV";
        this.curva_carlson_text = "Courbe de Carlson";
        this.extandar_maximon_text = "Norme Maximon";
      }
    }
  },
  methods: {
    async Guardar() {
      if (this.deportista === 0 || this.lugar === 0 || this.fecha == null || this.etapa === "") {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: NUEVO,
        variables: {
          fecha: this.convertirADate(this.fecha),
          deportista: this.deportista,
          lugar: this.lugar,
          etapa: this.etapa,
          idioma: this.idioma
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, idioma: this.idioma } }]
      }).then(response => {
        if (response.data.nuevaPrueba.success) {
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
            title: response.data.nuevaPrueba.error
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
      if (this.deportista === 0 || this.lugar === 0 || this.fecha == null || this.etapa === "") {
        this.error = true;
        return false;
      }
      await this.$apollo.mutate({
        mutation: ACTUALIZAR,
        variables: {
          fecha: this.convertirADate(this.fecha),
          deportista: this.deportista,
          lugar: this.lugar,
          observaciones: this.observaciones,
          valoracion: this.valoraciones,
          id: this.id,
          etapa: this.etapa
        },
        refetchQueries: [{ query: BUSCAR, variables: { name: this.name, idioma: this.idioma } }]
      }).then(response => {
        if (response.data.updatePrueba.success) {
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
            title: response.data.updatePrueba.error
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
      this.deportista = item.deportista.id;
      this.lugar = item.lugar.id;
      this.etapa = item.etapa;
      this.fecha = item.fecha;
      this.observaciones = item.observaciones;
      this.valoraciones = item.valoracion;
      this.showUpdate = true;
      this.error = false;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.id = 0;
      this.indicador = "";
      this.unidad = "";
      this.servicio = 0;
      this.observaciones = "";
      this.valoraciones = "";
      this.showModal = false;
      this.error = false;
      document.body.classList.remove("modal-open");
    },
    closeUpdate() {
      this.id = 0;
      this.indicador = "";
      this.unidad = "";
      this.servicio = 0;
      this.observaciones = "";
      this.valoraciones = "";
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
    closeIndicadores() {
      this.showIndicadores = false;
    },
    openIndicadores(id) {
      this.id = id;
      this.$apollo.query({
        query: VERIFICAR_RAST,
        variables: {
          id: id
        }
      }).then(response => {
        if (response.data.verificarPruebasRast) {
          this.$apollo.query({
            query: RAST_PRUEBA,
            variables: {
              id: id
            }
          }).then(resp => {
            this.tiempo1 = resp.data.rastPrueba.tiempoUno;
            this.tiempo2 = resp.data.rastPrueba.tiempoDos;
            this.tiempo3 = resp.data.rastPrueba.tiempoTres;
            this.tiempo4 = resp.data.rastPrueba.tiempoQuatro;
            this.tiempo5 = resp.data.rastPrueba.tiempoCinco;
            this.tiempo6 = resp.data.rastPrueba.tiempoSeis;
            this.accion = "actualizar";
            this.rast_id = resp.data.rastPrueba.id;
          });
        }
      });

      this.$apollo.query({
        query: VERIFICAR_CARLSON,
        variables: {
          id: id
        }
      }).then(response => {
        if (response.data.verificarPruebasCarlson) {
          this.$apollo.query({
            query: CARLSON_PRUEBA,
            variables: {
              id: id
            }
          }).then(resp => {
            this.frecuenciaCardiacaAntes = resp.data.carlsonPrueba.frecuenciaCardiacaAntes;
            this.presionSistolicaAntes = resp.data.carlsonPrueba.presionSistolicaAntes;
            this.presionDiastolicaAntes = resp.data.carlsonPrueba.presionDiastolicaAntes;
            this.contactosUno = resp.data.carlsonPrueba.contactosUno;
            this.contactosDos = resp.data.carlsonPrueba.contactosDos;
            this.contactosTres = resp.data.carlsonPrueba.contactosTres;
            this.contactosQuatro = resp.data.carlsonPrueba.contactosQuatro;
            this.contactosCinco = resp.data.carlsonPrueba.contactosCinco;
            this.contactosSeis = resp.data.carlsonPrueba.contactosSeis;
            this.contactosSiete = resp.data.carlsonPrueba.contactosSiete;
            this.contactosOcho = resp.data.carlsonPrueba.contactosOcho;
            this.contactosNueve = resp.data.carlsonPrueba.contactosNueve;
            this.contactosDiez = resp.data.carlsonPrueba.contactosDiez;
            this.frecuenciaCardiacaDespues = resp.data.carlsonPrueba.frecuenciaCardiacaDespues;
            this.presionSistolicaDespues = resp.data.carlsonPrueba.presionSistolicaDespues;
            this.presionDiastolicaDespues = resp.data.carlsonPrueba.presionDiastolicaDespues;
            this.frecuenciaCardiacaMinUno = resp.data.carlsonPrueba.frecuenciaCardiacaMinUno;
            this.frecuenciaCardiacaMinTres = resp.data.carlsonPrueba.frecuenciaCardiacaMinTres;
            this.frecuenciaCardiacaMinCinco = resp.data.carlsonPrueba.frecuenciaCardiacaMinCinco;
            this.frecuenciaCardiacaMinSiete = resp.data.carlsonPrueba.frecuenciaCardiacaMinSiete;
            this.carlson_id = resp.data.carlsonPrueba.id;
            this.accion = "actualizar";
          });
        }
      });
      this.showIndicadores = true;
    },
    Guardar_indicadores() {
      if (this.prueba === "rast") {
        if (
          this.tiempo1 === 0 ||
          this.tiempo2 === 0 ||
          this.tiempo3 === 0 ||
          this.tiempo4 === 0 ||
          this.tiempo5 === 0 ||
          this.tiempo6 === 0
        ) {
          this.error = true;
          return false;
        }
        if (this.accion === "nuevo") {
          this.$apollo.mutate({
            mutation: NUEVO_RAST,
            variables: {
              distancia: 35,
              prueba: this.id,
              tiempoCinco: this.tiempo5,
              tiempoDos: this.tiempo2,
              tiempoQuatro: this.tiempo4,
              tiempoSeis: this.tiempo6,
              tiempoTres: this.tiempo3,
              tiempoUno: this.tiempo1
            },
            refetchQueries: [{ query: RAST }]
          }).then(response => {
            if (response.data.nuevaRast.success) {
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
                title: "Datos guardados"
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
                title: response.data.nuevaRast.error
              });
            }
          });
        } else {
          this.$apollo.mutate({
            mutation: UPDATE_RAST,
            variables: {
              distancia: 35,
              prueba: this.id,
              id: this.rast_id,
              tiempoCinco: this.tiempo5,
              tiempoDos: this.tiempo2,
              tiempoQuatro: this.tiempo4,
              tiempoSeis: this.tiempo6,
              tiempoTres: this.tiempo3,
              tiempoUno: this.tiempo1
            },
            refetchQueries: [{ query: RAST }]
          }).then(response => {
            if (response.data.updateRast.success) {
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
                title: "Datos guardados"
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
                title: response.data.updateRast.error
              });
            }
          });

        }
      } else if (this.prueba === "carlson") {
        if (
          this.frecuenciaCardiacaAntes === 0 ||
          this.presionSistolicaAntes === 0 ||
          this.presionDiastolicaAntes === 0 ||
          this.contactosUno === 0 ||
          this.contactosDos === 0 ||
          this.contactosTres === 0 ||
          this.contactosQuatro === 0 ||
          this.contactosCinco === 0 ||
          this.contactosSeis === 0 ||
          this.contactosSiete === 0 ||
          this.contactosOcho === 0 ||
          this.contactosNueve === 0 ||
          this.contactosDiez === 0 ||
          this.frecuenciaCardiacaDespues === 0 ||
          this.presionSistolicaDespues === 0 ||
          this.presionDiastolicaDespues === 0 ||
          this.frecuenciaCardiacaMinUno === 0 ||
          this.frecuenciaCardiacaMinTres === 0 ||
          this.frecuenciaCardiacaMinCinco === 0 ||
          this.frecuenciaCardiacaMinSiete === 0
        ) {
          this.error = true;
          return false;
        }
        if (this.accion === "nuevo") {
          this.$apollo.mutate({
            mutation: NUEVO_CARLSON,
            variables: {
              frecuenciaCardiacaAntes: this.frecuenciaCardiacaAntes,
              presionSistolicaAntes: this.presionSistolicaAntes,
              presionDiastolicaAntes: this.presionDiastolicaAntes,
              contactosUno: this.contactosUno,
              contactosDos: this.contactosDos,
              contactosTres: this.contactosTres,
              contactosQuatro: this.contactosQuatro,
              contactosCinco: this.contactosCinco,
              contactosSeis: this.contactosSeis,
              contactosSiete: this.contactosSiete,
              contactosOcho: this.contactosOcho,
              contactosNueve: this.contactosNueve,
              contactosDiez: this.contactosDiez,
              frecuenciaCardiacaDespues: this.frecuenciaCardiacaDespues,
              presionSistolicaDespues: this.presionSistolicaDespues,
              presionDiastolicaDespues: this.presionDiastolicaDespues,
              frecuenciaCardiacaMinUno: this.frecuenciaCardiacaMinUno,
              frecuenciaCardiacaMinTres: this.frecuenciaCardiacaMinTres,
              frecuenciaCardiacaMinCinco: this.frecuenciaCardiacaMinCinco,
              frecuenciaCardiacaMinSiete: this.frecuenciaCardiacaMinSiete,
              prueba: this.id
            },
            refetchQueries: [{ query: CARLSON }]
          }).then(response => {
            if (response.data.nuevaCarlson.success) {
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
                title: "Datos guardados"
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
                title: response.data.nuevaCarlson.error
              });
            }
          });
        } else {
          this.$apollo.mutate({
            mutation: UPDATE_CARLSON,
            variables: {
              frecuenciaCardiacaAntes: this.frecuenciaCardiacaAntes,
              presionSistolicaAntes: this.presionSistolicaAntes,
              presionDiastolicaAntes: this.presionDiastolicaAntes,
              contactosUno: this.contactosUno,
              contactosDos: this.contactosDos,
              contactosTres: this.contactosTres,
              contactosQuatro: this.contactosQuatro,
              contactosCinco: this.contactosCinco,
              contactosSeis: this.contactosSeis,
              contactosSiete: this.contactosSiete,
              contactosOcho: this.contactosOcho,
              contactosNueve: this.contactosNueve,
              contactosDiez: this.contactosDiez,
              frecuenciaCardiacaDespues: this.frecuenciaCardiacaDespues,
              presionSistolicaDespues: this.presionSistolicaDespues,
              presionDiastolicaDespues: this.presionDiastolicaDespues,
              frecuenciaCardiacaMinUno: this.frecuenciaCardiacaMinUno,
              frecuenciaCardiacaMinTres: this.frecuenciaCardiacaMinTres,
              frecuenciaCardiacaMinCinco: this.frecuenciaCardiacaMinCinco,
              frecuenciaCardiacaMinSiete: this.frecuenciaCardiacaMinSiete,
              prueba: this.id,
              id: this.carlson_id
            },
            refetchQueries: [{ query: CARLSON }]
          }).then(response => {
            if (response.data.updateCarlson.success) {
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
                title: "Datos guardados"
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
                title: response.data.updateCarlson.error
              });
            }
          });
        }
      }
      this.Cerrar_Indicadores();
    },
    Cerrar_Indicadores() {
      this.showIndicadores = false;
      this.id = false;
      this.prueba = "";
      this.distancia = 0;
      this.tiempo1 = 0;
      this.tiempo2 = 0;
      this.tiempo3 = 0;
      this.tiempo4 = 0;
      this.tiempo5 = 0;
      this.tiempo6 = 0;
      this.frecuenciaCardiacaAntes = 0;
      this.presionSistolicaAntes = 0;
      this.presionDiastolicaAntes = 0;
      this.contactosUno = 0;
      this.contactosDos = 0;
      this.contactosTres = 0;
      this.contactosQuatro = 0;
      this.contactosCinco = 0;
      this.contactosSeis = 0;
      this.contactosSiete = 0;
      this.contactosOcho = 0;
      this.contactosNueve = 0;
      this.contactosDiez = 0;
      this.frecuenciaCardiacaDespues = 0;
      this.presionSistolicaDespues = 0;
      this.presionDiastolicaDespues = 0;
      this.frecuenciaCardiacaMinUno = 0;
      this.frecuenciaCardiacaMinTres = 0;
      this.frecuenciaCardiacaMinCinco = 0;
      this.frecuenciaCardiacaMinSiete = 0;
      this.accion = "nuevo";
    },
    openVer_Indicadores(id) {
      this.id = id;
      this.carlson.forEach(item => {
        if (item.prueba.id === this.id) {
          this.elementos_curva.push(item.contactosUno);
          this.elementos_curva.push(item.contactosDos);
          this.elementos_curva.push(item.contactosTres);
          this.elementos_curva.push(item.contactosQuatro);
          this.elementos_curva.push(item.contactosCinco);
          this.elementos_curva.push(item.contactosSeis);
          this.elementos_curva.push(item.contactosSiete);
          this.elementos_curva.push(item.contactosOcho);
          this.elementos_curva.push(item.contactosNueve);
          this.elementos_curva.push(item.contactosDiez);
        }
      });
      // Calcular la pendiente para la línea recta descendente
      const n = this.elementos_curva.length;

// Calcular las sumatorias necesarias
      let sumatoriaX = 0;
      let sumatoriaY = 0;
      let sumatoriaXY = 0;
      let sumatoriaXcuadrado = 0;

      for (let i = 0; i < n; i++) {
        sumatoriaX += i;
        sumatoriaY += this.elementos_curva[i];
        sumatoriaXY += i * this.elementos_curva[i];
        sumatoriaXcuadrado += i * i;
      }

// Calcular la pendiente (m) y la intersección en el eje y (b)
      const pendiente = (n * sumatoriaXY - sumatoriaX * sumatoriaY) / (n * sumatoriaXcuadrado - sumatoriaX * sumatoriaX);
      const interseccionY = (sumatoriaY - pendiente * sumatoriaX) / n;

// Mostrar la ecuación de la línea de regresión lineal
      this.ecuacion_carslon = this.title_grafico_text + `: y = ${pendiente.toFixed(4)}x + ${interseccionY.toFixed(3)}`;
      for (let i = 0; i < n; i++) {
        this.lineaRecta.push(pendiente * i + interseccionY);
      }
      this.verIndicadores = true;
    },
    closeVer_Indicadores() {
      this.lineaRecta = [];
      this.ecuacion_carslon = "";
      this.elementos_curva = [];
      this.curva = false;
      this.id = 0;
      this.verIndicadores = false;
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

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 80%;
}

.modal-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.modal {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.modal.show {
  opacity: 1;
}
</style>
