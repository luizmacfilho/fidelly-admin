import { Events, EventFactory } from '@/zeedhi/event';
import { Component } from './Component';

export interface PropAccessor {
  [key: string]: { instance: any, accessor: string };
}

export interface ButtonEvent {
  component: Button;
}

export interface IButton {
  color?: string;
  fab?: boolean;
  bottom?: boolean;
  right?: boolean;
  fixed?: boolean;
  absolute?: boolean;
  isVisible?: any;
  left?: boolean;
  top?: boolean;
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  events?: Events<ButtonEvent>;
}

// tslint:disable-next-line: max-classes-per-file
export class Button extends Component implements IButton {

  public bottom: boolean = false;
  public right: boolean = false;
  public fixed: boolean = false;
  public fab: boolean = false;
  public isVisible: any = true;
  public left: boolean = false;
  public top: boolean = false;
  public absolute: boolean = false;
  public label: string = '';
  public iconLeft: string = '';
  public iconRight: string = '';
  public color: string = 'primary';
  public events!: Events<ButtonEvent>;

  constructor(props: IButton) {
    super(props);
    this.events = EventFactory.factoryEvents<any>(this.props.events);
    delete this.props.events;
    this.initProps();
  }

  public click() {
    if (this.events.click) {
      this.events.click({ component: this });
    }
  }
}
