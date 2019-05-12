/**
 * Application options interface
 */
export interface IApplication {
  showMenu: boolean;
  menuOpened: boolean;
  toggleMenu: (menuOpened?: boolean) => void;
}

/**
 * Class to control application options
 */
class Application implements IApplication {

  /**
   * Define menu visibility
   */
  public showMenu: boolean = false;

  /**
   * Define menu is opened
   */
  public menuOpened: boolean = window.innerWidth > 1264;

  /**
   * Toggles menu visibility or opens/closes menu
   * @param menuOpened Menu visibility
   */
  public toggleMenu(menuOpened?: boolean) {
    if (typeof menuOpened !== 'undefined') {
      this.menuOpened = menuOpened;
    } else {
      this.menuOpened = !this.menuOpened;
    }
  }
}

/**
 * Singleton instance of Application class
 */
export const application: Application = new Application();
