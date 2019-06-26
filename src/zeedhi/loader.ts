/**
 * Loader
 */
export class Loader {

  public static setControllers(controllers: { [key: string]: any }) {
    this.controllers = controllers;
  }

  public static getInstance(name: string) {
    if (!this.controllers[name]) {
      throw new Error(`Controller ${name} not found`);
    }
    this.instances[name] = new (this.controllers[name])();
    return this.instances[name];
  }

  /**
   * Loaded controllers
   */
  private static controllers: any = {};
  private static instances: any = {};
}
