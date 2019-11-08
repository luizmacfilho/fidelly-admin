<template>
  <v-container class="pa-3" fluid v-if="$store.state.user">
    <v-data-table
      :headers="headers"
      :items="items">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.amount }}</td>
        <td>{{ props.item.amountUsed }}</td>
      </template>
      <template v-slot:no-data>
        <div class="text-xs-center">
          <span>Nenhum cliente encontrado</span>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Awards extends Vue {
  public headers: any[] = [
    { text: 'Nome', value: 'name' },
    { text: 'E-mail', value: 'email' },
    { text: 'Selos adquiridos', value: 'amount' },
    { text: 'Selos utilizados', value: 'amountUsed' },
  ];
  public items: any[] = [
    {
      id: '1',
      name: 'Luiz Filho',
      email: 'luiz.macfilho@gmail.com',
      amount: 7,
      amountUsed: 4
    },
    {
      id: '2',
      name: 'Gustavo Otto',
      email: 'gugaotto@gmail.com',
      amount: 10,
      amountUsed: 9
    },
    {
      id: '3',
      name: 'Isabella Cerbino',
      email: 'bellacerbino@gmail.com',
      amount: 2,
      amountUsed: 0
    },
    {
      id: '4',
      name: 'Felipe Peron',
      email: 'feliperon@gmail.com',
      amount: 6,
      amountUsed: 0
    },
    {
      id: '5',
      name: 'Renan Cossenzo',
      email: 'renan.cossenzo@gmail.com',
      amount: 12,
      amountUsed: 10
    }
  ];

  public created() {
    this.$store.commit('title', 'message.clients');
  }
}
</script>
