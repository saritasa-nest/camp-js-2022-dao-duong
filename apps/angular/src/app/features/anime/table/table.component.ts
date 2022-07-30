import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { Anime } from '@js-camp/core/models/anime/anime';

import { BehaviorSubject, combineLatestWith, map, Observable, switchMap, tap } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 10;

const DEFAULT_PARAMS: PaginationConfig = {
  limit: DEFAULT_LIMIT,
  page: DEFAULT_PAGE,
  ordering: '',
  search: '',
  type: '',
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

  // public readonly params$: BehaviorSubject<PaginationConfig> = new BehaviorSubject(DEFAULT_PARAMS);

  /** Param observer. */
  public readonly params$: Observable<Params> = this.route.queryParams;

  // TODO: Figure out someway to fix these declarations.
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
  public sortDirection: SortDirection = '';

  /** Anime type value. */
  public type = '';

  /** Anime type value. */
  public search = '';

  /** Anime pagination observer. */
  public pagination$ = new BehaviorSubject<PaginationConfig>(DEFAULT_PARAMS);

  /** Sort Observer. */
  public sortObservers$ = new BehaviorSubject<Sort>({
    active: '',
    direction: '',
  });

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
      tap(params => {
        this.pagination$.next({ ...DEFAULT_PARAMS, ...params });
      }),
      switchMap(params => this.animeService.fetchAnime({
        ...DEFAULT_PARAMS,
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
    this.pagination$.next({
      limit: event.pageSize,
      page: event.pageIndex,
    });
    const changedParams = {
      limit: event.pageSize,
      page: event.pageIndex,
    };
    this.router.navigate([], {
      queryParams: changedParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   **/
  public handleSortChange(event: Sort): void {
    const direction = event.direction === 'asc' ? '' : '-';
    const changedParams = {
      ordering: direction + event.active,
    };
    this.router.navigate([], {
      queryParams: changedParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Handle changes in sort.
   * @param event Type event emission.
   **/
  public handleTypeChange(event: PageEvent): void {
    const changedParams = {
      page: DEFAULT_PAGE,
      type: event.toString(),
    };
    this.router.navigate([], {
      queryParams: changedParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Handle changes in sort.
   * @param event Type event emission.
   **/
  public handleSearch(event: PageEvent): void {
    const changedParams = {
      page: DEFAULT_PAGE,
      search: event.toString(),
    };
    this.router.navigate([], {
      queryParams: changedParams,
      queryParamsHandling: 'merge',
    });
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
  // TODO: Improve this. Make it observable. THIS IS BAD CODE!!!
  public setDataForControllingComponent(params: Params): void {
    if (params['ordering']) {
      if (params['ordering'].includes('-')) {
        this.sortOption = params['ordering'].slice(1);
        this.sortDirection = 'desc';
      } else {
        this.sortOption = params['ordering'];
        this.sortDirection = 'asc';
      }
    }
    this.currentPage = params['page'] ?? DEFAULT_PAGE;
    this.pageSize = params['limit'] ?? DEFAULT_LIMIT;
    this.type = params['type'] ?? '';
    this.search = params['search'] ?? '';
  }
}
