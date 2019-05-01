<template>
  <div class="home">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/login" flat small>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container class="home" fluid>
      HOME
      <v-btn @click="application.toggleMenu()"> menu</v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';

@Component
export default class Home extends Vue {

  public application: IApplication;

  constructor() {
    super();
    this.application = application;
  }
}
</script>
