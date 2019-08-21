<template>
  <div class="dashboard">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="application.toggleMenu()"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $t('message.dashboard') }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container class="dashboard__container" fluid>
      <div v-for="(item, index) in arr" :key="index">
        {{ item }}
        <template v-for="(button, i) in buttons">
          <component :key="i" :is="button.is"
            v-bind="{
              ...getPureComponent(button),
              ...getConditions(button.conditions)({ i: item }),
            }" />
        </template>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '../components/Application';
import { IButton } from '../zeedhi-components/base/Button';

@Component
export default class Dashboard extends Vue {

  public application!: IApplication;
  public arr: any[] = [];

  public buttons: any[] = [
    {
      color: 'primary',
      is: 'ZdButton',
      conditions: {
        isVisible: (row: any) => {
          return row.i % 2 === 0;
        },
        color: (row: any) => {
          return row.i % 2 === 0 ? 'primary' : 'error';
        },
      },
    },
    {
      color: 'secondary',
      is: 'ZdButton',
      conditions: {
        isVisible: (row: any) => {
          return row.i % 3 === 0;
        },
        color: (row: any) => {
          return row.i % 3 === 0 ? 'error' : 'primary';
        },
      },
    },
    {
      color: 'error',
      is: 'ZdButton',
      conditions: {
        isVisible: (row: any) => {
          return row.i % 4 === 0;
        },
        color: (row: any) => {
          return row.i % 4 === 0 ? 'primary' : 'error';
        },
      },
    },
  ];

  public mounted() {
    this.application = application;
    this.application.showMenu = true;
    this.arr = [];
    for (let i = 2; i <= 100; i++) {
      this.arr.push(Math.ceil((Math.random() * 3)) * i);
    }
    setInterval(() => {
      this.arr = [];
      for (let i = 2; i <= 100; i++) {
        this.arr.push(Math.ceil((Math.random() * 3)) * i);
      }
    }, 1000);
  }

  public getConditions(conditions: { [key: string]: (row: { [key: string]: any }) => boolean }) {
    return (row: { [key: string]: any }) => {
      const appliedConditions: { [key: string]: boolean } = {};
      Object.keys(conditions).forEach((condition) => {
        appliedConditions[condition] = conditions[condition](row);
      });
      return appliedConditions;
    };
  }

  public getPureComponent(button: any) {
    return { ...button, conditions: undefined };
  }
}
</script>
