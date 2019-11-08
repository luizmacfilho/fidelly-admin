<template>
  <v-container class="dashboard__container" fluid grid-list-lg v-if="$store.state.user">
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-card>
          <v-card-title>Número de Clientes</v-card-title>
          <v-card-text>
            <h1>5</h1>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm9>
         <v-card>
          <v-card-title>Selos adquiridos x Selos utilizados</v-card-title>
          <v-card-text>
            <apexchart type=bar height=350 :options="chartOptions" :series="series" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '../components/Application';

@Component
export default class Dashboard extends Vue {

  public application!: IApplication;
  public series: any = [{
    name: 'Selos adquiridos',
    data: [5, 12, 20]
  }, {
    name: 'Selos utilizado',
    data: [0, 10, 13]
  }];
  public chartOptions: any = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },

    xaxis: {
      categories: ['Setembro', 'Outubro', 'Novembro'],
    },
    yaxis: {
      title: {
        text: 'Total de selos'
      }
    },
    fill: {
      opacity: 1
    },
  }

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = true;
  }

  public created() {
    this.$store.commit('title', 'message.dashboard');
  }
}
</script>
