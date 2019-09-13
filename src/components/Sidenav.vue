<template>
  <v-navigation-drawer v-if="application.showMenu" v-model="application.menuOpened" app clipped>
    <v-list class="pt-2 pb-2">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        @click="item.click && item.click()"
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
    { icon: 'mdi-view-dashboard', title: (window as any).$i18n.t('message.dashboard'), to: '/' },
    { icon: 'mdi-star ', title: 'Fidelly', to: '/fidelly' },
    { icon: 'mdi-account-group', title: (window as any).$i18n.t('message.clients'), to: '/clients' },
    { icon: 'mdi-chart-bar', title: (window as any).$i18n.t('message.reports'), to: '/reports' },
    { icon: 'mdi-store', title: (window as any).$i18n.t('message.myStore'), to: '/store' },
    { icon: 'mdi-bug', title: (window as any).$i18n.t('message.feedback'), to: '/feedback' },
    { icon: 'mdi-logout', title: (window as any).$i18n.t('message.logout'), click: () => this.singOut() },
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
    router.push('/login');
  }

  private updateMenuOpened() {
    this.application.menuOpened = window.innerWidth > 1264;
  }
}
</script>
