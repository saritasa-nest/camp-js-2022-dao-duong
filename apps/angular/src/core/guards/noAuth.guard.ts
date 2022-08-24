import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services';

/** Auth guard service. */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  /** Can activate function for auth routes. */
  public canActivate(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map(isAuth => {
        if (isAuth) {
          this.router.navigate(['']);
        }
        return !isAuth;
      }),
    );
  }
}
