import { ChangeDetectionStrategy, Component } from '@angular/core';

import { UrlService, UserService } from '../../../core/services';

/** Anime component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent {
  public constructor(private userService: UserService, private urlService: UrlService) {}

  /** Handle logout. */
  public logout(): void {
    this.userService.logout();
    this.urlService.navigateToLogin();
  }
}
