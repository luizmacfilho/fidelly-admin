export class HomeController {

  public color = 'secondary';

  public onCreatedButton() {
    setInterval(() => this.interval(), 1000);
  }

  public isVisible(button: any) {
    return true;
  }

  private interval() {
    this.color = this.color === 'error' ? 'secondary' : 'error';
  }
}
