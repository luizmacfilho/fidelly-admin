import Vue from 'vue';
import { Component as Comp, PropAccessor } from '../base/Component';
import { Component, Prop } from 'vue-property-decorator';
import { Events, EventFactory } from '../../zeedhi/event';

@Component
export default class ZdComponent extends Vue {

  @Prop({ default: () => ({}) }) public events!: Events<any>;

  public accessors: PropAccessor = {};
  public syncProps: string[] = [];
  public factoredEvents: Events<any> = {};

  public created() {
    this.accessors = Comp.initProps(this.$props, this.syncProps);
    this.factoredEvents = EventFactory.factoryEvents(this.events);
    if (this.factoredEvents.onCreated) {
      this.factoredEvents.onCreated({ component: this });
    }
  }

  public beforeMount() {
    if (this.factoredEvents.onBeforeMount) {
      this.factoredEvents.onBeforeMount({ component: this });
    }
  }

  public mounted() {
    if (this.factoredEvents.onMounted) {
      this.factoredEvents.onMounted({ component: this });
    }
  }

  public beforeDestroy() {
    if (this.factoredEvents.onBeforeDestroy) {
      this.factoredEvents.onBeforeDestroy({ component: this });
    }
  }

  public destroyed() {
    if (this.factoredEvents.onDestroyed) {
      this.factoredEvents.onDestroyed({ component: this });
    }
  }
}
