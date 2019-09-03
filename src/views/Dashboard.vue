<template>
  <div class="dashboard">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="application.toggleMenu()"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $t('message.dashboard') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container class="dashboard__container" fluid>
    </v-container>
  </div>
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
