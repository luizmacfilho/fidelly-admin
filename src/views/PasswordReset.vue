<template>
  <v-form v-model="valid" class="password-reset">
    <v-container fluid class="password-reset__container">
      <v-layout row wrap class="password-reset__content">
        <span class="password-reset__message">{{ $t('message.password_reset_message')}}</span>
        <v-flex xs12 sm12>
          <v-text-field :label="$t('message.email')" validate-on-blur :rules="rules.email"></v-text-field>
        </v-flex>
        <v-layout justify-space-between class="password-reset__buttons">
          <v-spacer />
          <v-btn color="primary">{{ $t('message.send_email') }}</v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { application, IApplication } from '@/components/Application';

@Component
export default class PasswordReset extends Vue {

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
.password-reset {
  display: flex;
  height: 100%;

  &__container.fluid {
    max-width: 350px;
  }

  &__content {
    height: 100%;
    margin: auto;
  }

  &__message {
    padding: 0 8px;
    font-weight: 500;
  }

  &__buttons {
    padding: 0 8px;

    > a, > button {
      margin: auto 0;
    }
  }
}
</style>
