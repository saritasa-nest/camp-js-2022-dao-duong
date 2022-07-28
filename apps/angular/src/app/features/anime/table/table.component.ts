import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { Anime } from '@js-camp/core/models/anime/anime';

import {
  BehaviorSubject,
  map,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

const DEFAULT_PAGINATION_OPTIONS: PaginationConfig = {
  limit: 10,
  page: 1,
};

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  /** Anime list observer. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** TODO. */
  public readonly params$: BehaviorSubject<PaginationConfig> = new BehaviorSubject(DEFAULT_PAGINATION_OPTIONS);

  /** Paginator page event. */
  public pageEvent!: PageEvent;

  /** Anime length. */
  public length = 0;

  /** Anime page size. */
  public pageSize = 10;

  /** Anime table current page. */
  public currentPage = 0;

  /** Anime table column. */
  public displayedColumns: string[] = [
    'image',
    'title_eng',
    'title_jpn',
    'aired_start',
    'type',
    'status',
  ];

  public constructor(
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.params$.next(this.route.snapshot.queryParams as PaginationConfig);
    this.animeList$ = this.params$.pipe(
      tap(params => {
        this.currentPage = params.page - 1;
        this.pageSize = params.limit;
      }),
      switchMap(params =>
        this.animeService.fetchAnime({
          ...DEFAULT_PAGINATION_OPTIONS,
          ...params,
        })),
      tap(pagination => {
        this.length = pagination.count;
      }),
      map(pagination => pagination.results),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /**
   * Handle changes in paginator.
   * @param event Paginator event emission.
   **/
  public handlePaginatorChange(event: PageEvent): void {
    this.router.navigate(['/'], {
      queryParams: {
        ...(this.route.snapshot.queryParams as PaginationConfig),
        limit: event.pageSize,

        /**
         * In vanilla projects, the initial page index is 1 but here the initial page index is 0.
         * So we have to plus 1 to match the calculation.
         */
        page: event.pageIndex + 1,
      },
    });
    this.params$.next({
      ...(this.route.snapshot.queryParams as PaginationConfig),
      limit: event.pageSize,

      /**
       * In vanilla projects, the initial page index is 1 but here the initial page index is 0.
       * So we have to plus 1 to match the calculation.
       */
      page: event.pageIndex + 1,
    });
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   **/
  public handleSortChange(event: PageEvent): void {
    this.router.navigate(['/'], {
      queryParams: {
        ...(this.route.snapshot.queryParams as PaginationConfig),
        ordering: event.toString(),
      },
    });
    this.params$.next({
      ...(this.route.snapshot.queryParams as PaginationConfig),
      ordering: event.toString(),
    });
  }

  /**
   * Convert response date object to readable format.
   * @param date Date data from response object.
   */
  public convertDate(date: Date | null): string {
    if (date !== null) {
      return date.toLocaleDateString('en-GB');
    }
    return 'None';
  }
}
