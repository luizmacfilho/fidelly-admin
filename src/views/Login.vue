<template>
  <Auth v-if="!$store.state.user" @auth:submit="login($event)" :error="error" :loading="loading">
    <template v-slot:side-button>
      <router-link to="/password-reset" >
        <a>{{ $t("message.forgotPassword") }}</a>
      </router-link>
    </template>
    <div class="login__signin">
      <span class="login__signin__separator"></span>
      <span class="login__signin__text">
        {{ $t('message.signupQuestion') }}
        <router-link to="/signup" >
          <a>{{ $t("message.signupText") }}</a>
        </router-link>
      </span>
    </div>
  </Auth>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';
import firebase from 'firebase/app';
import router from '../router';
import Auth from '@/components/Auth.vue';

@Component({
  components: { Auth },
})
export default class Login extends Vue {

  public application: IApplication;
  public loading: boolean = false;
  public error: string = '';

  constructor() {
    super();
    this.application = application;
    this.application.showMenu = false;
  }

  public async login({ form, value }: any) {
    this.error = '';
    if (!form.validate()) {
      return;
    }
    this.loading = true;
    try {
      await firebase.auth().signInWithEmailAndPassword(value.email, value.password);
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
