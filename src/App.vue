<template>
  <v-app id="app">
    <Sidenav />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Sidenav from './components/Sidenav.vue';

@Component({
  components: { Sidenav },
})
export default class App extends Vue {}
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
