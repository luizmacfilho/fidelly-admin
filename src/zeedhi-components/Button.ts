import { EventFactory } from '@/zeedhi/index';

export interface ButtonEvent {
  component: Button;
}

export interface IButton {
  color: string;
  fab: boolean;
  bottom: boolean;
  right: boolean;
  fixed: boolean;
  left: boolean;
  top: boolean;
  label: string;
  iconLeft: string;
  iconRight: string;
  events: any;
}

export class Button implements IButton {

  public color: string;
  public fab: boolean;
  public bottom: boolean;
  public right: boolean;
  public fixed: boolean;
  public left: boolean;
  public top: boolean;
  public label: string;
  public iconLeft: string;
  public iconRight: string;
  public events: any;

  constructor(props: IButton) {
    this.color = props.color;
    this.fab = props.fab;
    this.bottom = props.bottom;
    this.right = props.right;
    this.fixed = props.fixed;
    this.left = props.left;
    this.top = props.top;
    this.label = props.label;
    this.label = props.label;
    this.iconLeft = props.iconLeft;
    this.iconRight = props.iconRight;
    this.events = EventFactory.factoryEvents(props.events);
  }
}
