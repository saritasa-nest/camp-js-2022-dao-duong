import { StorageService } from '../services/storageService';

import { Token } from './constants';

/** */
export function isAuthenticated(): boolean {
  return StorageService.get(Token.Access) !== null;
}
