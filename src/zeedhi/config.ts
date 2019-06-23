export interface IConfig {
  readonly endPoint: string;
  readonly metadataEndPoint: string;
  readonly staticAppMetadata?: boolean;
  readonly componentUrl?: string;
  readonly env?: { [key: string]: any };
  readonly homeUrl: string;
  readonly mode: string;
  readonly language?: string;
  defaultLanguage?: string;
  title: string;
  dateFormat?: string;
  displayFormat?: string;
  datasourceLimit?: number;
}

/**
 * Class that exposes the app configuration
 */
export class Config {

  public static componentUrl: string;

  public static datasourceLimit: number = 10;

  public static dateFormat: string;

  public static defaultLanguage: string = 'en-US';

  public static displayFormat: string;

  public static endPoint: string;

  public static env: { [key: string]: any };

  public static homeUrl: string;

  public static language: string;

  public static metadataEndPoint: string = '/metadata/';

  public static mode: string;

  public static staticAppMetadata: boolean;

  public static title: string = 'Zeedhi';

  public static set(config: IConfig) {
    Object.assign(this, config);
  }

}
