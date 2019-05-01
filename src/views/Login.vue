<template>
  <v-form v-model="valid" class="login">
    <v-container fluid class="login__container">
      <v-layout row wrap class="login__content">
        <v-flex sm12>
          <v-text-field :label="$t('message.email')" validate-on-blur :rules="rules.email"></v-text-field>
        </v-flex>
        <v-flex sm12>
          <v-text-field type="password" :label="$t('message.password')" validate-on-blur :rules="rules.password"></v-text-field>
        </v-flex>
        <v-layout justify-space-between class="login__buttons">
          <router-link to="/password_reset" >
            <a>{{ $t("message.forgot_password") }}</a>
          </router-link>
          <v-btn color="primary">{{ $t('message.sign_in') }}</v-btn>
        </v-layout>
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
  </v-form>
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
