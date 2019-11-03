<template>
  <div class="awards">
    <v-toolbar flat color="white" class="awards__toolbar">
      <v-toolbar-title>Recompensas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <template v-slot:activator="{ on }">
          <v-btn class="mr-0" color="primary" v-on="on" @click="item = {}; formTitle = 'Nova recompensa'">
            <v-icon>mdi-plus</v-icon> Nova recompensa
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="save" ref="form">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field :rules="required" maxlength="50" v-model="item.name" label="Nome" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field :rules="required" maxlength="150" v-model="item.description" label="Descrição" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field :rules="rules.amount" type="number" min="1" v-model.number="item.amount" label="Quantidade de selos" validate-on-blur></v-text-field>
                  </v-flex>
                  <v-btn type="submit" v-show="false"></v-btn>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outline color="primary" @click="close">Cancel</v-btn>
            <v-btn color="primary" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.amount }}</td>
        <td style="min-width: 104px;">
          <v-icon class="mr-2" @click="editItem(props.item)">
            mdi-pencil
          </v-icon>
          <v-icon @click="deleteItem(props.item)">
            mdi-delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <div class="text-xs-center">
          <span>Nenhuma recompensa cadastrada</span>
        </div>
      </template>
    </v-data-table>
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
    <v-dialog
      v-model="conditionDialog.show"
      width="500">
      <v-card>
        <v-card-title
          class="headline"
          primary-title
          >
          <v-icon class="pr-2" color="warning">mdi-help-circle</v-icon>
          {{ conditionDialog.title }}
        </v-card-title>

        <v-card-text>
          {{ conditionDialog.text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outline
            @click="conditionDialog.show = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            @click="conditionDialog.confirm()">
            Confirmar
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Awards extends Vue {
  @Prop({ required: true }) public storeRef: any;
  @Prop({ default: false }) public production: any;

  public item: any = {};
  public dialog: boolean = false;
  public snackbar: any = { show: false };
  public errorDialog: any = { show: false };
  public conditionDialog: any = { show: false };
  public formTitle: string = 'Editar recompensa';
  public headers: any[] = [
    { text: 'Nome', value: 'name' },
    { text: 'Descrição', value: 'description' },
    { text: 'Quantidade de selos', value: 'amount' },
    { text: 'Ações', value: 'actions', sortable: false },
  ];
  public items: any[] = [];
  public required: any = [(value: string) => !!value || 'Campo obrigatório'];
  public rules: any = {
    amount: this.required.concat([(value: number) => value > 0 || 'Quantidade deve ser maior que 0']),
  }
  private awardsRef: any;

  public created() {
    this.awardsRef = this.storeRef.collection('awards');
    this.awardsRef.onSnapshot((snap: any) => {
      const items: any[] = [];
      snap.forEach((doc: any) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      this.items = items;
      this.$emit('update:items', this.items);
    });
    this.awardsRef.get();
  }

  public close() {
    this.dialog = false;
    setTimeout(() => {
      this.item = {};
    }, 300);
  }

  public save() {
    if (!(this.$refs.form as any).validate()) {
      return;
    }
    let text = '';
    if (this.item.id) {
      text = 'Recompensa alterada com sucesso';
      this.awardsRef.doc(this.item.id).update(this.item);
    } else {
      text = 'Recompensa criada com sucesso';
      this.awardsRef.add(this.item);
    }
    this.showToast(text);
    this.close();
  }

  public editItem(item: any) {
    this.formTitle = 'Editar recompensa';
    this.item = { ...item };
    this.dialog = true;
  }

  public deleteItem(item: any) {
    if (this.items.length === 1 && this.production) {
      this.errorDialog.title = 'Operação inválida';
      this.errorDialog.text = 'Não é permitido excluir todas as recompensas enquanto sua loja estiver visível para os clientes.' +
      '\nPara realizar esta operação, dermarque a opção \'Exibir loja para os clientes\'.';
      this.errorDialog.show = true;
    } else {
      this.conditionDialog = {
        title: 'Confirmar exclução?',
        text: 'Ao confirmar esta operação, a recompensa será excluída permanentemente.',
        confirm: async () => {
          this.conditionDialog.show = false;
          await this.awardsRef.doc(item.id).delete();
          this.showToast('Recompensa excluída com sucesso');
        },
        show: true,
      }
    }
  }

  public showToast(text: string) {
    this.snackbar.show = false;
    setTimeout(() => {
      this.snackbar.text = text;
      this.snackbar.show = true;
    }, 200);
  }
}
</script>

<style lang="scss">
.awards {
  &__toolbar {
    .v-toolbar__content {
      padding: 0;
    }
  }
}
</style>