import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  map,
  merge,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
  take,
  shareReplay,
} from 'rxjs';

import { AnimeService, NavigateService } from '../../../../core/services';

const INITIAL_LENGTH = 0;
const INITIAL_PAGE = 0;
const INITIAL_LIMIT = 25;
const INITIAL_SEARCH = '';
const INITIAL_SORT: Sort = {
  active: '',
  direction: '',
};
const DEBOUNCE_TIME = 700;

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  /** Subscription manager. */
  private readonly subscriptionDestroy$: Subject<boolean> = new Subject();

  /** Anime list observer. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Anime list observer. */
  public readonly params$: Observable<PaginationConfig>;

  /** Initial page size value. */
  public readonly pageSize = INITIAL_LIMIT;

  /** Anime length subject. */
  private readonly _length$ = new BehaviorSubject(INITIAL_LENGTH);

  /** Anime length observer. */
  public readonly length$ = this._length$.asObservable();

  /** Anime type value. */
  public readonly animeTypeList: readonly AnimeType[] = [
    AnimeType.TV,
    AnimeType.Movie,
    AnimeType.Music,
    AnimeType.ONA,
    AnimeType.OVA,
    AnimeType.Special,
  ];

  /** Anime search from control. */
  public readonly searchControl = new FormControl(INITIAL_SEARCH);

  /** Type filter form control. */
  public readonly filterTypeControl = new FormControl();

  /** Current page subject. */
  private readonly _currentPage$ = new BehaviorSubject<number>(INITIAL_PAGE);

  /** Current page observer. */
  public readonly currentPage$ = this._currentPage$.asObservable();

  /** Sort subject. */
  private readonly _sort$ = new BehaviorSubject<Sort>(INITIAL_SORT);

  /** Sort observer. */
  public readonly sort$ = this._sort$.asObservable();

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
    private readonly navigateService: NavigateService,
  ) {
    this.params$ = this.currentPage$.pipe(
      combineLatestWith(
        this.searchControl.valueChanges.pipe(
          startWith(this.searchControl.value),
        ),
        this.filterTypeControl.valueChanges.pipe(
          startWith(this.filterTypeControl.value),
        ),
        this._sort$,
      ),
      debounceTime(DEBOUNCE_TIME),
      map(([currentPage, _search, _filter, sort]) => {
        const params = {
          limit: this.pageSize,
          page: currentPage,
          ordering: (sort.direction === 'desc' ? '-' : '') + sort.active,
          search: this.searchControl.value,
          type: this.filterTypeControl.value ?
            this.filterTypeControl.value.toString() :
            [],
        };
        return params;
      }),
    );
    const animePage$ = this.params$.pipe(
      switchMap(params => this.animeService.fetchAnime(params)),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );

    this.animeList$ = animePage$.pipe(map(({ results }) => results));
    this.length$ = animePage$.pipe(map(({ count }) => count));
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    // Declare side effects
    const setDataFromParamsSideEffect$ = this.route.queryParams.pipe(
      map(params => {
        this.setDataFromParamsToComponent(params);
      }),
      take(1),
    );

    const resetPaginationSideEffect$ = merge(
      this.searchControl.valueChanges,
      this.filterTypeControl.valueChanges,
    ).pipe(tap(() => this._currentPage$.next(INITIAL_PAGE)));

    const goToTopOfPageSideEffect$ = this._currentPage$.pipe(
      tap(() => this.goToTopOfPage()),
    );

    const navigateSideEffect$ = this.params$.pipe(
      tap(params => this.navigateService.navigateToHomeWithSpecifyParams(params)),
    );

    // Merge all side effects and subscribe.
    merge(
      resetPaginationSideEffect$,
      goToTopOfPageSideEffect$,
      setDataFromParamsSideEffect$,
      navigateSideEffect$,
    )
      .pipe(takeUntil(this.subscriptionDestroy$))
      .subscribe();
  }

  /**
   * Handle changes in paginator.
   * @param event Paginator event emission.
   */
  public onPaginatorChange(event: PageEvent): void {
    this._currentPage$.next(event.pageIndex);
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   */
  public onSortChange(event: Sort): void {
    this._sort$.next({
      active: event.direction === '' ? '' : event.active,
      direction: event.direction,
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
   * Sync data from params to components.
   * @param params Params value from URL.
   */
  private setDataFromParamsToComponent(params: Params): void {
    if (params['ordering']) {
      this._sort$.next({
        active: params['ordering'].replace('-', ''),
        direction: params['ordering'].includes('-') ? 'desc' : 'asc',
      });
    }
    if (params['type']) {
      this.filterTypeControl.setValue(params['type'].split(','));
    }
    this._currentPage$.next(params['page'] || INITIAL_PAGE);
    this.searchControl.setValue(params['search'] || '');
  }

  /** Scroll to top of page. */
  private goToTopOfPage(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
    this.subscriptionDestroy$.complete();
  }
}
