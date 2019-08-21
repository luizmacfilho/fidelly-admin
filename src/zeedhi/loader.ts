/**
 * Loader
 */
export class Loader {

  /**
   * Loaded controllers
   */
  private static controllers: any = {};
  private static instances: any = {};

  // tslint:disable-next-line: member-ordering
  public static setControllers(controllers: { [key: string]: any }) {
    this.controllers = controllers;
  }

  // tslint:disable-next-line: member-ordering
  public static getInstance(name: string) {
    const controller = this.controllers[name];
    if (!controller) {
      throw new Error(`Controller ${name} not found`);
    }
    if (!this.instances[name]) {
      this.instances[name] = new (controller)();
    }
    return this.instances[name];
  }

  // tslint:disable-next-line: member-ordering
  public static clearInstances() {
    this.instances = {};
  }
}
