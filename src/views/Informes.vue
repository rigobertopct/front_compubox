<template>
  <div class="container">
    <div class="card shadow-lg p-1 mb-3">
      <div class="card-body">
        <h5 class="mb-3">{{ detalles_text }}</h5>
        <div class="row">
          <div class="col-lg-4 col-md-4 col-sm-12">
            <h6 class="text-bold">{{ seleccione_anno_text }}</h6>
            <select v-model="anno" class="form-select border-secondary border mb-3 p-2 w-75">
              <option v-for="item in annosEventos" :key="item" :value="item">{{ item }}
              </option>
            </select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <h6 class="text-bold">{{ evento_text }}</h6>
            <select v-model="evento" class="form-select border-secondary border mb-3 p-2 w-75">
              <option v-for="item in eventosByYear" :key="item.id" :value="item.id">{{ item.nombre }}
              </option>
            </select>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <h6 class="text-bold">{{ combates_text }}</h6>
            <select v-model="combate" class="form-select border-secondary border mb-3 p-2 w-75">
              <option v-for="item in combatesByEventos" :key="item.id" :value="item">{{ item.nombre }} entre
                {{ item.esquinaA.deportista.nombre }} y {{ item.esquinaR.deportista.nombre }}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-md-6 col-l-4">
            <span class="text-bold text-lg">{{ combate !== null ? combate.evento.tipoevento.tipo : "" }}</span><br>
            {{ reglamento_text }}:<span class="ms-1">{{ combate !== null ? combate.evento.reglamento.tipo : "" }}</span><br>
            {{ fecha_text }}:<span class="ms-1">{{ combate !== null ? combate.fecha : "" }}</span><br>
          </div>
          <div class="col-sm-12 col-md-6 col-l-4">
            <span class="text-bold text-lg">{{ combate !== null ? combate.evento.nombre : "" }}</span><br>
            {{ round_text }}:<span class="ms-1">{{ combate !== null ? combate.evento.reglamento.cantR : ""
            }}</span>
          </div>
          <div class="col-sm-12 col-md-6 col-l-4">
            <span class="text-bold text-lg">{{ combate !== null ? combate.nombre : "" }}</span><br>
            {{ tiempo_text }}:<span
            class="ms-1">{{ combate !== null ? combate.evento.reglamento.duracion : "" }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="card p-2">
          <div class="card-header bg-gradient-info">
            <h5 class="text-white">{{ esquina_azul_text }}:<span
              class="text-bold ms-1">{{ combate !== null ? combate.esquinaA ? combate.esquinaA.deportista.nombre : "" : ""
              }}</span></h5>
            <h6 class="text-white" v-if="resultado_azul!==null">Resultado: {{ resultado_azul.resul }} por
              {{ resultado_azul.descripcion }}</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-7 text-start">
                <pie-chart
                  id="pugil"
                  :chart="{
                    labels: [efectivos_text, fallados_text],
                    datasets: {
                      label: efectividad_text,
                      data: [efectivo_azul, fallo_azul],
                    },
                  }"
                />
              </div>
              <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">{{ efectivos_text }}</span>
          </span>
                <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">{{ fallados_text }}</span>
          </span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="text-dark">{{ golpes_round_text }}</h6>
              <div class="w-50 d-flex justify-content-end align-items-center">
                <h6 class="text-dark">{{ round_text }}:</h6>
                <select class="form-control w-50 p-2 border border-secondary ms-1 bg-white" v-model="round_azul">
                  <option value="0">{{ Todos_text }}</option>
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
            <h5 class="text-white">{{ esquina_roja_text }}:<span
              class="text-bold ms-1">{{ combate !== null ? combate.esquinaR ? combate.esquinaR.deportista.nombre : "" : ""
              }}</span></h5>
            <h6 class="text-white" v-if="resultado_rojo!==null">Resultado: {{ resultado_rojo.resul }} por
              {{ resultado_rojo.descripcion }}</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-7 text-start">
                <pie-chart
                  id="pugil1"
                  :chart="{
                    labels: [efectivos_text, fallados_text],
                    datasets: {
                      label: efectividad_text,
                      data: [efectivo_rojo, fallo_rojo],
                    },
                  }" />
              </div>
              <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">{{ efectivos_text }}</span>
          </span>
                <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">{{ fallados_text }}</span>
          </span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="text-dark">{{ golpes_round_text }}</h6>
              <div class="w-50 d-flex justify-content-end align-items-center">
                <h6 class="text-dark">{{ round_text }}:</h6>
                <select class="form-control w-50 p-2 border border-secondary ms-1 bg-white" v-model="round_rojo">
                  <option value="0">{{ Todos_text }}</option>
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
import { mapState } from "vuex";

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
                }
                categoria {
                    id
                    categoria
                    pesoMin
                    pesoMax
                }
            }
            esquinaA {
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
              }
              categoria {
                  id
                  categoria
                  pesoMin
                  pesoMax
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
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
    }
}
`;
const COMBATES = gql`query CombatesByEventos($evento:Int!) {
    combatesByEventos(evento: $evento) {
        id
        nombre
        fecha
        esquinaR {
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
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        esquinaA {
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
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        evento {
            id
            nombre
            anno
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
            }
            categoria {
                id
                categoria
                pesoMin
                pesoMax
            }
        }
        resultado {
            id
            resul
            descripcion
        }
    }
}
`;
const ANNOS = gql`
{
  annosEventos
}`;
const EVENTOS = gql`
query EventosByYear($year:Int!, $idioma:String!){
  eventosByYear(year:$year, idioma:$idioma){
    id
    nombre
  }
}`;
export default {
  name: "Informes",
  components: { TimelineList, TimelineItem, Teclas, PieChart },
  data() {
    return {
      combatesByEventos: [],
      annosEventos: [],
      eventosByYear: [],
      efectivo_rojo: 0,
      efectivo_azul: 0,
      fallo_rojo: 0,
      evento: 0,
      fallo_azul: 0,
      resultado_azul: null,
      resultado_rojo: null,
      round_rojo: 0,
      round_azul: 0,
      anno: 0,
      golpes_azul: [],
      golpes_roja: [],
      combate: null,

      detalles_text: "Detalles del combate",
      seleccione_anno_text: "Seleccione el año",
      reglamento_text: "Reglamento",
      round_text: "Cantidad de rounds",
      tiempo_text: "Tiempo de cada round",
      golpes_round_text: "Golpes por round",
      Todos_text: "Todos",

      efectividad_text: "Efectividad",
      evento_text: "Evento",
      esquina_roja_text: "Esquina roja",
      esquina_azul_text: "Esquina azul",
      fecha_text: "Fecha",
      combates_text: "Combates",
      efectivos_text: "Efectivos",
      fallados_text: "Fallados"
    };
  },
  watch: {
    async combate(val) {
      if (val !== null) {
        await this.$apollo.query({
          query: GOLPES,
          variables: {
            combate: val ? val.id : 0,
            pugil: val.esquinaA ? val.esquinaA.id : 0,
            round: this.round_azul
          }
        }).then(response => {
          this.golpes_azul = response.data.contGolpes;
          this.Efectivos_azul();
        });
        await this.$apollo.query({
          query: GOLPES,
          variables: {
            combate: val ? val.id : 0,
            pugil: val.esquinaR ? val.esquinaR.id : 0,
            round: this.round_rojo
          }
        }).then(response => {
          this.golpes_roja = response.data.contGolpes;
          this.Efectivos_rojo();
        });
        await this.$apollo.query({
          query: RESULTADO,
          variables: {
            combate: val ? val.id : 0,
            pugil: val.esquinaA ? val.esquinaA.id : 0
          }
        }).then(response => {
          this.resultado_azul = response.data.resultadoCombate ? response.data.resultadoCombate.resultado : null;
        });
        await this.$apollo.query({
          query: RESULTADO,
          variables: {
            combate: val ? val.id : 0,
            pugil: val.esquinaR ? val.esquinaR.id : 0
          }
        }).then(response => {
          this.resultado_rojo = response.data.resultadoCombate ? response.data.resultadoCombate.resultado : null;
        });
      }
    },
    async round_rojo(val) {
      if (this.combate !== null) {
        await this.$apollo.query({
          query: GOLPES,
          variables: {
            combate: this.combate ? this.combate.id : 0,
            pugil: this.combate.esquinaR ? this.combate.esquinaR.id : 0,
            round: val
          }
        }).then(response => {
          this.golpes_roja = response.data.contGolpes;
          console.log(this.golpes_roja);
        });
        this.Efectivos_rojo();
      }
    },
    async round_azul(val) {
      if (this.combate !== null) {
        await this.$apollo.query({
          query: GOLPES,
          variables: {
            combate: this.combate ? this.combate.id : 0,
            pugil: this.combate.esquinaA ? this.combate.esquinaA.id : 0,
            round: val
          }
        }).then(response => {
          this.golpes_azul = response.data.contGolpes;
        });
        this.Efectivos_azul();
      }
    },
    idioma() {
      if (this.idioma === "es") {
        this.combates_text = "Combates";
        this.evento_text = "Evento";
        this.fecha_text = "Fecha";
        this.esquina_roja_text = "Esquina roja";
        this.esquina_azul_text = "Esquina azul";
        this.efectividad_text = "Efectividad";
        this.efectivos_text = "Efectivos";
        this.fallados_text = "Fallados";

        this.detalles_text = "Detalles del combate";
        this.seleccione_anno_text = "Seleccione el año";
        this.reglamento_text = "Reglamento";
        this.round_text = "Cantidad de rounds";
        this.tiempo_text = "Tiempo de cada round";
        this.golpes_round_text = "Golpes por round";
        this.Todos_text = "Todos";
      }
      if (this.idioma === "ru") {
        this.combates_text = "Поединки";
        this.evento_text = "Mероприятие";
        this.fecha_text = "Дата";
        this.esquina_roja_text = "Kрасный угол";
        this.esquina_azul_text = "Cиний угол";
        this.efectividad_text = "Эффективность";
        this.efectivos_text = "Эффективный";
        this.fallados_text = "Неуспешный";

        this.detalles_text = "Подробности боксерского поединка";
        this.seleccione_anno_text = "Год";
        this.reglamento_text = "Регулирование";
        this.round_text = "Количество раундов";
        this.tiempo_text = "Время каждого раунда";
        this.golpes_round_text = "GУдаров за раунд";
        this.Todos_text = "Все";
      }
      if (this.idioma === "in") {
        this.combates_text = "Fighting";
        this.evento_text = "Event";
        this.fecha_text = "Date";
        this.esquina_roja_text = "Red corner";
        this.esquina_azul_text = "Blue corner";
        this.efectividad_text = "Effectiveness";
        this.efectivos_text = "Effective";
        this.fallados_text = "Failed";

        this.detalles_text = "Combat details";
        this.seleccione_anno_text = "Select the year";
        this.reglamento_text = "Regulation";
        this.round_text = "Number of rounds";
        this.tiempo_text = "Time of each round";
        this.golpes_round_text = "Blows per round";
        this.Todos_text = "All";
      }
      if (this.idioma === "fr") {
        this.combates_text = "Lutte";
        this.evento_text = "Événement";
        this.fecha_text = "Date";
        this.esquina_roja_text = "Coin rouge";
        this.esquina_azul_text = "Coin bleu";
        this.efectividad_text = "Efficacité";
        this.efectivos_text = "Efficace";
        this.fallados_text = "Échoué";

        this.detalles_text = "Détails des combats";
        this.seleccione_anno_text = "Sélectionnez l'année";
        this.reglamento_text = "Régulation";
        this.round_text = "Nombre de tours";
        this.tiempo_text = "Temps de chaque tour";
        this.golpes_round_text = "Coups par tour";
        this.Todos_text = "Tous";
      }
    }
  },
  apollo: {
    combatesByEventos: {
      query: COMBATES,
      variables() {
        return {
          evento: this.evento
        };
      },
      fetchPolicy: "cache-and-network"
    },
    eventosByYear: {
      query: EVENTOS,
      variables() {
        return {
          year: this.anno,
          idioma:this.idioma
        };
      },
      fetchPolicy: "cache-and-network"
    },
    annosEventos: {
      query: ANNOS,
      fetchPolicy: "cache-and-network"
    }
  },
  computed: {
    ...mapState(["idioma"])
  },
  created() {
    if (this.idioma === "es") {
      this.combates_text = "Combates";
      this.evento_text = "Evento";
      this.fecha_text = "Fecha";
      this.esquina_roja_text = "Esquina roja";
      this.esquina_azul_text = "Esquina azul";
      this.efectividad_text = "Efectividad";
      this.efectivos_text = "Efectivos";
      this.fallados_text = "Fallados";

      this.detalles_text = "Detalles del combate";
      this.seleccione_anno_text = "Seleccione el año";
      this.reglamento_text = "Reglamento";
      this.round_text = "Cantidad de rounds";
      this.tiempo_text = "Tiempo de cada round";
      this.golpes_round_text = "Golpes por round";
      this.Todos_text = "Todos";
    }
    if (this.idioma === "ru") {
      this.combates_text = "Поединки";
      this.evento_text = "Mероприятие";
      this.fecha_text = "Дата";
      this.esquina_roja_text = "Kрасный угол";
      this.esquina_azul_text = "Cиний угол";
      this.efectividad_text = "Эффективность";
      this.efectivos_text = "Эффективный";
      this.fallados_text = "Неуспешный";

      this.detalles_text = "Подробности боксерского поединка";
      this.seleccione_anno_text = "Выберите год";
      this.reglamento_text = "Регулирование";
      this.round_text = "Количество раундов";
      this.tiempo_text = "Время каждого раунда";
      this.golpes_round_text = "GУдаров за раунд";
      this.Todos_text = "Все";
    }
    if (this.idioma === "in") {
      this.combates_text = "Fighting";
      this.evento_text = "Event";
      this.fecha_text = "Date";
      this.esquina_roja_text = "Red corner";
      this.esquina_azul_text = "Blue corner";
      this.efectividad_text = "Effectiveness";
      this.efectivos_text = "Effective";
      this.fallados_text = "Failed";

      this.detalles_text = "Combat details";
      this.seleccione_anno_text = "Select the year";
      this.reglamento_text = "Regulation";
      this.round_text = "Number of rounds";
      this.tiempo_text = "Time of each round";
      this.golpes_round_text = "Blows per round";
      this.Todos_text = "All";
    }
    if (this.idioma === "fr") {
      this.combates_text = "Lutte";
      this.evento_text = "Événement";
      this.fecha_text = "Date";
      this.esquina_roja_text = "Coin rouge";
      this.esquina_azul_text = "Coin bleu";
      this.efectividad_text = "Efficacité";
      this.efectivos_text = "Efficace";
      this.fallados_text = "Échoué";

      this.detalles_text = "Détails des combats";
      this.seleccione_anno_text = "Sélectionnez l'année";
      this.reglamento_text = "Régulation";
      this.round_text = "Nombre de tours";
      this.tiempo_text = "Temps de chaque tour";
      this.golpes_round_text = "Coups par tour";
      this.Todos_text = "Tous";
    }
  },
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
