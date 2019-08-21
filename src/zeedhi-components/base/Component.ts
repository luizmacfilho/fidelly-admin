import { Loader } from '@/zeedhi/loader';
import { Events, EventFactory } from '@/zeedhi/event';
import clonedeep from 'lodash.clonedeep';

export interface PropAccessor {
  [key: string]: { instance: any, accessor: string };
}
export class Component {

  public events: Events<any> = {};
  protected accessors: PropAccessor = {};
  protected props: any;

  constructor(props: any) {
    this.props = clonedeep(props);
  }

  public initProps() {
    Object.keys(this.props).forEach((name) => this.initProp(name));
  }

  public initProp(name: string) {
    if (typeof this.props[name] === 'string' && this.props[name].match(/^([A-Z]\w*)\.([a-z]\w*)$/)) {
      const [controller, accessor] = this.props[name].split('.');
      const instance = Loader.getInstance(controller);
      this.accessors[name] = { instance, accessor };
    } else {
      this.accessors[name] = { instance: this.props, accessor: name };
    }

    Object.defineProperty(this, name, {
      get: () => {
        return this.accessors[name].instance[this.accessors[name].accessor];
      },
      set: (value: any) => {
        this.accessors[name].instance[this.accessors[name].accessor] = value;
      },
      enumerable: true,
      configurable: true,
    });
  }
}
