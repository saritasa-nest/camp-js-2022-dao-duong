import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/auth/token.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { map, Observable, switchMap } from 'rxjs';

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
        map(response => TokenMapper.fromDto(response)),
        switchMap(tokens => this.jwtService.saveToken(tokens)),
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
        map(response => TokenMapper.fromDto(response)),
        switchMap(tokens => this.jwtService.saveToken(tokens)),
      );
  }

  /** Login. */
  public logout(): Observable<void> {
    return this.jwtService.destroyToken();
  }

  /** Login. */
  public isAuthenticated(): Observable<boolean> {
    const token$ = this.jwtService.getTokens();
    return token$.pipe(map(tokens => tokens !== null));
  }
}
