import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class UrlService {
  public constructor(
    private readonly router: Router,
  ) {}

  /** Navigate to homepage. */
  public navigateToHome(): void {
    this.router.navigate(['']);
  }

  /** Navigate to login page. */
  public navigateToLogin(): void {
    this.router.navigate(['auth/login']);
  }
}
