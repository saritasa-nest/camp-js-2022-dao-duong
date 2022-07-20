// Disable `require-await` to make methods async
// for better refactoring/re-usability.
/* eslint-disable require-await */
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';

import { Token } from '../scripts/constants';

export namespace StorageService {

  /**
   * Set data to localStorage.
   * @param key Key to store.
   * @param value Value to store.
   */
  export async function set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get data from localStorage.
   * @param key Store key.
   */
  export async function get<T>(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    if (value === null || value === '') {
      return null;
    }
    return await JSON.parse(value) as T;
  }

  /**
   * Remove data from localStorage.
   * @param key Store key.
   */
  export async function remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  /**
   * Set token to storage.
   * @param token The token to set.
   */
  export async function setToken(token: TokenDto): Promise<void> {
    await StorageService.set(Token.Access, token.access);
    await StorageService.set(Token.Refresh, token.refresh);
  }

  /** Clear tokens data from storage. */
  export async function clearToken(): Promise<void> {
    await StorageService.remove(Token.Access);
    await StorageService.remove(Token.Refresh);
  }
}
