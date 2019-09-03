<template>
  <v-form v-model="valid" ref="form" class="signup" @submit.prevent="signup()">
    <v-container fluid class="signup__container">
      <v-layout row wrap class="signup__content">
        <v-flex xs12 sm6>
          <v-text-field v-model="formValue.first_name" :label="$t('message.first_name')" :rules="rules.first_name"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field v-model="formValue.last_name" :label="$t('message.last_name')" :rules="rules.last_name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="formValue.email" type="email" :label="$t('message.email')" :rules="rules.email"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field :append-icon="getPasswordIcon(passwordEyeOn)" @click:append="clickIcon(passwordEyeOn)" v-model="formValue.password" :type="getPasswordType(passwordEyeOn)" :label="$t('message.password')" :rules="rules.password"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field :append-icon="getPasswordIcon(confirmPasswordEyeOn)" @click:append="clickIcon(confirmPasswordEyeOn)" v-model="formValue.confirm_password" :type="getPasswordType(confirmPasswordEyeOn)" :label="$t('message.confirm_password')" :rules="rules.confirm_password"></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 offset-sm4 class="signup__buttons">
          <v-btn @click="signup()" :loading="loading" color="primary" type="submit">{{ $t('message.create_account') }}</v-btn>
        </v-flex>
        <div class="signup__login">
          <span class="signup__login__separator"></span>
          <span class="signup__login__text">
            {{ $t('message.login_question') }}
            <router-link to="/" >
              <a>{{ $t("message.login_text") }}</a>
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
import { auth } from 'firebase/app';

@Component
export default class SignUp extends Vue {

  public application: IApplication;
  public valid: boolean = false;
  public loading: boolean = false;
  public passwordEyeOn: boolean = false;
  public confirmPasswordEyeOn: boolean = false;
  public formValue: any = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  public rules = {
    email: [
      (value: string) => !!value || (window as any).$i18n.t('message.enter_email'),
      (value: string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value) || (window as any).$i18n.t('message.enter_valid_email');
      },
    ],
    password: [(value: string) => !!value || (window as any).$i18n.t('message.enter_password')],
    first_name: [(value: string) => !!value || (window as any).$i18n.t('message.enter_first_name')],
    last_name: [(value: string) => !!value || (window as any).$i18n.t('message.enter_last_name')],
    confirm_password: [
      (value: string) => !!value || (window as any).$i18n.t('message.enter_password'),
      (value: string) => value === this.formValue.password || (window as any).$i18n.t('message.password_not_match'),
    ],
  };

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = false;
  }

  public signup() {
    if (this.valid) {
      this.createUser();
    } else {
      const form: any = this.$refs.form;
      form.validate();
    }
  }

  public clickIcon(value: boolean) {
    this.passwordEyeOn = !this.passwordEyeOn;
  }

  public getPasswordIcon(value: boolean) {
    return value ? 'mdi-eye' : 'mdi-eye-off';
  }

  public getPasswordType(value: boolean) {
    return value ? 'text' : 'password';
  }

  private createUser() {
    this.loading = true;
    auth().createUserWithEmailAndPassword(this.formValue.email, this.formValue.password)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => { this.loading = false; });
  }
}
</script>
<style lang="scss">
.signup {
  display: flex;
  height: 100%;

  &__container.fluid {
    max-width: 600px;
  }

  &__content {
    height: 100%;
    margin: auto;
  }

  &__buttons {
    > button {
      width: 100%;
    }
  }

  &__login {
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
