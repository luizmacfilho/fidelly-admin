import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Events } from '../../zeedhi/event';
import { PropOptions, Constructor } from 'vue/types/options';
import { createDecorator } from 'vue-class-component';

@Component
export default class ZdComponent extends Vue {

  @Prop({ default: () => ({}) }) public events!: Events<any>;
  public instanceType: any;
  public instance: any = {};

  public created() {
    this.instance = new (this.instanceType)(this.$props);
    if (this.instance.events.onCreated) {
      this.instance.events.onCreated({ component: this });
    }
  }

  public beforeMount() {
    if (this.instance.events.onBeforeMount) {
      this.instance.events.onBeforeMount({ component: this });
    }
  }

  public mounted() {
    if (this.instance.events.onMounted) {
      this.instance.events.onMounted({ component: this });
    }
  }

  public beforeDestroy() {
    if (this.instance.events.onBeforeDestroy) {
      this.instance.events.onBeforeDestroy({ component: this });
    }
  }

  public destroyed() {
    if (this.instance.events.onDestroyed) {
      this.instance.events.onDestroyed({ component: this });
    }
  }

  public isFunction(value: any) {
    return value instanceof Function;
  }
}

export function PropWatch(options: PropOptions | Constructor[] | Constructor = {}) {
  return (target: Vue, key: string) => {
    createDecorator((componentOptions, propName) => {
      (componentOptions.props || ((componentOptions.props = {}) as any))[propName] = options;

      if (typeof componentOptions.watch !== 'object') {
        componentOptions.watch = Object.create(null);
      }

      const watch: any = componentOptions.watch;

      if (typeof watch[propName] === 'object' && !Array.isArray(watch[propName])) {
        watch[propName] = [watch[propName]];
      } else if (typeof watch[propName] === 'undefined') {
        watch[propName] = [];
      }
      watch[propName].push({
        deep: false, immediate: true, handler: function handler(val: any) {
          (this as any).instance[propName] = val;
        },
      });
    })(target, key);
  };
}
