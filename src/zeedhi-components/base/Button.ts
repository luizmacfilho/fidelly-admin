import { EventFactory } from '@/zeedhi/index';
import { Events } from '@/zeedhi/event';

export interface ButtonEvent {
  component: Button;
}

export interface IButton {
  color: string;
  fab: boolean;
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

  public color: string;
  public fab: boolean;
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

  constructor(props: IButton) {
    this.color = props.color;
    this.fab = props.fab;
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
  }

  public click() {
    if (this.events.click) {
      this.events.click({ component: this });
    }
  }
}
