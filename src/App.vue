<template>
  <v-app id="app">
    <Sidenav v-if="$store.state.user"/>
    <v-toolbar class="toolbar-app" color="primary" light v-if="$store.state.user" app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="application.toggleMenu()"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $t($store.state.title) }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content v-if="$store.state.initialized">
      <router-view />
    </v-content>
    <div class="overlay" v-if="!$store.state.initialized">
      <v-progress-circular
        class="overlay__progress"
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Sidenav from './components/Sidenav.vue';
import { IApplication, application } from './components/Application';

@Component({
  components: { Sidenav },
})
export default class App extends Vue {
  public application!: IApplication;

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = true;
  }
}
</script>

<style lang="scss" scoped>
.v-content[data-booted=true] {
  transition: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;

  &__progress {
    margin: auto;
  }
}

.toolbar-app.v-toolbar {
  color: white;

  button {
    color: white;
  }
}
</style>

<style lang="scss">
.v-messages__wrapper > .v-messages__message {
  line-height: 1;
}
</style>
