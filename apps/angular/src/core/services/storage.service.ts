/* eslint-disable require-await */
import { Injectable } from '@angular/core';

/** Storage service. */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public constructor(
  ) {}

  /**
   * Set data to localStorage.
   * @param key Key to store.
   * @param value Value to store.
   */
  public async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get data from localStorage.
   * @param key Store key.
   */
  public async get<T>(key: string): Promise<T | null> {
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
  public async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}
