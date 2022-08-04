import { Injectable } from '@angular/core';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { map, Observable } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginPath = 'auth/login/';

  private readonly registerPath = 'auth/register/';

  private readonly refreshPath = 'auth/refresh/';

  public constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Login.
   * @param credentials Login credentials.
   */
  public login(credentials: Login): Observable<void> {
    return this.apiService.post(this.loginPath, credentials).pipe(map((response => {
      console.log(response);
    })));
  }

  /**
   * Login.
   * @param credentials Register credentials.
   */
  public register(credentials: Register): Observable<void> {
    return this.apiService.post(this.registerPath, credentials).pipe(map((response => {
      console.log(response);
    })));
  }

  /** Login. */
  public logout(): void {
    this.jwtService.destroyToken();
  }
}
