import { ButtonEvent } from '@/zeedhi-components/base/Button';

export class HomeController {

  public color: string = 'secondary';

  private show: boolean = false;

  public showIcon(i: any) {
    // return this.show;
    return Math.ceil((Math.random() * i)) % 2 === 0;
  }

  public onCreatedButton({ component }: ButtonEvent) {
    // tslint:disable-next-line: no-console
    console.log('onCreated', component);
    setInterval(() => this.interval(), 500);
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

  private interval() {
    this.color = this.color === 'error' ? 'secondary' : 'error';
    this.show = !this.show;
  }
}
