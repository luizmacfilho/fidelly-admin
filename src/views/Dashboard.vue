<template>
  <v-container class="dashboard__container" fluid grid-list-lg v-if="$store.state.user">
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <v-card>
          <v-card-title>Número de Clientes</v-card-title>
          <v-card-text>
            <h1>{{totalClients}}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4>
        <v-card>
          <v-card-title>Número Selos Adquiridos</v-card-title>
          <v-card-text>
            <h1>{{totalAmount}}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4>
        <v-card>
          <v-card-title>Número Selos Utilizados</v-card-title>
          <v-card-text>
            <h1>{{totalUsed}}</h1>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- <v-flex xs12 sm9>
         <v-card>
          <v-card-title>Selos adquiridos x Selos utilizados</v-card-title>
          <v-card-text>
            <apexchart type=bar height=350 :options="chartOptions" :series="series" />
          </v-card-text>
        </v-card>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '../components/Application';
import { mobileDB, db } from '../firebase/admin';

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
  public loading = false;
  public totalClients = 0;
  public totalUsed = 0;
  public totalAmount = 0;

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = true;
  }

  public async created() {
    this.loading = true;
    this.$store.commit('title', 'message.dashboard');
    try {
      const users = await mobileDB.collection('cards').get();
      const userId = this.$store.state.user.uid;
      const storeRef = db.collection('store').doc(userId);
      const storeId = (await storeRef.get()).id;
      const cards = await mobileDB.collection('users').where(`stores.${storeId}`, '==', true).get();
      cards.docs.forEach(async (doc) => {
        const userId = doc.data().id;
        const card = await mobileDB.collection('cards').doc(userId).collection('cards').where('storeId', '==', storeId).get();
        card.docs.forEach((d) => {
          this.totalClients += 1;
          this.totalAmount += d.data().amount + d.data().used;
          this.totalUsed += d.data().used;
        });
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>
