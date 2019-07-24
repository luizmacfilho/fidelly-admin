<template>
  <v-container>
    <component v-for="(child, index) in children"
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
}
</script>
