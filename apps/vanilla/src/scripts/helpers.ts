import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';

import { StorageService } from '../services/storageService';

import { Token } from './constants';

export namespace Helpers {

  /**
   * Set token to storage.
   * @param token The token to set.
   */
  export function setToken(token: TokenDto): void {
    StorageService.set(Token.Access, token.access);
    StorageService.set(Token.Refresh, token.refresh);
  }

  /** Clear tokens data from storage.*/
  export function clearToken(): void {
    StorageService.remove(Token.Access);
    StorageService.remove(Token.Refresh);
  }
}
