import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/auth/token';

import { defer, merge, Observable, ReplaySubject, tap } from 'rxjs';

import { StorageService } from './storage.service';

const TOKEN_KEY = 'TOKENS';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly tokenUpdated$ = new ReplaySubject<Token | null>(1);

  /** Token observer. */
  private readonly token$: Observable<Token | null>;

  public constructor(private readonly storageService: StorageService) {
    const tokenFromStorage$ = defer(() =>
      this.storageService.get<Token>(TOKEN_KEY));
    this.token$ = merge(tokenFromStorage$, this.tokenUpdated$);
  }

  /** Get token from local storage. */
  public getTokens(): Observable<Token | null> {
    return this.token$;
  }

  /**
   * Save token to local storage.
   * @param token Token received from server.
   */
  public saveToken(token: Token): Observable<void> {
    return defer(() => this.storageService.set(TOKEN_KEY, token)).pipe(tap(() => this.tokenUpdated$.next(token)));
  }

  /** Destroy token from local storage. */
  public destroyToken(): Observable<void> {
    return defer(() => this.storageService.remove(TOKEN_KEY)).pipe(tap(() => this.tokenUpdated$.next(null)));
  }
}
