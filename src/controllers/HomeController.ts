import { application } from '@/components/Application';

export class HomeController {

  public onCreated() {
    application.showMenu = true;
  }
}
