import { application } from '@/components/Application';
import { ButtonEvent } from '@/zeedhi-components/base/Button';

export class HomeController {

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
