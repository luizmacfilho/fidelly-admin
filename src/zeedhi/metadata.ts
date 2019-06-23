import { Config } from './config';
import { Loader } from './loader';
import Axios from 'axios';

/**
 * Class that parse metadata
 */
export class Metadata {

  public static async parse(name: string, isLocal: boolean) {
    let metadata: any;
    try {
      const response = await Axios.get(this.getUrl(name, isLocal), { baseURL: '' });
      metadata = response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        metadata = { name: 'notFound', widgets: [{ name: 'notFound', type: 'NotFound' }] };
      } else {
        throw error;
      }
    }
    this.load(metadata);
    return metadata;
  }

  public static getUrl(metadataId: string, forceLocal: boolean = false): string {
    return forceLocal
      ? `${location.origin}/metadata/${metadataId}.json`
      : `${Config.metadataEndPoint}${metadataId}`;
  }

  private static load(metadata: any) {
    this.loadTitle(metadata.title);
    this.loadController(metadata);
  }

  private static loadTitle(title?: string) {
    document.title = title || Config.title;
  }

  private static loadController(metadata?: any) {
    if (metadata.controller) {
      Loader.createInstance(metadata.controller, [metadata]);
    }
  }
}
