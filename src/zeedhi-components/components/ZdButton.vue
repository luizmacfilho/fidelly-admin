<template>
  <v-btn
    @click="instance.click()"
    v-bind="{
      color: instance.color,
      fab: instance.fab,
      bottom: instance.bottom,
      right: instance.right,
      fixed: instance.fixed,
      left: instance.left,
      top: instance.top,
    }">
    <v-icon left v-if="instance.iconLeft">{{ instance.iconLeft }}</v-icon>
    {{ instance.label }}
    <v-icon right v-if="instance.iconRight">{{ instance.iconRight }}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import ZdComponent from './ZdComponent';
import { Events } from '../../zeedhi/event';
import { Prop, Component } from 'vue-property-decorator';
import { Button, IButton, ButtonEvent } from '../base/Button';

@Component
export default class ZdButton extends ZdComponent {

  @Prop({ default: () => ({}) }) public events!: Events<ButtonEvent>;
  @Prop({ default: false }) public fab!: boolean;
  @Prop({ default: false }) public bottom!: boolean;
  @Prop({ default: false }) public right!: boolean;
  @Prop({ default: false }) public fixed!: boolean;
  @Prop({ default: false }) public absolute!: boolean;
  @Prop({ default: false }) public top!: boolean;
  @Prop({ default: false }) public left!: boolean;
  @Prop({ default: '' }) public iconLeft!: string;
  @Prop({ default: '' }) public iconRight!: string;
  @Prop({ default: '' }) public label!: string;
  @Prop({ default: '' }) public color!: string;

  public instance!: Button;

  public created() {
    this.instance = new Button(this.$props as IButton);
    super.created();
  }

  public beforeMount() {
    super.beforeMount();
  }

  public mounted() {
    super.mounted();
  }

  public beforeDestroy() {
    super.beforeDestroy();
  }

  public destroyed() {
    super.destroyed();
  }
}
</script>
