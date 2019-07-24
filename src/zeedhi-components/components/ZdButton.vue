<template>
  <v-btn
    ref="button"
    @click="click($event)"
    v-bind="{
      fab,
      bottom,
      right,
      fixed,
      left,
      top,
      color: syncColor(),
    }">
    <v-icon left v-if="iconLeft">{{ iconLeft }}</v-icon>
    {{ label }}
    <v-icon right v-if="iconRight">{{ iconRight }}</v-icon>
    <template v-for="i in [1, 2, 3, 4]">
      <v-icon :key="i" right v-if="syncShowIcon(i)">
        {{ iconRight }}
        </v-icon>
    </template>
  </v-btn>
</template>

<script lang="ts">
import ZdComponent from './ZdComponent';
import { Events } from '../../zeedhi/index';
import { Prop, Component, Watch } from 'vue-property-decorator';
import { Button, IButton, ButtonEvent } from '../base/Button';

@Component
export default class ZdButton extends ZdComponent {

  @Prop({ default: false }) public fab!: boolean|string;
  @Prop({ default: false }) public bottom!: boolean;
  @Prop({ default: false }) public right!: boolean;
  @Prop({ default: false }) public fixed!: boolean;
  @Prop({ default: false }) public absolute!: boolean;
  @Prop({ default: false }) public top!: boolean;
  @Prop({ default: false }) public left!: boolean;
  @Prop({ default: true }) public showIcon!: boolean|string;
  @Prop({ default: '' }) public iconLeft!: string;
  @Prop({ default: '' }) public iconRight!: string;
  @Prop({ default: '' }) public label!: string;
  @Prop({ default: '' }) public color!: string;
  @Prop({ default: () => ({}) }) public events!: Events<ButtonEvent>;

  public syncProps: string[] = ['color', 'showIcon'];

  public syncColor() {
    const accessor = this.accessors.color.instance[this.accessors.color.accessor];
    if (typeof accessor === 'function') {
      return accessor.apply(this.accessors.showIcon.instance);
    }
    return accessor;
  }

  public syncShowIcon(i: any) {
    const accessor: Function = this.accessors.showIcon.instance[this.accessors.showIcon.accessor];
    if (typeof accessor === 'function') {
      return accessor.apply(this.accessors.showIcon.instance, [i]);
    }
    return accessor;
  }

  public click(event: Event) {
    this.$emit('click', event);
  }
}
</script>
