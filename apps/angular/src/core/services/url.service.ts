import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class UrlService {
  public constructor(
    private readonly router: Router,
  ) {}

  /**
   * Set params to url.
   * @param params Parameter values to set.
   */
  public setUrl(params: PaginationConfig): void {
    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
