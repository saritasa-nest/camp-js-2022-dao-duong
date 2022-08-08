import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NavigateService, UserService } from '../../../core/services';

/** Anime component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);

  /** User authentication status observer. */
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  public constructor(private userService: UserService, private navigateService: NavigateService) {
    this.isAuthenticatedSubject$.next(this.userService.isAuthenticated());
  }

  /** Handle logout. */
  public logout(): void {
    this.userService.logout();
    this.navigateService.navigateToLogin();
  }
}
