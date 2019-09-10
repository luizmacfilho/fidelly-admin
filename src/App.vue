<template>
  <v-app id="app">
    <Sidenav v-if="$store.state.user"/>
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

@Component({
  components: { Sidenav },
})
export default class App extends Vue {}
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
</style>

<style lang="scss">
.v-messages__wrapper > .v-messages__message {
  line-height: 1;
}
</style>
