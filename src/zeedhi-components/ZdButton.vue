<template>
  <v-btn
    :fab="fab" :bottom="bottom"
    :right="right" :fixed="fixed">
    <v-icon>{{icon}}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class ZdButton extends Vue {

  @Prop() public name!: string;
  @Prop({ default: '' }) public label!: string;
  @Prop({ default: '' }) public icon!: string;
  @Prop({ default: false }) public fab!: boolean;
  @Prop({ default: false }) public bottom!: boolean;
  @Prop({ default: false }) public right!: boolean;
  @Prop({ default: false }) public fixed!: boolean;

}
</script>
