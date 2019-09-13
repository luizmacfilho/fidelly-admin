<template>
  <v-form v-if="!$store.state.user" v-model="valid" ref="form" class="login" @submit.prevent="signin()">
    <v-container fluid class="login__container">
      <v-layout row wrap class="login__content">
        <v-flex sm12>
          <v-text-field :error-messages="error" @focus="error = ''" v-model="formValue.email" type="email" :label="$t('message.email')" validate-on-blur :rules="rules.email"></v-text-field>
        </v-flex>
        <v-flex sm12>
          <v-text-field v-model="formValue.password" type="password" :label="$t('message.password')" validate-on-blur :rules="rules.password"></v-text-field>
        </v-flex>
        <v-layout justify-space-between class="login__buttons">
          <router-link to="/password-reset" >
            <a>{{ $t("message.forgotPassword") }}</a>
          </router-link>
          <v-btn type="submit" :loading="loading" color="primary" @click="signin()">{{ $t('message.signIn') }}</v-btn>
        </v-layout>
        <div class="login__signin">
          <span class="login__signin__separator"></span>
          <span class="login__signin__text">
            {{ $t('message.signupQuestion') }}
            <router-link to="/signup" >
              <a>{{ $t("message.signupText") }}</a>
            </router-link>
          </span>
        </div>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';
import firebase from 'firebase/app';
import router from '../router';

@Component
export default class Login extends Vue {

  public application: IApplication;
  public valid: boolean = false;
  public loading: boolean = false;
  public error: string = '';
  public formValue: any = {
    email: '',
    password: '',
    type: 'admin'
  };
  public rules = {
    email: [
      (value: string) => !!value || (window as any).$i18n.t('message.enterEmail'),
      (value: string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value) || (window as any).$i18n.t('message.enterValidEmail');
      },
    ],
    password: [(value: string) => !!value || (window as any).$i18n.t('message.enterPassword')],
  };

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = false;
  }

  public async signin() {
    if (!(this.$refs.form as any).validate()) {
      return;
    }
    this.loading = true;
    try {
      await firebase.auth().signInWithEmailAndPassword(this.formValue.email, this.formValue.password);
      router.push('/');
    } catch (error) {
      this.error = 'Email or password does not match';
      // console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style lang="scss">
.login {
  display: flex;
  height: 100%;

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

  &__signin {
    width: 100%;
    margin-top: 35px;
    text-align: center;
    padding: 0 8px;

    &__separator {
      width: 100%;
      height: 1px;
      display: block;
      background-color: #cacaca;
      margin-bottom: 15px;
    }
  }
}
</style>
