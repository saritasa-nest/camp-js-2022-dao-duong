import { AxiosRequestConfig } from 'axios';

import { TokenService } from '../services/tokenService';
import { CONFIG } from '../config';

/**
 * Interceptor add bearer authorization.
 * @param config Axios Request Config.
 */
export function tokenInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!shouldInterceptWithToken(config)) {
    return config;
  }
  const token = TokenService.getTokens();
  if (token === null) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
}

/**
 * Check whether the request should be intercept with token or not.
 * @param config Request Config.
 *
 */
function shouldInterceptWithToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}
