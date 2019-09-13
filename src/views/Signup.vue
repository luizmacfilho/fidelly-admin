<template>
  <v-form v-model="valid" ref="form" class="signup" @submit.prevent="signup()">
    <v-container fluid class="signup__container">
      <v-layout row wrap class="signup__content">
        <v-flex xs12 sm6>
          <v-text-field v-model="formValue.firstName" :label="$t('message.firstName')" :rules="rules.firstName"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field v-model="formValue.lastName" :label="$t('message.lastName')" :rules="rules.lastName"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field v-model="formValue.email" type="email" :label="$t('message.email')" :rules="rules.email" @focus="emailError = ''" :error-messages="emailError"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field :append-icon="getPasswordIcon(passwordEyeOn)" @click:append="passwordEyeOn = !passwordEyeOn" v-model="formValue.password" :type="getPasswordType(passwordEyeOn)" :label="$t('message.password')" :rules="rules.password"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field :append-icon="getPasswordIcon(confirmPasswordEyeOn)" @click:append="confirmPasswordEyeOn = !confirmPasswordEyeOn" v-model="formValue.confirm_password" :type="getPasswordType(confirmPasswordEyeOn)" :label="$t('message.confirmPassword')" :rules="rules.confirm_password"></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 offset-sm4 class="signup__buttons">
          <v-btn @click="signup()" :loading="loading" color="primary" type="submit">{{ $t('message.createAccount') }}</v-btn>
        </v-flex>
        <div class="signup__login">
          <span class="signup__login__separator"></span>
          <span class="signup__login__text">
            {{ $t('message.loginQuestion') }}
            <router-link to="/" >
              <a>{{ $t("message.loginText") }}</a>
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
import * as firebase from 'firebase/app';
import router from '../router';

@Component
export default class SignUp extends Vue {

  public application: IApplication;
  public valid: boolean = false;
  public loading: boolean = false;
  public passwordEyeOn: boolean = false;
  public confirmPasswordEyeOn: boolean = false;
  public formValue: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  public emailError: string = '';
  public rules = {
    email: [
      (value: string) => !!value || (window as any).$i18n.t('message.enterEmail'),
      (value: string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value) || (window as any).$i18n.t('message.enterValidEmail');
      },
    ],
    password: [
      (value: string) => !!value || (window as any).$i18n.t('message.enterPassword'),
      (value: string) => value.length > 5 || (window as any).$i18n.t('message.passwordMinLength'),
    ],
    firstName: [(value: string) => !!value || (window as any).$i18n.t('message.enterFirstName')],
    lastName: [(value: string) => !!value || (window as any).$i18n.t('message.enterLastName')],
    confirm_password: [
      (value: string) => !!value || (window as any).$i18n.t('message.enterPassword'),
      (value: string) => value.length > 5 || (window as any).$i18n.t('message.passwordMinLength'),
      (value: string) => value === this.formValue.password || (window as any).$i18n.t('message.passwordNotMatch'),
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

  private async createUser() {
    this.loading = true;
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    try {
      const response = await firebase.auth()
        .createUserWithEmailAndPassword(this.formValue.email, this.formValue.password);
      const user = firebase.auth().currentUser as firebase.User;
      user.updateProfile({
        displayName: `${this.formValue.firstName} ${this.formValue.lastName}`,
      });
      router.replace('/');
    } catch (error) {
      this.emailError = error.code === 'auth/email-already-in-use'
          ? (window as any).$i18n.t('message.emailInUse')
          : error.message;
    } finally {
      this.loading = false;
    }
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
