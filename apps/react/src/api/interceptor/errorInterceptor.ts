import { AxiosError } from 'axios';

import { TokenService } from '../services/tokenService';

/**
 * Intercept error .
 * @param error Axios error object.
 */
export function errorInterceptor(error: AxiosError): void {
  if (error.response?.status === 401) {
    TokenService.destroyToken();
  }
}
