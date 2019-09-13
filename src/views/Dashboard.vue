<template>
  <v-container class="dashboard__container" fluid>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '../components/Application';

@Component
export default class Dashboard extends Vue {

  public application!: IApplication;

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = true;
  }
}
</script>
