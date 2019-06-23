/**
 * Loader
 * @todo Do it in a better way
 */
export class Loader {

  public static setControllers(controllers: { [key: string]: any }) {
    this.controllers = controllers;
  }

  public static getInstance(name: string, args: any[] = []) {
    if (!this.controllers[name]) {
      throw new Error(`Controller ${name} not found`);
    }
    if (!this.instances[name]) {
      this.createInstance(name, args);
    }
    return this.instances[name];
  }

  public static createInstance(name: string, args: any[] = []) {
    if (!this.controllers[name]) {
      throw new Error(`Controller ${name} not found`);
    }
    this.instances[name] = new (this.controllers[name])(...args);
  }

  /**
   * Loaded controllers
   */
  private static controllers: any = {};
  private static instances: any = {};
}
