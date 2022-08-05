import { AxiosRequestConfig } from 'axios';

import { Token } from '../scripts/constants';
import { StorageService } from '../services/storageService';

/**
 * Interceptor add bearer authorization.
 * @param config Axios Request Config.
 */
export async function requestInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const accessToken = await StorageService.get(Token.Access);
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
}
