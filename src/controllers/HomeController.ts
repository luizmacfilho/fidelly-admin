export class HomeController {
  public onCreated({ metadata }: any) {
    metadata.children[0].fab = false;
  }
}
