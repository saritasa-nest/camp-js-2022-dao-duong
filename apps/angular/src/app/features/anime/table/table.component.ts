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

  /** Initial page size value. */
  public readonly pageSize = INITIAL_LIMIT;

  /** Anime length. */
  public length = INITIAL_LENGTH;

  /** Anime type value. */
  public readonly animeTypeList = Object.values(AnimeType);

  /** Anime search from control. */
  public readonly searchControl = new FormControl(INITIAL_SEARCH);

  /** Type filter form control. */
  public readonly filterTypeControl = new FormControl();

  /** Current page observer. */
  public readonly currentPage$ = new BehaviorSubject<number>(INITIAL_PAGE);

  /** Sort observer. */
  public readonly sortObservers$ = new BehaviorSubject<Sort>(INITIAL_SORT);

  /** Loading state observer. */
  public isLoading$ = new BehaviorSubject<boolean>(false);

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
    const params$ = this.currentPage$.pipe(
      combineLatestWith(
        this.searchControl.valueChanges.pipe(
          startWith(this.searchControl.value),
        ),
        this.filterTypeControl.valueChanges.pipe(
          startWith(this.filterTypeControl.value),
        ),
        this.sortObservers$,
      ),
      debounceTime(DEBOUNCE_TIME),
    );
    this.animeList$ = params$.pipe(
      switchMap(([currentPage, _search, _filter, sort]) =>
        this.animeService.fetchAnime({
          limit: this.pageSize,
          page: currentPage,
          ordering: (sort.direction === 'desc' ? '-' : '') + sort.active,
          search: this.searchControl.value,
          type: this.filterTypeControl.value ?
            this.filterTypeControl.value.toString() :
            [],
        })),
      map(animeResponse => {
        this.length = animeResponse.count;
        return animeResponse.results;
      }),
    );
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
    ).pipe(tap(() => this.currentPage$.next(INITIAL_PAGE)));

    const goToTopSideEffect$ = this.currentPage$.pipe(
      tap(() => this.goToTop()),
    );

    // Merge all side effects and subscribe.
    merge(
      resetPaginationSideEffect$,
      goToTopSideEffect$,
      setDataFromParamsSideEffect$,
    )
      .pipe(takeUntil(this.subscriptionDestroy$))
      .subscribe();
  }

  /**
   * Handle changes in paginator.
   * @param event Paginator event emission.
   */
  public handlePaginatorChange(event: PageEvent): void {
    this.currentPage$.next(event.pageIndex);
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   */
  public handleSortChange(event: Sort): void {
    this.sortObservers$.next({
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
      this.sortObservers$.next({
        active: params['ordering'].replace('-', ''),
        direction: params['ordering'].includes('-') ? 'desc' : 'asc',
      });
    }
    if (params['type']) {
      this.filterTypeControl.setValue(params['type'].split(','));
    }
    this.currentPage$.next(params['page'] || INITIAL_PAGE);
    this.searchControl.setValue(params['search'] || INITIAL_SEARCH);
  }

  /** Scroll to top of page. */
  private goToTop(): void {
    const TOP_OF_PAGE = 0;
    const SCROLL_BEHAVIOR = 'smooth';
    window.scrollTo({
      top: TOP_OF_PAGE,
      behavior: SCROLL_BEHAVIOR,
    });
  }

  /**
   * Open detail page when click on table row.
   * @param anime Anime data.
   */
  public openDetailPage(anime: Anime): void {
    this.navigateService.navigateToDetailPage(anime.id);
  }

  /** Destroy subscriptions. */
  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
    this.subscriptionDestroy$.complete();
  }
}
