import { Config } from './config';
import Axios from 'axios';

/**
 * Class that parse metadata
 */
export class Metadata {

  public static async parse(name: string, isLocal: boolean) {
    let metadata: { [key: string]: any };
    try {
      const response = await Axios.get(this.getUrl(name, isLocal), { baseURL: '' });
      metadata = response.data;
    } catch (error) {
      throw error;
    }
    return metadata;
  }

  public static getUrl(metadataId: string, forceLocal: boolean = false): string {
    return forceLocal
      ? `${location.origin}/metadata/${metadataId}.json`
      : `${Config.metadataEndPoint}${metadataId}`;
  }
}
