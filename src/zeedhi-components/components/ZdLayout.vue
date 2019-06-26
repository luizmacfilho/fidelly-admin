<template>
  <v-layout
    v-bind="{
      row: instance.row,
      column: instance.column,
      'fill-height': instance.fillHeight,
    }">
    <component v-for="(child, index) in instance.children"
      :key="index" :is="child.is" v-bind="child">
    </component>
  </v-layout>
</template>

<script lang="ts">
import ZdComponent from './ZdComponent';
import { Prop, Component } from 'vue-property-decorator';
import { Layout, ILayout, LayoutEvent } from '../base/Layout';

@Component
export default class ZdLayout extends ZdComponent {

  @Prop({ default: false }) public column!: boolean;
  @Prop({ default: false }) public fillHeight!: boolean;
  @Prop({ default: true }) public row!: boolean;
  @Prop({ default: () => [] }) public children!: Array<{ [key: string]: any }>;

  public instance!: Layout;

  public created() {
    this.instance = new Layout(this.$props as ILayout);
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
