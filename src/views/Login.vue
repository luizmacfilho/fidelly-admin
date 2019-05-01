<template>
  <v-container fluid fill-height class="login">
    <v-layout justify-center align-center column class="login__content">
      <v-form v-model="valid" class="login__form">
        <v-text-field outline :label="$t('message.email')" validate-on-blur :rules="rules.email"></v-text-field>
        <v-text-field outline type="password" :label="$t('message.password')" validate-on-blur :rules="rules.password"></v-text-field>
        <v-layout justify-space-between class="login__form__buttons">
          <router-link to="/" >
            <a>{{ $t("message.forgot_password") }}</a>
          </router-link>
          <v-btn color="primary">{{ $t('message.sign_in') }}</v-btn>
        </v-layout>
      </v-form>
      <div class="login__signin">
        <span class="login__signin__separator"></span>
        <span class="login__signin__text">
          {{ $t('message.signup_question') }}
          <router-link to="/signup" >
            <a>{{ $t("message.signup_text") }}</a>
          </router-link>
        </span>
      </div>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';

@Component
export default class Login extends Vue {

  public application: IApplication;
  public valid: boolean = false;
  public rules = {
    email: [(value: string) => !!value || (window as any).$i18n.t('message.enter_email')],
    password: [(value: string) => !!value || (window as any).$i18n.t('message.enter_password')],
  };

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = false;
  }
}
</script>
<style lang="scss">
.login {
  background-color: white;
  padding: 0;

  &__content {
    height: 100%;
    max-width: 350px;
    margin: auto;
    padding: 20px;
  }

  &__form {
    width: 100%;

    &__buttons {
      margin-top: 10px;

      > a, > button {
        margin: auto 0;
      }
    }
  }

  &__signin {
    width: 100%;
    margin-top: 35px;
    text-align: center;

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
