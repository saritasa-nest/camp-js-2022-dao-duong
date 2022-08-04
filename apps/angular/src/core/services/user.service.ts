import { Injectable } from '@angular/core';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(
    private readonly apiService: ApiService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Handle user login.
   * @param credentials Login credentials.
   */
  public login(credentials: Login): Observable<void> {
    return this.authService.login(credentials);
  }

  /**
   * Handle user registration.
   * @param credentials Register credentials.
   */
  public register(credentials: Register): Observable<void> {
    return this.authService.register(credentials);
  }
}
