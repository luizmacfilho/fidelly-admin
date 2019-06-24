<template>
  <v-icon v-bind="{
      color: props.color,
      right: props.right,
      left: props.left,
    }">
    {{props.icon}}
  </v-icon>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class ZdIcon extends Vue {

  @Prop({ default: () => ({}) }) public props!: any;

}
</script>
