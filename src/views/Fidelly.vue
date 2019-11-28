<template>
  <div>
    <v-tabs
      v-model="active"
      grow
    >
      <v-tab>
        Ganhar Selo
      </v-tab>

      <v-tab>
        Resgatar Recompensa
      </v-tab>

      <v-tabs-items v-model="active" touchless @change="reset()">
        <v-tab-item class="tab" :transition="false" :reverse-transition="false">
          <div v-if="false">
            <div class="number">
              <span>(</span>
              <span class="digit">{{ getDigit(0) }}</span>
              <span class="digit">{{ getDigit(1) }}</span>
              <span>)</span>
              <span class="digit">{{ getDigit(2) }}</span>
              <span class="digit">{{ getDigit(3) }}</span>
              <span class="digit">{{ getDigit(4) }}</span>
              <span class="digit">{{ getDigit(5) }}</span>
              <span class="digit">{{ getDigit(6) }}</span>
              <span>-</span>
              <span class="digit">{{ getDigit(7) }}</span>
              <span class="digit">{{ getDigit(8) }}</span>
              <span class="digit">{{ getDigit(9) }}</span>
              <span class="digit">{{ getDigit(10) }}</span>
            </div>

            <div class="keypad">
              <div class="pad">
                <div v-ripple class="key" @click="addDigit(7)">7</div>
                <div v-ripple class="key" @click="addDigit(8)">8</div>
                <div v-ripple class="key" @click="addDigit(9)">9</div>
              </div>
              <div class="pad">
                <div v-ripple class="key" @click="addDigit(4)">4</div>
                <div v-ripple class="key" @click="addDigit(5)">5</div>
                <div v-ripple class="key" @click="addDigit(6)">6</div>
              </div>
              <div class="pad">
                <div v-ripple class="key" @click="addDigit(1)">1</div>
                <div v-ripple class="key" @click="addDigit(2)">2</div>
                <div v-ripple class="key" @click="addDigit(3)">3</div>
              </div>
              <div class="pad">
                <div v-ripple class="key zero" @click="addDigit(0)">0</div>
                <div v-ripple class="key backspace" @click="removeDigit()">
                  <v-icon>mdi-backspace</v-icon>
                </div>
              </div>
            </div>

            <v-btn block class="stamp-btn" color="primary" :disabled="number.length < 11">
              Ganhar selo
            </v-btn>
          </div>
          <v-form ref="form" class="login" @submit.prevent="sendBadge()">
            <v-container fluid class="login__container">
              <v-layout column wrap class="login__content">
                <v-flex sm12>
                  <v-text-field type="email" :label="$t('message.email')" v-model="email" :rules="rules.email" validate-on-blur></v-text-field>
                </v-flex>
                <v-layout justify-space-between class="login__buttons">
                  <v-btn :loading="loading" type="submit" block color="primary">Ganhar selo</v-btn>
                </v-layout>
              </v-layout>
              <slot></slot>
            </v-container>
          </v-form>
        </v-tab-item>

        <v-tab-item :transition="false" :reverse-transition="false">
          <Auth @auth:submit="getAward($event)" :error="error" :loading="loading" label="Resgatar recompensa" block ref="auth">
            <template v-slot:form>
              <v-flex sm12>
                <v-select label="Escolha sua recompensa"
                  :items="awards"
                  item-value="id"
                  item-text="name"
                  validate-on-blur
                  :rules="rules.select"
                  return-object
                  v-model="selectedAward"
                  ></v-select>
              </v-flex>
            </template>
          </Auth>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Auth from '@/components/Auth.vue';
import firebase from 'firebase/app';
import { mobileDB, db, mobile } from '../firebase/admin';

@Component({
  components: { Auth },
})
export default class Fidelly extends Vue {
  public active: number = 0;
  public number: string[] = [];
  public error: string = '';
  public loading: boolean = false;
  public email: string = '';
  public snackbar: any = { show: false, text: '' };
  public awards: any = [];
  public selectedAward: any = {};
  public errorDialog: any = { show: false };
  public rules = {
    email: [
      (value: string) => !!value || (window as any).$i18n.t('message.enterEmail'),
      (value: string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value) || (window as any).$i18n.t('message.enterValidEmail');
      },
    ],
    select: [
      (value: string) => !!value || 'Selecione uma recompensa',
    ]
  };

  public async created() {
    this.$store.commit('title', 'Fidelly');
    const userId: any = this.$store.state.user.uid;
    const storeRef: any = db.collection('store').doc(userId);
    const awards: any = await storeRef.collection('awards').get();
    let remaining = -1;
    awards.forEach((doc: any) => {
      this.awards.push({
        ...doc.data(),
        id: doc.id,
      });
    });
  }

  public getDigit(position: number) {
    return this.number[position] || '';
  }

  public addDigit(digit: string) {
    if (this.number.length < 11) {
      this.number.push(digit);
    }
  }

  public removeDigit() {
    if (this.number.length) {
      this.number.pop();
    }
  }

  public reset() {
    (this.$refs.form as any).reset();
    (this.$refs.auth as any).reset();
  }

  public async sendBadge() {
    if ((this.$refs.form as any).validate()) {
      this.loading = true;
      try {
        const res = await mobile.auth().fetchSignInMethodsForEmail(this.email);
        if (res.length) {
          const userId: any = this.$store.state.user.uid;
          const storeRef: any = db.collection('store').doc(userId);
          const store: any = await storeRef.get();
          const storeId: any = store.id;
          const doc: any = await mobileDB.collection('users').doc(this.email).get();
          const cards: any = await mobileDB.collection('cards').doc(doc.data().id).collection('cards').get();
          let card: any = null;
          cards.forEach((doc: any) => {
            if (doc.data().storeId === storeId) {
              card = { id: doc.id, ...doc.data() };
            }
          });
          const awards: any = await storeRef.collection('awards').get();
          let remaining: any = -1;
          awards.forEach((doc: any) => {
            const amount: any = doc.data().amount;
            if (remaining === -1 || amount < remaining) {
              remaining = amount;
            }
          });
          if (card) {
            await mobileDB.collection('cards').doc(doc.data().id).collection('cards').doc(card.id).update({
              amount: card.amount + 1,
              name: store.data().name,
              remaining: remaining - (card.amount + 1),
            });
            await mobileDB.collection('users').doc(this.email).update({
              ['stores.'+storeId]: true,
            })
          } else {
            await mobileDB.collection('cards').doc(doc.data().id).collection('cards').add({
              storeId, remaining: remaining - 1, name: store.data().name, amount: 1,
            });
            await mobileDB.collection('users').doc(this.email).update({
              ['stores.'+storeId]: true,
            })
          }
        } else {
          await (window as any).Email.send({
            Host: 'in-v3.mailjet.com',
            Username: 'ba12349749dd12f07dcadccf75efb5ff',
            Password: '0da2829b0de0e0dc4aebed8f89eae8a3',
            To: this.email,
            From: 'contato@fidelly.com.br',
            Subject: 'Você ganhou um novo selo!',
            Body: 'Parabéns, você ganhou um novo selo. Para saber mais baixe o Fidelly e conclua o seu cadastro.\n\nhttps://drive.google.com/open?id=1Q58l6vc5GqQsc2-lkEIBd7m6K_fGnU9B',
          });
        }
        this.snackbar.text = 'Você ganhou um novo selo!';
        this.snackbar.show = true;
        this.email = '';
      } catch(error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }

  public async getAward({ form, value }: any) {
    this.error = '';
    if (!form.validate()) {
      return;
    }
    this.loading = true;
    try {
      await mobile.auth().signInWithEmailAndPassword(value.email, value.password);
      const userId: any = this.$store.state.user.uid;
      const storeRef: any = db.collection('store').doc(userId);
      const store: any = await storeRef.get();
      const storeId: any = store.id;
      const doc: any = await mobileDB.collection('users').doc(value.email).get();
      const cards: any = await mobileDB.collection('cards').doc(doc.data().id).collection('cards').get();
      let card: any = null;
      cards.forEach((doc: any) => {
        if (doc.data().storeId === storeId) {
          card = { id: doc.id, ...doc.data() };
        }
      });
      if (!card || card.amount < this.selectedAward.amount) {
        this.showErrorMessage();
        form.reset();
        return;
      }
      let remaining = -1;
      this.awards.forEach((award: any) => {
        const amount = award.amount;
        if (remaining === -1 || amount < remaining) {
          remaining = amount;
        }
      });
      card.used = (card.used || 0) + this.selectedAward.amount;
      card.amount -= this.selectedAward.amount;
      card.remaining = remaining - card.amount;
      await mobileDB.collection('cards').doc(doc.data().id).collection('cards').doc(card.id).update({
        used: card.used, amount: card.amount, remaining: card.remaining,
      });
      this.snackbar.text = 'Parabéns, você resgatou uma recompensa!';
      this.snackbar.show = true;
      form.reset();
    } catch (error) {
      this.error = 'E-mail ou senha inválidos';
    } finally {
      this.loading = false;
    }
  }

  showErrorMessage() {
    this.errorDialog.title = 'Operação inválida';
    this.errorDialog.text = 'Você não possui selos suficientes para resgatar esse recompensa.';
    this.errorDialog.show = true;
  }
}
</script>

<style lang="scss" scoped>
.tab {
  text-align: center;
  display: flex;
  justify-content: center;
}

.stamp-btn {
  margin-top: 16px;
}

.number {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 16px;

  .digit {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    min-width: 20px;
    margin: 0 2px;
    border-radius: 4px;
  }
}

.keypad {
  margin-top: 16px;

  .pad {
    display: flex;
    justify-content: center;
  }

  .key {
    font-size: 30px;
    padding: 10px;
    background: gray;
    height: 60px;
    width: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 2px;
    color: white;
    display: flex;
    cursor: pointer;
    user-select: none;
  }

  .zero {
    margin-left: 65px;
  }

  .backspace i {
    color: white;
  }
}

.login {
  display: flex;
  height: 100%;
  width: 100%;

  &__container.fluid {
    max-width: 350px;
  }

  &__content {
    height: 100%;
    margin: auto;
  }

  &__buttons {
    padding: 0 8px;

    > a, > button {
      margin: auto 0;
    }
  }
}
</style>