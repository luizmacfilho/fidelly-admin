import { application } from '@/components/Application';
import { ButtonEvent } from '@/zeedhi-components/base/Button';

export class HomeController {

  private cIsFab: boolean|string = false;

  get isFab() {
    return this.cIsFab;
  }

  set isFab(isFab: boolean|string) {
    this.cIsFab = isFab;
  }

  public onCreated() {
    application.showMenu = true;
  }

  public onCreatedButton({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('onCreated', component);
    component.color = 'success';
    component.iconLeft = 'close';
    component.iconRight = '';
  }

  public onBeforeMount({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('onBeforeMount', component);
  }

  public onMounted({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('onMounted', component);
    setInterval(() => {
      this.cIsFab = !this.cIsFab;
    }, 1000);
  }

  public onBeforeDestroy({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('onBeforeDestroy', component);
  }

  public onDestroyed({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('onDestroyed', component);
  }

  public click({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('clicked', component);
  }
}
