<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: combates_text, value: cantCombates }"
              detail=""
              :icon="{
                name: 'sports_mma',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: victorias_text, value: cantVictorias }"
              detail=""
              :icon="{
                name: 'emoji_events',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: nacionales_text, value: cantNacionales }"
              detail=""
              :icon="{
                name: 'event',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: internacionales_text, value: cantInternacionales }"
              detail=""
              :icon="{
                name: 'event',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="card p-3">
              <div class="card-header"><h5 class="card-title">{{efectividad_text}}</h5></div>
              <div class="row">
                <div class="col-7 text-start">
                  <pie-chart
                    id="efectividad"
                    :chart="{
              labels: [efectivos_text, fallados_text],
              datasets: {
                label: efectividad_text,
                data: [efectivos, fallados],
              },
            }"
                  />
                </div>
                <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">{{efectivos_text}}</span>
          </span>
                  <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">{{fallados_text}}</span>
          </span>
                </div>
              </div>
              <div class="card-footer"><h6 class="card-subtitle">{{subtexto_efectividad}}</h6></div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="card p-3">
              <div class="card-header"><h5 class="card-title">{{titulo_cabeza_text}}</h5></div>
              <div class="row">
                <div class="col-7 text-start">
                  <pie-chart
                    id="golpes"
                    :chart="{
                    labels: [golps_cabeza_text, golpes_tronco_text],
                    datasets: {
                      label: titulo_cabeza_text,
                      data: [cantCabeza, cantTronco],
                    },
                  }" />
                </div>
                <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">{{golps_cabeza_text}}</span>
          </span>
                  <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">{{golpes_tronco_text}}</span>
          </span>
                </div>
              </div>
              <div class="card-footer"><h6 class="card-subtitle">{{subtexto_cabeza}}</h6></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>
<script>
import SalesTableCard from "./components/SalesTableCard.vue";
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChart from "./components/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import BookingCard from "./components/BookingCard.vue";

import US from "../../assets/img/icons/flags/US.png";
import DE from "../../assets/img/icons/flags/DE.png";
import GB from "../../assets/img/icons/flags/GB.png";
import BR from "../../assets/img/icons/flags/BR.png";
import booking1 from "../../assets/img/products/product-1-min.jpg";
import booking2 from "../../assets/img/products/product-2-min.jpg";
import booking3 from "../../assets/img/products/product-3-min.jpg";
import ChannelsChartCard from "@/views/dashboards/components/ChannelsChartCard.vue";
import RevenueChartCard from "@/views/dashboards/components/RevenueChartCard.vue";
import gql from "graphql-tag";
import Teclas from "@/views/Configuracion/Teclas.vue";
import PieChart from "@/examples/Charts/PieChart.vue";
import { mapState } from "vuex";

const COMBATES = gql`query{cantCombates}`;
const VICTORIAS = gql`query{cantVictorias}`;
const NACIONALES = gql`query{cantNacionales}`;
const INTERNACIONALES = gql`query{cantInternacionales}`;
const CABEZA = gql`query CantCabeza{cantCabeza}`;
const TRONCO = gql`query CantCabeza{cantTronco}`;
const EFECTIVOS = gql`query CantCabeza{efectivos}`;
const FALLADOS = gql`query CantCabeza{fallados}`;
export default {
  name: "DashboardDefault",
  apollo: {
    cantCombates: {
      query: COMBATES,
      fetchPolicy: "cache-and-network"
    },
    cantVictorias: {
      query: VICTORIAS,
      fetchPolicy: "cache-and-network"
    },
    efectivos: {
      query: EFECTIVOS,
      fetchPolicy: "cache-and-network"
    },
    fallados: {
      query: FALLADOS,
      fetchPolicy: "cache-and-network"
    },
    cantNacionales: {
      query: NACIONALES,
      fetchPolicy: "cache-and-network"
    },
    cantInternacionales: {
      query: INTERNACIONALES,
      fetchPolicy: "cache-and-network"
    },
    cantCabeza: {
      query: CABEZA,
      fetchPolicy: "cache-and-network"
    },
    cantTronco: {
      query: TRONCO,
      fetchPolicy: "cache-and-network"
    }
  },
  components: {
    PieChart,
    Teclas,
    RevenueChartCard,
    ChannelsChartCard,
    SalesTableCard,
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChart,
    MiniStatisticsCard,
    BookingCard
  },
  computed: {
    ...mapState(["idioma"])
  },
  created() {
    if (this.idioma === "es") {
      this.efectividad_text = "Efectividad";
      this.efectivos_text = "Efectivos";
      this.fallados_text = "Fallados";
      this.subtexto_efectividad = "Cantidad de golpes efectivos y cantidad de golpes fallados en todos los combates";
      this.titulo_cabeza_text = "Golpes lanzados a la cabeza y al tronco";
      this.golps_cabeza_text = "Golpes a la cabeza";
      this.golpes_tronco_text = "Golpes al tronco";
      this.subtexto_cabeza = "Cantidad de golpes de golpes lanzados a la cabeza y al tronco en todos los combates";
      this.combates_text = "Combates";
      this.victorias_text = "Victorias";
      this.nacionales_text = "Nacionales";
      this.internacionales_text = "Internacionales";
    }
    if (this.idioma === "ru") {
      this.efectividad_text = "Эффективность";
      this.efectivos_text = "Эффективный";
      this.fallados_text = "Неуспешный";
      this.subtexto_efectividad = "Количество результативных ударов и количество пропущенных ударов во всех боях";
      this.titulo_cabeza_text = "Удары по голове и туловищу";
      this.golps_cabeza_text = "удары по голове";
      this.golpes_tronco_text = "удары в багажник";
      this.subtexto_cabeza = "Количество нанесенных ударов в голову и туловище во всех боях";
      this.combates_text = "Боевые действия";
      this.victorias_text = "Победы";
      this.nacionales_text = "Национальный";
      this.internacionales_text = "Международный";
    }
    if (this.idioma === "in") {
      this.efectividad_text = "Effectiveness";
      this.efectivos_text = "Effective";
      this.fallados_text = "Failed";
      this.subtexto_efectividad = "Number of effective blows and number of missed blows in all fights";
      this.titulo_cabeza_text = "Blows to the head and trunk";
      this.golps_cabeza_text = "Blows to the head";
      this.golpes_tronco_text = "Blows to the trunk";
      this.subtexto_cabeza = "Number of blows delivered to the head and trunk in all fights";
      this.combates_text = "Fighting";
      this.victorias_text = "Victories";
      this.nacionales_text = "National";
      this.internacionales_text = "International";
    }
    if (this.idioma === "fr") {
      this.efectividad_text = "Efficacité";
      this.efectivos_text = "Efficace";
      this.fallados_text = "Échoué";
      this.subtexto_efectividad = "Nombre de coups efficaces et nombre de coups manqués dans tous les combats";
      this.titulo_cabeza_text = "Coups à la tête et au tronc";
      this.golps_cabeza_text = "Coups à la tête";
      this.golpes_tronco_text = "Coups dans le coffre";
      this.subtexto_cabeza = "Nombre de coups portés à la tête et au tronc dans tous les combats";
      this.combates_text = "Lutte";
      this.victorias_text = "Victoires";
      this.nacionales_text = "National";
      this.internacionales_text = "International";
    }
  },
  data() {
    return {
      cantCombates: 0,
      cantVictorias: 0,
      cantNacionales: 0,
      cantInternacionales: 0,
      cantCabeza: 0,
      cantTronco: 0,
      efectivos: 0,
      fallados: 0,

      efectividad_text: "",
      efectivos_text: "",
      fallados_text: "",
      subtexto_efectividad: "",
      titulo_cabeza_text: "",
      golps_cabeza_text: "",
      golpes_tronco_text: "",
      subtexto_cabeza: "",
      combates_text: "",
      victorias_text: "",
      nacionales_text: "",
      internacionales_text: ""
    };
  },
  watch: {
    idioma(value) {
      if (value === "es") {
        this.efectividad_text = "Efectividad";
        this.efectivos_text = "Efectivos";
        this.fallados_text = "Fallados";
        this.subtexto_efectividad = "Cantidad de golpes efectivos y fallados en todos los combates";
        this.titulo_cabeza_text = "Golpes lanzados a la cabeza y al tronco";
        this.golps_cabeza_text = "Golpes a la cabeza";
        this.golpes_tronco_text = "Golpes al tronco";
        this.subtexto_cabeza = "Cantidad de golpes lanzados a la cabeza y al tronco en todos los combates";
        this.combates_text = "Combates";
        this.victorias_text = "Victorias";
        this.nacionales_text = "Nacionales";
        this.internacionales_text = "Internacionales";
      }
      if (value === "ru") {
        this.efectividad_text = "Эффективность";
        this.efectivos_text = "Эффективный";
        this.fallados_text = "Неуспешный";
        this.subtexto_efectividad = "Количество Эффективных и пропущенных ударов во всех боях";
        this.titulo_cabeza_text = "Удары нанесенныe по голове и туловищу";
        this.golps_cabeza_text = "удары по голове";
        this.golpes_tronco_text = "удары в багажник";
        this.subtexto_cabeza = "Количество нанесенных ударов в голову и туловище во всех боях";
        this.combates_text = "Поединки";
        this.victorias_text = "Победы";
        this.nacionales_text = "Национальныe";
        this.internacionales_text = "Международныe";
      }
      if (value === "in") {
        this.efectividad_text = "Effectiveness";
        this.efectivos_text = "Effective";
        this.fallados_text = "Failed";
        this.subtexto_efectividad = "Number of effective and missed hits in all fights";
        this.titulo_cabeza_text = "Blows to the head and trunk";
        this.golps_cabeza_text = "Blows to the head";
        this.golpes_tronco_text = "Blows to the trunk";
        this.subtexto_cabeza = "Number of blows delivered to the head and trunk in all fights";
        this.combates_text = "Fighting";
        this.victorias_text = "Victories";
        this.nacionales_text = "National";
        this.internacionales_text = "International";
      }
      if (value === "fr") {
        this.efectividad_text = "Efficacité";
        this.efectivos_text = "Efficace";
        this.fallados_text = "Échoué";
        this.subtexto_efectividad = "Nombre de coups efficaces et manqués dans tous les combats";
        this.titulo_cabeza_text = "Coups à la tête et au tronc";
        this.golps_cabeza_text = "Coups à la tête";
        this.golpes_tronco_text = "Coups dans le coffre";
        this.subtexto_cabeza = "Nombre de coups portés à la tête et au tronc dans tous les combats";
        this.combates_text = "Lutte";
        this.victorias_text = "Victoires";
        this.nacionales_text = "National";
        this.internacionales_text = "International";
      }
    }
  }
};
</script>
