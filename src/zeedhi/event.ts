import { Loader } from './loader';

/**
 * Zeedhi Event
 */
export class ZdEvent {

  public static async callEventCycle(
    events: { [key: string]: (event: any) => boolean|undefined },
    before: string, after: string, eventArgs: { [key: string]: any},
    callback: ((args: any) => Promise<void>), callbackArgs?: any,
  ) {
    let prevent: boolean = false;
    if (events[before]) {
      prevent = events[before](eventArgs) === true;
    }
    if (!prevent) {
      await callback(callbackArgs);
      if (events[after]) {
        events[after](eventArgs);
      }
    }
  }
}

export interface Events<T> {
  [key: string]: (event: T) => boolean|undefined;
}

interface PreEvents<T> {
  [key: string]: string|((event: T) => boolean|undefined);
}
/**
 * Event Factory
 */
// tslint:disable-next-line: max-classes-per-file
export class EventFactory {

  public static factoryEvents<T>(events: PreEvents<T>): Events<T> {
    let controller: any;
    let eventObj: { controller: string; method: string };
    const factoredEvents: Events<T> = {};
    for (const event in events) {
      if (typeof events[event] === 'string') {
        eventObj = this.getEventObject(events[event] as string);
        controller = Loader.getInstance(eventObj.controller);
        factoredEvents[event] = this.getEventMethod(controller, eventObj.method);
      } else {
        factoredEvents[event] = (events[event] as ((event: any) => boolean|undefined));
      }
    }
    return factoredEvents;
  }

  private static getEventObject(event: string): { controller: string; method: string } {
    const [controller, method] = event.split('.');
    return { controller, method };
  }

  private static getEventMethod(controller: any, method: string) {
    if (controller[method]) {
      return controller[method].bind(controller);
    }
    return () => { throw new Error(`Method ${method} not found`); };
  }
}
