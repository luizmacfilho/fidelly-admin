<template>
  <v-navigation-drawer v-if="application.showMenu" v-model="application.menuOpened" app fixed clipped>
    <v-list class="pt-2 pb-2">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { application, IApplication } from './Application';

@Component
export default class Sidenav extends Vue {

  public application: IApplication;
  public items: { icon: string; title: string, to: string }[] = [
    { icon: 'dashboard', title: (window as any).$i18n.t('message.dashboard'), to: '/dashboard' },
    { icon: 'star ', title: 'Fidelly', to: '/fidelly' },
    { icon: 'people', title: (window as any).$i18n.t('message.clients'), to: '/clients' },
    { icon: 'bar_chart', title: (window as any).$i18n.t('message.reports'), to: '/reports' },
    { icon: 'store_mall_directory', title: (window as any).$i18n.t('message.my_store'), to: '/store' },
    { icon: 'bug_report', title: (window as any).$i18n.t('message.feedback'), to: '/feedback' },
  ];

  constructor() {
    super();
    this.application = application;
  }
}
</script>
