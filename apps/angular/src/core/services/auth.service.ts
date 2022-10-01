import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';
import { TokenMapper } from '@js-camp/core/mappers/auth/token.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { map, Observable, switchMap } from 'rxjs';

import { ApiConfigService } from './api-config.service';

import { JwtService } from './jwt.service';

/** Authentication api endpoint. */
enum AuthEndpoint {
  loginPath = 'auth/login/',
  registerPath = 'auth/register/',
}

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly apiConfig: ApiConfigService,
  ) {}

  /**
   * Handle login.
   * @param credentials Login credentials.
   */
  public login(credentials: Login): Observable<void> {
    return this.http
      .post<TokenDto>(`${this.apiConfig.apiUrl}${AuthEndpoint.loginPath}`, credentials)
      .pipe(
        map(response => TokenMapper.fromDto(response)),
        switchMap(tokens => this.jwtService.saveToken(tokens)),
      );
  }

  /**
   * Handle registration.
   * @param credentials Register credentials.
   */
  public register(credentials: Register): Observable<void> {
    return this.http
      .post<TokenDto>(`${this.apiConfig.apiUrl}${AuthEndpoint.registerPath}`, credentials)
      .pipe(
        map(response => TokenMapper.fromDto(response)),
        switchMap(tokens => this.jwtService.saveToken(tokens)),
      );
  }

  /** Handle Logout. */
  public logout(): Observable<void> {
    return this.jwtService.destroyToken();
  }

  /** Check whether user is authenticated or not. */
  public checkAuthentication(): Observable<boolean> {
    const token$ = this.jwtService.getTokens();
    return token$.pipe(map(tokens => tokens !== null));
  }
}
