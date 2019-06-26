import Vue from 'vue';

export default class ZdComponent extends Vue {

  public instance: any = {};

  public created() {
    if (this.instance.events.onCreated) {
      this.instance.events.onCreated({ component: this.instance });
    }
  }

  public beforeMount() {
    if (this.instance.events.onBeforeMount) {
      this.instance.events.onBeforeMount({ component: this.instance });
    }
  }

  public mounted() {
    if (this.instance.events.onMounted) {
      this.instance.events.onMounted({ component: this.instance });
    }
  }

  public beforeDestroy() {
    if (this.instance.events.onBeforeDestroy) {
      this.instance.events.onBeforeDestroy({ component: this.instance });
    }
  }

  public destroyed() {
    if (this.instance.events.onDestroyed) {
      this.instance.events.onDestroyed({ component: this.instance });
    }
  }
}
