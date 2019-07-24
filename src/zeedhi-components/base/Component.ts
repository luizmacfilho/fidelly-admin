import { Loader } from '@/zeedhi/loader';

export interface PropAccessor {
  [key: string]: { instance: any, accessor: string };
}

export class Component {

  public static initProps(props: any, propNames: string[]) {
    const accessors: PropAccessor = {};
    propNames.forEach((name) => this.initProp(accessors, props, name));
    return accessors;
  }

  public static initProp(accessors: PropAccessor, props: { [key: string]: any }, name: string) {
    if (typeof props[name] === 'string' && props[name].match(/^([A-Z]\w*)\.([a-z]\w*)$/)) {
      const [controller, accessor] = props[name].split('.');
      const instance = Loader.getInstance(controller);
      accessors[name] = { instance, accessor };
    } else {
      accessors[name] = { instance: props, accessor: name };
    }
  }
}
