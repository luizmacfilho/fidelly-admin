<template>
  <v-text-field
    :clearable="clearable"
    :label="label"
    :type="type">
  </v-text-field>
</template>

<script lang="ts">
import ZdComponent from '../ZdComponent';
import { Prop, Component } from 'vue-property-decorator';
import { TextField, ITextField, TextFieldEvent } from '../base/TextField';

@Component
export default class ZdTextField extends ZdComponent {

  @Prop({ default: '' }) public label!: string;
  @Prop({ default: 'text' }) public type!: string;
  @Prop({ default: false }) public clearable!: boolean;

  public instance!: TextField;

  public created() {
    this.instance = new TextField(this.$props as ITextField);
    super.created();
  }

  public beforeMount() {
    super.beforeMount();
  }

  public mounted() {
    super.mounted();
  }

  public beforeDestroy() {
    super.beforeDestroy();
  }

  public destroyed() {
    super.destroyed();
  }
}
</script>
