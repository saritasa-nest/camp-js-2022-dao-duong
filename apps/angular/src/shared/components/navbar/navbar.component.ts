import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Observable, tap } from 'rxjs';

import { AuthService, NavigateService } from '../../../core/services';

/** Login component. */
@Component({
  selector: 'camp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {
  private readonly subscriptionDestroyed$: Subject<boolean> = new Subject();

  /** Check whether user authenticated or not. */
  public isAuthenticated$: Observable<boolean>;

  public constructor(
    private authService: AuthService,
    private navigateService: NavigateService,
    protected readonly router: Router,
  ) {
    this.isAuthenticated$ = this.authService.checkAuthentication();
  }

  /** Handle logout. */
  public logout(): void {
    this.authService
      .logout()
      .pipe(tap(() => this.navigateService.navigateToLogin()))
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionDestroyed$.next(true);
    this.subscriptionDestroyed$.complete();
  }
}
