import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';

/** Type of token. */
enum Token {
  Refresh = 'REFRESH_TOKEN',
  Access = 'ACCESS_TOKEN',
}

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class JwtService {
  /** Get access token from local storage. */
  public getAccessToken(): string | null {
    return window.localStorage.getItem(Token.Access);
  }

  /** Get refresh token from local storage. */
  public getRefreshToken(): string | null {
    return window.localStorage.getItem(Token.Refresh);
  }

  /**
   * Save token to local storage.
   * @param token Token received from server.
   */
  public saveToken(token: TokenDto): void {
    window.localStorage.setItem(Token.Access, token.access);
    window.localStorage.setItem(Token.Refresh, token.refresh);
  }

  /** Destroy token from local storage. */
  public destroyToken(): void {
    window.localStorage.removeItem(Token.Access);
    window.localStorage.removeItem(Token.Refresh);
  }
}
