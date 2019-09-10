<template>
  <div class="store" v-if="$store.state.user">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="application.toggleMenu()"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $t('message.store') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form v-model="valid">
      <v-container fluid class="store__container">
        <v-layout row wrap class="store__content">
          <v-flex xs12 sm6>
            <v-text-field :label="$t('message.storeName')" validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field type="tel" :label="$t('message.cnpj')" validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field type="tel" :label="$t('message.phoneNumber')" validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field type="text" :label="$t('message.category')" validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field type="file" :label="$t('message.logo')" validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-textarea :label="$t('message.description')" validate-on-blur no-resize></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';

@Component
export default class Store extends Vue {

  public application: IApplication;
  public valid: boolean = false;

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = true;
  }
}
</script>
