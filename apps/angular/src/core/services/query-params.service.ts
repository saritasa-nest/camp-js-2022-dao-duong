import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';

/** Query params service. */
@Injectable({
  providedIn: 'root',
})

export class QueryParams {
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}


}
