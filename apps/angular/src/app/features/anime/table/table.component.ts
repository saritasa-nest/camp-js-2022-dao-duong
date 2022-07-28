import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { Anime } from '@js-camp/core/models/anime/anime';

import { map, Observable, switchMap, tap } from 'rxjs';

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
  // public readonly params$: BehaviorSubject<PaginationConfig> = new BehaviorSubject(DEFAULT_PAGINATION_OPTIONS);

  public readonly params$: Observable<Params> = this.route.queryParams;

  /** Paginator page event. */
  public pageEvent!: PageEvent;

  /** Anime length. */
  public length = 0;

  /** Anime page size. */
  public pageSize = 10;

  /** Anime table current page. */
  public currentPage = 0;

  /** Anime table current page. */
  public sortOption = '';

  /** Anime table current page. */
  public sortDirection = '';

  /** Anime table column. */
  public displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  public constructor(
    private readonly animeService: AnimeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.animeList$ = this.params$.pipe(
      tap(params => {
        this.setDataForControllingComponent(params);
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
    );
  }

  /**
   * Handle changes in paginator.
   * @param event Paginator event emission.
   **/
  public handlePaginatorChange(event: PageEvent): void {
    const newParams = {
      limit: event.pageSize,

      /**
       * In vanilla projects, the initial page index is 1 but here the initial page index is 0.
       * So I have to plus 1 to match the calculation.
       */
      page: event.pageIndex + 1,
    };
    this.router.navigate(['/'], {
      queryParams: newParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   **/
  public handleSortChange(event: PageEvent): void {
    const newParams = {
      ordering: event.toString(),
    };
    this.router.navigate(['/'], {
      queryParams: newParams,
      queryParamsHandling: 'merge',
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

  /**
   * Table tracking function.
   * @param _index Index of the anime.
   * @param anime Anime data.
   */
  public trackAnimeById(_index: number, anime: Anime): number {
    return anime.id;
  }

  /**
   * Sync data from params fo controlling component.
   * @param params URL params.
   **/
  public setDataForControllingComponent(params: Params): void {
    if (params['ordering']) {
      if (params['ordering'].includes('-')) {
        this.sortOption = params['ordering'].slice(1);
        this.sortDirection = '-';
      } else {
        this.sortOption = params['ordering'];
      }
    }
    this.currentPage = params['page'] - 1;
    this.pageSize = params['limit'];
  }

  test(event: PageEvent): void {
    console.log(event);

  }
}
