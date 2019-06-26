import { EventFactory } from '@/zeedhi/index';
import { Events } from '@/zeedhi/event';

export interface ContainerEvent {
  component: Container;
}

export interface IContainer {
  children: Array<{ [key: string]: any }>;
  events: Events<ContainerEvent>;
}

export class Container implements IContainer {

  public children: Array<{ [key: string]: any }>;
  public events: Events<ContainerEvent>;

  constructor(props: IContainer) {
    this.children = props.children;
    this.events = EventFactory.factoryEvents<ContainerEvent>(props.events);
  }
}
