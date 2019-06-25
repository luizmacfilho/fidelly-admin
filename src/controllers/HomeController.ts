import { application } from '@/components/Application';
import { ButtonEvent } from '@/zeedhi-components/Button';

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

  public onBeforeMount(event: any) {
    // tslint:disable-next-line: no-console
    console.log('onBeforeMount', event);
  }

  public onMounted(event: any) {
    // tslint:disable-next-line: no-console
    console.log('onMounted', event);
  }

  public onBeforeDestroy(event: any) {
    // tslint:disable-next-line: no-console
    console.log('onBeforeDestroy', event);
  }

  public onDestroyed(event: any) {
    // tslint:disable-next-line: no-console
    console.log('onDestroyed', event);
  }
}
