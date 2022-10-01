import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../services';

/** Auth guard service. */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  /** Can activate function for routes thats need auth. */
  public canActivate(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/auth/login']);
        }
        return isAuth;
      }),
    );
  }
}
