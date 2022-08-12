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
}
