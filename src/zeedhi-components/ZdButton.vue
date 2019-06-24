<template>
  <v-btn
    v-bind="{
      color: props.color,
      fab: props.fab,
      bottom: props.bottom,
      right: props.right,
      fixed: props.fixed,
      left: props.left,
      top: props.top,
    }">
    <v-icon left v-if="props.iconLeft">{{ props.iconLeft }}</v-icon>
    {{ props.label }}
    <v-icon right v-if="props.iconRight">{{ props.iconRight }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class ZdButton extends Vue {

  @Prop({ default: () => ({}) }) public props!: any;

  created() {
    this.props.validate = () => {console.log('validate')}
  }

}
</script>
