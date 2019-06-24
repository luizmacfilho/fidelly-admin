<template>
  <v-container>
    <component
      v-for="(child, index) in page.children"
      :key="index" :is="child.is" :props="child">
    </component>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Metadata, EventFactory } from '../zeedhi/index';
@Component
export default class ZdPage extends Vue {

  @Prop({ default: '' }) public name!: string;
  @Prop({ default: false }) public local!: boolean;

  public page: any = {};

  public async created() {
    this.page = await Metadata.parse('home', true);
    this.page.events = EventFactory.factoryEvents(this.page.events || {});
    if (this.page.events.onCreated) {
      this.page.events.onCreated({ this: this, props: this.$props, el: this.$el, metadata: this.page});
    }
  }
}
</script>
