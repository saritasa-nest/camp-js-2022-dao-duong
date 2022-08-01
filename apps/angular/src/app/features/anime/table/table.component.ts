import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Params } from '@angular/router';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

import { BehaviorSubject, combineLatestWith, debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 10;
const DEFAULT_SEARCH = '';
const DEFAULT_SORT: Sort = {
  active: '',
  direction: '',
};

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  /** Anime list observer. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Default page size value. */
  public readonly pageSize = DEFAULT_LIMIT;

  /** Anime length. */
  public length = 0;

  /** Anime type value. */
  public readonly animeTypeList = Object.values(AnimeType);

  /** Anime search from control. */
  public readonly searchControl = new FormControl(DEFAULT_SEARCH);

  /** Type filter form control. */
  public readonly filterTypeControl = new FormControl();

  /** Current page observer. */
  public readonly currentPage$ = new BehaviorSubject<number>(DEFAULT_PAGE);

  /** Sort observer. */
  public readonly sortObservers$ = new BehaviorSubject<Sort>(DEFAULT_SORT);

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
  ) {
    const params$ = this.currentPage$.pipe(
      combineLatestWith(
        this.searchControl.valueChanges.pipe(
          tap(() => this.currentPage$.next(DEFAULT_PAGE)),
          startWith(this.searchControl.value),
        ),
        this.filterTypeControl.valueChanges.pipe(
          tap(() => this.currentPage$.next(DEFAULT_PAGE)),
          startWith(this.filterTypeControl.value),
        ),
        this.sortObservers$,
      ),
      debounceTime(500),
    );
    this.animeList$ = params$.pipe(
      switchMap(([currentPage, search, filter, sort]) => this.animeService.fetchAnime({
        limit: DEFAULT_LIMIT,
        page: currentPage,
        ordering: ((sort.direction === 'desc' ? '-' : '') + sort.active),
        search: this.searchControl.value,
        type: this.filterTypeControl.value ? this.filterTypeControl.value.toString() : [],
      })),
      map(animeList => {
        this.length = animeList.count;
        return animeList.results;
      }),
    );
  }

  /** Set data from url params to components.*/
  public ngOnInit(): void {
    this.route.queryParams.pipe(map(params => {
      this.setDataFromParamsToComponent(params);
    })).subscribe()
      .unsubscribe();
  }

  /**
   * Handle changes in paginator.
   * @param event Paginator event emission.
   **/
  public handlePaginatorChange(event: PageEvent): void {
    this.currentPage$.next(event.pageIndex);
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   **/
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
   * Sync data from params fo controlling component.
   * @param params URL params.
   **/
  // TODO: Improve this. Make it observable. THIS IS BAD CODE!!!
  public setDataFromParamsToComponent(params: Params): void {
    if (params['ordering']) {
      this.sortObservers$.next({
        active: params['ordering'].replace('-', ''),
        direction: params['ordering'].includes('-') ? 'desc' : 'asc',
      });
    }
    this.currentPage$.next(params['page'] || DEFAULT_PAGE);
    this.searchControl.setValue(params['search'] || '');
    if (params['type']) {
      this.filterTypeControl.setValue(params['type'].split(','));
    }
  }
}
