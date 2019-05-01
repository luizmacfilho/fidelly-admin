<template>
  <v-container fluid fill-height class="signup">
    <v-layout justify-center align-center column class="signup__content">
      <v-form v-model="valid" class="signup__form">
        <v-text-field outline :label="$t('message.first_name')" validate-on-blur :rules="rules.name"></v-text-field>
        <v-text-field outline :label="$t('message.last_name')" validate-on-blur :rules="rules.name"></v-text-field>
        <v-text-field outline type="email" :label="$t('message.email')" validate-on-blur :rules="rules.email"></v-text-field>
        <v-text-field outline type="password" :label="$t('message.password')" validate-on-blur :rules="rules.password"></v-text-field>
        <v-text-field outline type="password" :label="$t('message.confirm_password')" validate-on-blur :rules="rules.password"></v-text-field>
        <v-layout justify-space-between class="signup__form__buttons">
          <v-spacer></v-spacer>
          <v-btn color="primary">{{ $t('message.create_account') }}</v-btn>
        </v-layout>
      </v-form>
      <div class="signup__login">
        <span class="signup__login__separator"></span>
        <span class="signup__login__text">
          {{ $t('message.login_question') }}
          <router-link to="/login" >
            <a>{{ $t("message.login_text") }}</a>
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
export default class SignUp extends Vue {

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
.signup {
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

  &__login {
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
