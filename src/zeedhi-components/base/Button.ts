import { EventFactory } from '@/zeedhi/index';
import { Events } from '@/zeedhi/event';
import { Loader } from '@/zeedhi/loader';
import cloneDeep from 'lodash.clonedeep';

export interface PropAccessor {
  [key: string]: { instance: any, accessor: string };
}

export interface ButtonEvent {
  component: Button;
}

export interface IButton {
  color: string;
  fab: boolean|string;
  bottom: boolean;
  right: boolean;
  fixed: boolean;
  absolute: boolean;
  left: boolean;
  top: boolean;
  label: string;
  iconLeft: string;
  iconRight: string;
  events: Events<ButtonEvent>;
}

export class Button implements IButton {

  public bottom: boolean;
  public right: boolean;
  public fixed: boolean;
  public left: boolean;
  public top: boolean;
  public absolute: boolean;
  public label: string;
  public iconLeft: string;
  public iconRight: string;
  public events: Events<ButtonEvent>;

  private props: IButton;
  private accessors: PropAccessor = {};

  constructor(props: IButton) {
    this.props = cloneDeep(props);
    this.bottom = props.bottom;
    this.right = props.right;
    this.fixed = props.fixed;
    this.left = props.left;
    this.top = props.top;
    this.absolute = props.absolute;
    this.label = props.label;
    this.iconLeft = props.iconLeft;
    this.iconRight = props.iconRight;
    this.events = EventFactory.factoryEvents<ButtonEvent>(props.events);
    this.initProp(this.accessors, this.props, 'fab');
    this.initProp(this.accessors, this.props, 'color');
  }

  get fab() {
    return this.accessors.fab.instance[this.accessors.fab.accessor];
  }

  set fab(fab: boolean) {
    this.accessors.fab.instance[this.accessors.fab.accessor] = fab;
  }

  get color() {
    return this.accessors.color.instance[this.accessors.color.accessor];
  }

  set color(color: string) {
    this.accessors.color.instance[this.accessors.color.accessor] = color;
  }

  public click() {
    if (this.events.click) {
      this.events.click({ component: this });
    }
  }

  private initProp(accessors: PropAccessor, props: { [key: string]: any }, name: string) {
    if (typeof props[name] === 'string' && props[name].match(/^([A-Z]\w*)\.([a-z]\w*)$/)) {
      const [controller, accessor] = props[name].split('.');
      const instance = Loader.getInstance(controller);
      accessors[name] = { instance, accessor };
    } else {
      accessors[name] = { instance: props, accessor: name };
    }
  }
}
