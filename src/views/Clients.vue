<template>
  <v-container class="pa-3" fluid v-if="$store.state.user">
    <v-data-table
      v-if="!loading"
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
    <v-progress-circular v-if="loading"
        class="center"
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { db, mobileDB } from '../firebase/admin';

@Component
export default class Awards extends Vue {
  public headers: any[] = [
    { text: 'Nome', value: 'name' },
    { text: 'E-mail', value: 'email' },
    { text: 'Selos adquiridos', value: 'amount' },
    { text: 'Selos utilizados', value: 'used' },
  ];
  public items: any[] = [];
  public loading = false;

  public async created() {
    this.loading = true;
    this.$store.commit('title', 'message.clients');
    try {
      const users = await mobileDB.collection('cards').get();
      const userId = this.$store.state.user.uid;
      const storeRef = db.collection('store').doc(userId);
      const storeId = (await storeRef.get()).id;
      const cards = await mobileDB.collection('users').where(`stores.${storeId}`, '==', true).get();
      cards.docs.forEach(async (doc) => {
        const userId = doc.data().id;
        const card = await mobileDB.collection('cards').doc(userId).collection('cards').where('storeId', '==', storeId).get();
        card.docs.forEach((d) => {
          this.items.push({
            id: userId,
            name: doc.data().name,
            email: doc.data().email,
            amount: d.data().amount + d.data().used,
            amountUsed: d.data().used,
          });
        });
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  left: 50%;
  transform: translateX(-50%);
}
</style>