import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';

import { NavigateService } from '../services';

import { UserService } from '../services/user.service';

/** Auth guard service. */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  public constructor(
    private readonly navigateService: NavigateService,
    private readonly userService: UserService,
  ) {}

  /** Can activate. */
  public canActivate(): Observable<boolean> {
    return this.userService.isAuthenticated().pipe(
      map(isAuth => {
        if (isAuth) {
          this.navigateService.navigateToHome();
        }
        return !isAuth;
      }),
    );
  }
}
