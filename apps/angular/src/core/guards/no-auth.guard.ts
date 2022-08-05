import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

import { UserService } from '../services/user.service';

/** Auth guard service. */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  public constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  /** Can activate. */
  public canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      this.router.navigate([]);
      return false;
    }
    return true;
  }
}
