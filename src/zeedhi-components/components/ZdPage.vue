<template>
  <component :is="page.is" v-bind="page"></component>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Metadata } from '../../zeedhi/index';

@Component
export default class ZdPage extends Vue {

  @Prop({ default: '' }) public name!: string;
  @Prop({ default: false }) public local!: boolean;

  public page: { [key: string]: any } = {};

  public async created() {
    this.page = await Metadata.parse(this.name, this.local);
    delete this.page.controller;
  }
}
</script>
