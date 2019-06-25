import { EventFactory } from '@/zeedhi/index';
import { Events } from '@/zeedhi/event';

export interface TextFieldEvent {
  component: TextField;
}

export interface ITextField {
  label: string;
  type: string;
  clearable: boolean;
  events: Events<TextFieldEvent>;
}

export class TextField implements ITextField {

  public label: string;
  public type: string;
  public clearable: boolean;
  public events: Events<TextFieldEvent>;

  constructor(props: ITextField) {
    this.label = props.label;
    this.type = props.type;
    this.clearable = props.clearable;
    this.events = EventFactory.factoryEvents<TextFieldEvent>(props.events);
  }
}
