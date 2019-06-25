<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          v-for="(child, index) in children"
          :key="index"
          :class="child.gridSize">
          <component :is="child.is" v-bind="child"></component>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class ZdForm extends Vue {

  @Prop() public name!: string;
  @Prop({ default: () => [] }) public children!: any[];

  public valid: boolean = false;


}
</script>
