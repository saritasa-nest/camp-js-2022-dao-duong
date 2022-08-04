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
export class UserService {
  public constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
  ) {}

  public attemptAuth(type: string, credentials: Login | Register): Observable<void> {
    const path = (type === 'login' ? 'auth/login/' : 'auth/register/');
    return this.apiService.post(path, credentials).pipe(map((response => {
      console.log(response);
    })));
  }
}
