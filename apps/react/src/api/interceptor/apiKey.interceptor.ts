import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';

/**
 * Interceptor add api key.
 * @param config Axios Request Config.
 */
export function apiKeyInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  config.headers = {
    ...config.headers,
    'Api-Key': CONFIG.apiKey,
  };
  return config;
}
