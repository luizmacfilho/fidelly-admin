<template>
  <v-btn
    v-if="instance.isVisible"
    ref="button"
    @click="click($event)"
    v-bind="{
      fab: instance.fab,
      bottom: instance.bottom,
      right: instance.right,
      fixed: instance.fixed,
      left: instance.left,
      top: instance.top,
      color: instance.color,
    }">
    {{ instance.label }}
  </v-btn>
</template>

<script lang="ts">
import ZdComponent, { PropWatch } from './ZdComponent';
import { Events } from '../../zeedhi/index';
import { Prop, Component } from 'vue-property-decorator';
import { Button, ButtonEvent } from '../base/Button';

@Component
export default class ZdButton extends ZdComponent {

  @PropWatch({ default: false }) public fab!: boolean|string;
  @PropWatch({ default: false }) public bottom!: boolean;
  @PropWatch({ default: false }) public right!: boolean;
  @PropWatch({ default: false }) public fixed!: boolean;
  @PropWatch({ default: false }) public absolute!: boolean;
  @PropWatch({ default: false }) public top!: boolean;
  @PropWatch({ default: false }) public left!: boolean;
  @PropWatch({ default: true }) public showIcon!: boolean|string;
  @PropWatch({ default: true }) public isVisible!: boolean|string;
  @PropWatch({ default: '' }) public iconLeft!: string;
  @PropWatch({ default: '' }) public iconRight!: string;
  @PropWatch({ default: '' }) public label!: string;
  @PropWatch({ default: '' }) public color!: string;
  @Prop({ default: () => ({}) }) public events!: Events<ButtonEvent>;

  public instanceType: typeof Button = Button;
  public instance!: Button;

  public click(event: Event) {
    this.$emit('click', event);
  }
}
</script>
