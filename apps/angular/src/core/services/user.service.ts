import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { catchError, map, Observable, throwError } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

/** Authentication api endpoint. */
export enum AuthEndpoint {
  loginPath = 'auth/login/',
  registerPath = 'auth/register/',
  refreshPath = 'auth/refresh/',
}

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  public constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Handle user login.
   * @param credentials Login credentials.
   */
  public login(credentials: Login): Observable<void> {
    return this.apiService
      .post<TokenDto>(AuthEndpoint.loginPath, credentials)
      .pipe(
        map(response => {
          this.jwtService.saveToken(response);
        }),
        catchError((error: unknown) => {
          this.jwtService.destroyToken();
          return throwError(() => error);
        }),
      );
  }

  /**
   * Handle user registration.
   * @param credentials Register credentials.
   */
  public register(credentials: Register): Observable<void> {
    return this.apiService
      .post<TokenDto>(AuthEndpoint.registerPath, credentials)
      .pipe(
        map(response => {
          this.jwtService.saveToken(response);
        }),
        catchError((error: unknown) => {
          this.jwtService.destroyToken();

          return throwError(() => error);
        }),
      );
  }

  /** Login. */
  public logout(): void {
    this.jwtService.destroyToken();
  }

  /** Login. */
  public isAuthenticated(): boolean {
    if (this.jwtService.getAccessToken()) {
      return true;
    }
    return false;
  }
}
