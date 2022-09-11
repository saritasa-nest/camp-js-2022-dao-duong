import { AxiosRequestConfig } from 'axios';

import { TokenService } from '../services/tokenService';
import { CONFIG } from '../config';

/**
 * Intercept and add bearer authorization.
 * @param config Axios Request Config.
 */
export function tokenInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!shouldInterceptWithToken(config)) {
    return config;
  }
  const token = TokenService.getToken();
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
  const s3Url = new URL(
    'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev',
  ).toString();
  const isS3Upload = config.url?.startsWith(s3Url);
  const isAuthRequest = config.url?.startsWith(
    new URL('auth', CONFIG.apiUrl).toString(),
  );
  return !isAuthRequest && !isS3Upload;
}
