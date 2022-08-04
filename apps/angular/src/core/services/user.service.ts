import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos/auth/token.dto';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { map, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly loginPath = 'auth/login/';

  private readonly registerPath = 'auth/register/';

  private readonly refreshPath = 'auth/refresh/';

  public constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Handle user login.
   * @param credentials Login credentials.
   */
  public login(credentials: Login): Observable<void> {
    return this.apiService.post<TokenDto>(this.loginPath, credentials).pipe(map((response => {
      this.jwtService.saveToken(response);
      console.log(response);
    })));
  }

  /**
   * Handle user registration.
   * @param credentials Register credentials.
   */
  public register(credentials: Register): Observable<void> {
    return this.apiService.post<TokenDto>(this.registerPath, credentials).pipe(map((response => {
      this.jwtService.saveToken(response);
      console.log(response);
    })));
  }

  /** Login. */
  public logout(): void {
    this.jwtService.destroyToken();
  }
}
