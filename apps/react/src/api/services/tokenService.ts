import { Token } from '@js-camp/core/models/auth/token';

import { StorageService } from './storageService';

const TOKEN_KEY = 'TOKENS';
export namespace TokenService {

  /** Get token from local storage. */
  export function getToken(): Token | null {
    return StorageService.get<Token>(TOKEN_KEY);
  }

  /**
   * Save token to local storage.
   * @param token Token received from server.
   */
  export function saveToken(token: Token): void {
    return StorageService.set(TOKEN_KEY, token);
  }

  /** Destroy token from local storage. */
  export function destroyToken(): void {
    return StorageService.remove(TOKEN_KEY);
  }

  /** Check whether the storage have token or not. */
  export function hasToken(): boolean {
    return !!getToken();
  }
}
