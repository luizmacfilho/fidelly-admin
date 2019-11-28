<template>
  <v-form v-model="valid" ref="form" class="login" @submit.prevent="signin()">
    <v-container fluid class="login__container">
      <v-layout row wrap class="login__content">
        <slot name="form"></slot>
        <v-flex sm12>
          <v-text-field :error-messages="error" v-model="formValue.email" type="email" :label="$t('message.email')" validate-on-blur :rules="rules.email"></v-text-field>
        </v-flex>
        <v-flex sm12>
          <v-text-field v-model="formValue.password" type="password" :label="$t('message.password')" validate-on-blur :rules="rules.password"></v-text-field>
        </v-flex>
        <v-layout justify-space-between class="login__buttons">
          <slot name="side-button"></slot>
          <v-btn type="submit" :block="block" :loading="loading" color="primary">{{ $t(label) }}</v-btn>
        </v-layout>
      </v-layout>
      <slot></slot>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

  @Prop({ default: '' }) public error!: string;
  @Prop({ default: false }) public loading!: boolean;
  @Prop({ default: 'message.signIn' }) public label!: boolean;
  @Prop({ default: false }) public block!: boolean;

  public valid: boolean = false;
  public formValue: any = {
    email: '',
    password: '',
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

  public signin() {
    this.$emit('auth:submit', { form: this.$refs.form, value: this.formValue });
  }

  public reset() {
    (this.$refs.form as any).reset();
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
}
</style>
