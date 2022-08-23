import { Token } from '@js-camp/core/models/auth/token';

import { StorageService } from './storageService';

const TOKEN_KEY = 'TOKENS';
export namespace TokenService {

  /** Get token from local storage. */
  export function getTokens(): Promise<Token | null> {
    return StorageService.get<Token>(TOKEN_KEY);
  }

  /**
   * Save token to local storage.
   * @param token Token received from server.
   */
  export function saveToken(token: Token): Promise<void> {
    return StorageService.set(TOKEN_KEY, token);
  }

  /** Destroy token from local storage. */
  export function destroyToken(): Promise<void> {
    return StorageService.remove(TOKEN_KEY);
  }
}
