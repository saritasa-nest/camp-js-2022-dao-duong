import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

import { NavigateService, AuthService } from '../../../core/services';

/** Anime component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent implements OnDestroy {

  private readonly subscriptionDestroyed$: Subject<boolean> = new Subject();

  /** Check whether user authenticated or not. */
  public isAuthenticated$: Observable<boolean>;

  public constructor(private authService: AuthService, private navigateService: NavigateService) {
    this.isAuthenticated$ = this.authService.checkAuthentication();
  }

  /** Handle logout. */
  public logout(): void {
    this.authService.logout().pipe(
      tap(() => this.navigateService.navigateToLogin()),
    )
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionDestroyed$.next(true);
    this.subscriptionDestroyed$.complete();
  }
}
