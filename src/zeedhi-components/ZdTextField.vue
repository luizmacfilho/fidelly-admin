<template>
  <v-text-field
    :clearable="clearable"
    :label="label"
    :type="type">
  </v-text-field>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class ZdButton extends Vue {

  @Prop() public name!: string;
  @Prop({ default: '' }) public label!: string;
  @Prop({ default: 'text' }) public type!: string;
  @Prop({ default: false }) public clearable!: boolean;

}
</script>
