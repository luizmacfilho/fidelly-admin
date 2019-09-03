<template>
  <v-navigation-drawer v-if="application.showMenu" v-model="application.menuOpened" app fixed clipped>
    <v-list class="pt-2 pb-2">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        @click="item.click()"
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
import firebase from 'firebase/app';
import router from '../router';

@Component
export default class Sidenav extends Vue {

  public application: IApplication;
  public items: Array<{ icon: string; title: string, to?: string, click?: () => void }> = [
    { icon: 'dashboard', title: (window as any).$i18n.t('message.dashboard'), to: '/dashboard' },
    { icon: 'star ', title: 'Fidelly', to: '/fidelly' },
    { icon: 'people', title: (window as any).$i18n.t('message.clients'), to: '/clients' },
    { icon: 'bar_chart', title: (window as any).$i18n.t('message.reports'), to: '/reports' },
    { icon: 'store_mall_directory', title: (window as any).$i18n.t('message.myStore'), to: '/store' },
    { icon: 'bug_report', title: (window as any).$i18n.t('message.feedback'), to: '/feedback' },
    { icon: 'logout', title: (window as any).$i18n.t('message.logout'), click: () => this.singOut() },
  ];

  constructor() {
    super();
    this.application = application;
  }

  public mounted() {
    this.updateMenuOpened();
  }

  private async singOut() {
    await firebase.auth().signOut();
    this.updateMenuOpened();
    router.push('/');
  }

  private updateMenuOpened() {
    this.application.menuOpened = window.innerWidth > 1264;
  }
}
</script>
