<template>
  <div v-if="$store.state.user">
    <v-form ref="form">
      <v-container fluid class="store__container">
        <v-layout row wrap class="store__content">
          <v-flex xs12 sm6>
            <v-text-field
              v-model="store.name"
              maxlength="50"
              :rules="rules.required"
              :label="$t('message.storeName')"
              validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="store.phone"
              mask="(##) #####-####"
              :rules="rules.phone"
              type="tel"
              :label="$t('message.phoneNumber')"
              validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="store.category"
              validate-on-blur
              :rules="rules.required"
              :label="$t('message.category')"
              :items="categories"
              ></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              v-model="store.description"
              maxlength="150"
              :rules="rules.required"
              :label="$t('message.description')"
              validate-on-blur></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-checkbox
              color="primary"
              v-model="store.production"
              label="Exibir loja para clientes"></v-checkbox>
          </v-flex>

          <v-flex xs12 sm6>
            <v-btn :loading="loading" @click="saveStore()" class="mx-0" color="primary">{{ $t('Salvar') }} </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-container class="pt-0">
      <Awards :storeRef="storeRef" :production="store.production" :items.sync="items"></Awards>
    </v-container>
    <v-dialog
      v-model="errorDialog.show"
      width="500">
      <v-card>
        <v-card-title
          class="headline"
          primary-title
          >
          <v-icon class="pr-2" color="error">mdi-close-circle</v-icon>
          {{ errorDialog.title }}
        </v-card-title>

        <v-card-text>
          {{ errorDialog.text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="errorDialog.show = false"
          >
            Entendi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      top
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar.show = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';
import Awards from '@/components/Awards.vue';
import { db } from '@/firebase/admin';

@Component({
  components: { Awards }
})
export default class Store extends Vue {

  public application: IApplication;
  public store: any = {};
  public errorDialog: any = { show: false };
  public snackbar: any = { show: false };
  public loading: boolean = false;
  public categories: any[] = [
    'Salão/Barbearia',
    'Restaurante',
    'Outro',
  ];
  public required: any = [(value: string) => !!value || 'Campo obrigatório']
  public rules = {
    required: this.required,
    phone: this.required.concat([(value: string) => value && value.length === 11 || 'Número de telefone inválido']),
  };
  public items: any = [];
  private userId: string = '';
  private storeRef: any;

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = true;
  }

  public created() {
    this.userId = this.$store.state.user.uid;
    this.$store.commit('title', 'message.myStore');
    this.storeRef = db.collection('store').doc(this.userId);
    this.storeRef.get().then((doc: any) => {
      if (doc.exists) {
        this.store = doc.data();
      }
    });
  }

  public async saveStore() {
    if (!(this.$refs.form as any).validate()) {
      return;
    }
    if (this.items.length === 0 && this.store.production) {
      this.store.production = false;
      this.errorDialog.title = 'Operação inválida';
      this.errorDialog.text = 'Não é permitido exibir loja para os clientes sem nenhuma recompensa cadastrada.';
      this.errorDialog.show = true;
      return;
    }
    try {
      this.loading = true;
      await this.storeRef.set(this.store);
      this.snackbar.text = 'Alterações salvas com sucesso';
      this.snackbar.show = true;
    } catch(error) {
      console.error('Error writing document: ', error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
