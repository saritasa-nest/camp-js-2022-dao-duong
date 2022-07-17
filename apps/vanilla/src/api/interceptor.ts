import { AxiosRequestConfig } from 'axios';

import { Token } from '../scripts/constants';
import { StorageService } from '../services/storageService';

/**
 * Interceptor add bearer authorization.
 * @param config Axios Request Config.
 */
export function requestInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  const accessToken = StorageService.get(Token.Access);
  if (accessToken) {
    config.headers = {
      ...config.headers,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
}
