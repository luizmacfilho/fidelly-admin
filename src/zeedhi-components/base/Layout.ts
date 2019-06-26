import { EventFactory } from '@/zeedhi/index';
import { Events } from '@/zeedhi/event';

export interface LayoutEvent {
  component: Layout;
}

export interface ILayout {
  column: boolean;
  fillHeight: boolean;
  row: boolean;
  children: Array<{ [key: string]: any }>;
  events: Events<LayoutEvent>;
}

export class Layout implements ILayout {

  public column: boolean;
  public fillHeight: boolean;
  public row: boolean;
  public children: Array<{ [key: string]: any }>;
  public events: Events<LayoutEvent>;

  constructor(props: ILayout) {
    this.column = props.column;
    this.fillHeight = props.fillHeight;
    this.row = props.row;
    this.children = props.children;
    this.events = EventFactory.factoryEvents<LayoutEvent>(props.events);
  }
}
