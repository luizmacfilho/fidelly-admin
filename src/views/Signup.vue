<template>
  <v-form v-model="valid" class="signup">
    <v-container fluid class="signup__container">
      <v-layout row wrap class="signup__content">
        <v-flex xs12 sm6>
          <v-text-field :label="$t('message.first_name')" :rules="rules.name"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field :label="$t('message.last_name')" :rules="rules.name"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field type="email" :label="$t('message.email')" :rules="rules.email"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field type="password" :label="$t('message.password')" :rules="rules.password"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field type="password" :label="$t('message.confirm_password')" :rules="rules.password"></v-text-field>
        </v-flex>
        <v-flex xs12 sm4 offset-sm4 class="signup__buttons">
          <v-btn color="primary">{{ $t('message.create_account') }}</v-btn>
        </v-flex>
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
  </v-form>
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
