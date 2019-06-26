<template>
  <v-container>
    <component v-for="(child, index) in instance.children"
      :key="index" :is="child.is" v-bind="child">
    </component>
  </v-container>
</template>

<script lang="ts">
import ZdComponent from './ZdComponent';
import { Prop, Component } from 'vue-property-decorator';
import { Container, IContainer, ContainerEvent } from '../base/Container';
import { Events } from '../../zeedhi/event';

@Component
export default class ZdContainer extends ZdComponent {

  @Prop({ default: () => ({}) }) public events!: Events<ContainerEvent>;
  @Prop({ default: () => [] }) public children!: Array<{ [key: string]: any }>;

  public instance!: Container;

  public created() {
    this.instance = new Container(this.$props as IContainer);
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
