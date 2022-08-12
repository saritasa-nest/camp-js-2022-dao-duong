import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

/** Navigate service. */
@Injectable({
  providedIn: 'root',
})
export class NavigateService {
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

  /**
   * Set params to url.
   * @param params Parameter values to set.
   */
  public navigateToHomeWithSpecifyParams(params: PaginationConfig): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Navigate to anime detail page.
   * @param animeId Id of the anime.
   */
  public navigateToDetailPage(animeId: number): void {
    this.router.navigate(['/anime', animeId]);
  }
}
