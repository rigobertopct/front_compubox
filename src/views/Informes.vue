<template>
  <div class="container">
    <div class="card shadow-lg p-1 mb-3">
      <div class="card-body">
        <h5 class="mb-3">Detalles del combate</h5>
        <h6 class="text-bold">Seleccione un combate</h6>
        <select v-model="combate" class="form-control border-secondary border mb-3 p-2 w-50">
          <option v-for="item in combates" :key="item.id" :value="item">{{ item.id }}-{{ item.nombre }} de
            {{ item.evento.nombre }}
          </option>
        </select>
        <div class="row">
          <div class="col-sm-12 col-md-6 col-l-4">
            <span class="text-bold text-lg">{{ combate !== null ? combate.evento.tipoevento.tipo : "" }}</span><br>
            Reglamento:<span class="ms-1">{{ combate !== null ? combate.evento.reglamento.tipo : "" }}</span><br>
            Fecha:<span class="ms-1">{{ combate !== null ? combate.fecha : "" }}</span><br>
          </div>
          <div class="col-sm-12 col-md-6 col-l-4">
            <span class="text-bold text-lg">{{ combate !== null ? combate.evento.nombre : "" }}</span><br>
            Cantidad de rounds:<span class="ms-1">{{ combate !== null ? combate.evento.reglamento.cantR : ""
            }}</span>
          </div>
          <div class="col-sm-12 col-md-6 col-l-4">
            <span class="text-bold text-lg">{{ combate !== null ? combate.nombre : "" }}</span><br>
            Tiempo de cada round:<span
            class="ms-1">{{ combate !== null ? combate.evento.reglamento.duracion : "" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="card p-2">
          <div class="card-header bg-gradient-info">
            <h5 class="text-white">Esquina azul:<span
              class="text-bold ms-1">{{ combate !== null ? combate.esquinaA.nombre : "" }}</span></h5>
            <h6 class="text-white" v-if="resultado_azul!==null">Resultado: {{ resultado_azul.resul }} por
              {{ resultado_azul.descripcion }}</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-7 text-start">
                <pie-chart
                  id="pugil"
                  :chart="{
              labels: ['Efectivos', 'Fallados'],
              datasets: {
                label: 'Efectividad',
                data: [efectivo_azul, fallo_azul],
              },
            }"
                />
              </div>
              <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">Efectivos</span>
          </span>
                <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">Fallados</span>
          </span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="text-dark">Golpes por round</h6>
              <div class="w-50 d-flex justify-content-end align-items-center">
                <h6 class="text-dark">Round:</h6>
                <select class="form-control w-50 p-2 border border-secondary ms-1 bg-white" v-model="round_azul">
                  <option v-for="item in combate ? combate.evento.reglamento.cantR : 0" :key="item">{{ item }}</option>
                </select></div>
            </div>
            <timeline-list>
              <timeline-item v-for="item in golpes_azul" :key="item.id"
                             :color="item.golpe.efectivo?'success':'danger'"
                             :icon="{ component: 'sports_mma', class: 'text-white text-sm' }"
                             :title="item.golpe.golpe"
                             :date-time="item.tiempo"
              />
            </timeline-list>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="card p-2">
          <div class="card-header bg-gradient-danger">
            <h5 class="text-white">Esquina Roja:<span
              class="text-bold ms-1">{{ combate !== null ? combate.esquinaR.nombre : "" }}</span></h5>
            <h6 class="text-white" v-if="resultado_rojo!==null">Resultado: {{ resultado_rojo.resul }} por
              {{ resultado_rojo.descripcion }}</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-7 text-start">
                <pie-chart
                  id="pugil1"
                  :chart="{
                    labels: ['Efectivos', 'Fallados'],
                    datasets: {
                      label: 'Efectividad',
                      data: [efectivo_rojo, fallo_rojo],
                    },
                  }" />
              </div>
              <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">Efectivos</span>
          </span>
                <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">Fallados</span>
          </span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="text-dark">Golpes por round</h6>
              <div class="w-50 d-flex justify-content-end align-items-center">
                <h6 class="text-dark">Round:</h6>
                <select class="form-control w-50 p-2 border border-secondary ms-1 bg-white" v-model="round_rojo">
                  <option v-for="item in combate ? combate.evento.reglamento.cantR : 0" :key="item">{{ item }}</option>
                </select></div>
            </div>
            <timeline-list>
              <timeline-item v-for="item in golpes_roja" :key="item.id"
                             :color="item.golpe.efectivo?'success':'danger'"
                             :icon="{ component: 'sports_mma', class: 'text-white text-sm' }"
                             :title="item.golpe.golpe"
                             :date-time="item.tiempo"
              />
            </timeline-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/examples/Charts/PieChart.vue";
import Teclas from "@/views/Configuracion/Teclas.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import TimelineList from "@/examples/Cards/TimelineList.vue";
import gql from "graphql-tag";

const GOLPES = gql`query ContGolpes($combate: Int!, $pugil:Int!, $round:Int!) {
    contGolpes(combate: $combate, pugil:$pugil, round:$round) {
        id
        numeroAsalto
        tiempo
        combate {
            id
            nombre
            fecha
            esquinaR {
                id
                nombre
                edad
                peso
                foto
                categoria {
                    id
                    categoria
                    pesoMin
                    pesoMax
                }
                pais {
                    id
                    pais
                    siglas
                }
            }
            esquinaA {
                id
                nombre
                edad
                peso
                foto
                categoria {
                    id
                    categoria
                    pesoMin
                    pesoMax
                }
                pais {
                    id
                    pais
                    siglas
                }
            }
            evento {
                id
                nombre
                pais {
                    id
                    pais
                    siglas
                }
                reglamento {
                    id
                    tipo
                    cantR
                    duracion
                }
                tipoevento {
                    id
                    tipo
                }
            }
        }
        golpe {
            id
            golpe
            siglas
            efectivo
        }
        esquina {
            id
            nombre
            edad
            peso
            foto
        }
    }
}
`;
const COMBATES = gql`query Combates($name:String!) {
    combates(name:$name) {
        id
        nombre
        fecha
        esquinaR {
            id
            nombre
            edad
            peso
            foto
        }
        esquinaA {
            id
            nombre
            edad
            peso
            foto
        }
        evento {
            id
            nombre
            reglamento {
                id
                tipo
                cantR
                duracion
            }
            tipoevento {
                id
                tipo
            }
        }
    }
}
`;
const RESULTADO = gql`query ResultadoCombate($combate:Int!, $pugil:Int!) {
    resultadoCombate(combate: $combate, pugil: $pugil) {
        id
        combate {
            id
            nombre
            fecha
        }
        pugil {
            id
            nombre
            edad
            peso
            foto
        }
        resultado {
            id
            resul
            descripcion
        }
    }
}
`;
export default {
  name: "Informes",
  components: { TimelineList, TimelineItem, Teclas, PieChart },
  data() {
    return {
      combates: [],
      efectivo_rojo: 0,
      efectivo_azul: 0,
      fallo_rojo: 0,
      fallo_azul: 0,
      resultado_azul: null,
      resultado_rojo: null,
      round_rojo: 1,
      round_azul: 1,
      golpes_azul: [],
      golpes_roja: [],
      combate: null
    };
  },
  watch: {
    async combate(val) {
      await this.$apollo.query({
        query: GOLPES,
        variables: {
          combate: this.combate ? this.combate.id : 0,
          pugil: this.combate ? this.combate.esquinaA.id : 0,
          round: this.round_azul
        }
      }).then(response => {
        this.golpes_azul = response.data.contGolpes;
        this.Efectivos_azul();
      });
      await this.$apollo.query({
        query: GOLPES,
        variables: {
          combate: this.combate ? this.combate.id : 0,
          pugil: this.combate ? this.combate.esquinaR.id : 0,
          round: this.round_rojo
        }
      }).then(response => {
        this.golpes_roja = response.data.contGolpes;
        this.Efectivos_rojo();
      });
      await this.$apollo.query({
        query: RESULTADO,
        variables: {
          combate: this.combate ? this.combate.id : 0,
          pugil: this.combate ? this.combate.esquinaA.id : 0
        }
      }).then(response => {
        this.resultado_azul = response.data.resultadoCombate ? response.data.resultadoCombate.resultado : null;
      });
      await this.$apollo.query({
        query: RESULTADO,
        variables: {
          combate: this.combate ? this.combate.id : 0,
          pugil: this.combate ? this.combate.esquinaR.id : 0
        }
      }).then(response => {
        this.resultado_rojo = response.data.resultadoCombate ? response.data.resultadoCombate.resultado : null;
      });
    },
    async round_rojo(val) {
      await this.$apollo.query({
        query: GOLPES,
        variables: {
          combate: this.combate ? this.combate.id : 0,
          pugil: this.combate ? this.combate.esquinaR.id : 0,
          round: val
        }
      }).then(response => {
        this.golpes_roja = response.data.contGolpes;
        console.log(this.golpes_roja);
      });
      this.Efectivos_rojo();
    },
    async round_azul(val) {
      await this.$apollo.query({
        query: GOLPES,
        variables: {
          combate: this.combate ? this.combate.id : 0,
          pugil: this.combate ? this.combate.esquinaA.id : 0,
          round: val
        }
      }).then(response => {
        this.golpes_azul = response.data.contGolpes;
      });
      this.Efectivos_azul();
    }
  },
  apollo: {
    combates: {
      query: COMBATES,
      variables: {
        name: ""
      },
      fetchPolicy: "cache-and-network"
    }
  },
  computed: {},
  methods: {
    Efectivos() {
      this.Efectivos_rojo();
      this.Efectivos_azul();
    },
    Efectivos_rojo() {
      let efectivo = 0;
      this.golpes_roja.forEach(elemento => {
        if (elemento.golpe.efectivo) {
          efectivo++;
        }
      });
      this.efectivo_rojo = efectivo;
      this.fallo_rojo = this.golpes_roja.length - efectivo;
    },
    Efectivos_azul() {
      let efectivo = 0;
      this.golpes_azul.forEach(elemento => {
        if (elemento.golpe.efectivo) {
          efectivo++;
        }
      });
      this.efectivo_azul = efectivo;
      this.fallo_azul = this.golpes_azul.length - efectivo;
    }
  },
  mounted() {
    this.combate = this.$store.state.combate;
  }
};
</script>

<style scoped>

</style>
