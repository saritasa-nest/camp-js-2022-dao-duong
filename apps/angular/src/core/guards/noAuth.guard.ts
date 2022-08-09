import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';

import { NavigateService, AuthService } from '../services';

/** Auth guard service. */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  public constructor(
    private readonly navigateService: NavigateService,
    private readonly authService: AuthService,
  ) {}

  /** Can activate. */
  public canActivate(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      map(isAuth => {
        if (isAuth) {
          this.navigateService.navigateToHome();
        }
        return !isAuth;
      }),
    );
  }
}
