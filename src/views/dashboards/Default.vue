<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Cantidad de combates', value: cantCombates }"
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
              :title="{ text: 'Victorias', value: cantVictorias }"
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
              :title="{ text: 'Enventos nacionales', value: cantNacionales }"
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
              :title="{ text: 'Eventos internacionales', value: cantInternacionales }"
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
              <div class="card-header"><h5 class="card-title">Efectividad</h5></div>
              <div class="row">
                <div class="col-7 text-start">
                  <pie-chart
                    id="efectividad"
                    :chart="{
              labels: ['Efectivos', 'Fallados'],
              datasets: {
                label: 'Efectividad',
                data: [efectivos, fallados],
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
              <div class="card-footer"><h6 class="card-subtitle">Cantidad de golpes efectivos y cantidad de golpes
                fallados en todos los combates</h6></div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="card p-3">
              <div class="card-header"><h5 class="card-title">Golpes lanzados a la
                cabeza y al tronco</h5></div>
              <div class="row">
                <div class="col-7 text-start">
                  <pie-chart
                    id="golpes"
                    :chart="{
                    labels: ['Golpes a la cabeza', 'Golpes al tronco'],
                    datasets: {
                      label: 'Efectividad',
                      data: [cantCabeza, cantTronco],
                    },
                  }" />
                </div>
                <div class="my-auto col-5">
          <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-success"></i>
            <span class="text-bold text-dark">Golpes a la cabeza</span>
          </span>
                  <span class="badge badge-md badge-dot me-4 d-block text-start">
            <i class="bg-danger"></i>
            <span class="text-bold text-dark">Golpes al tronco</span>
          </span>
                </div>
              </div>
              <div class="card-footer"><h6 class="card-subtitle">Cantidad de golpes de golpes
                lanzados a la cabeza y al tronco en todos los combates</h6></div>
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
  mounted() {
    console.log(this.cantCabeza);
    console.log(this.cantTronco);
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
      booking1,
      booking2,
      booking3,
      US,
      DE,
      GB,
      BR
    };
  }
};
</script>
