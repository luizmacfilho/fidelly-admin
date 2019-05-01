<template>
  <v-app id="app">
    <v-navigation-drawer v-if="application.showMenu" v-model="application.menuOpened" app></v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { application, IApplication } from '@/components/Application';

@Component
export default class App extends Vue {

  public application: IApplication;

  constructor() {
    super();
    this.application = application;
  }
}
</script>

<style lang="scss" scoped>
.v-content[data-booted=true] {
  transition: none;
}
</style>

<style lang="scss">
.v-messages__wrapper > .v-messages__message {
  line-height: 1;
}
</style>
