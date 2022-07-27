import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  ordering: '',
  search: '',
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
  public readonly params$ = new BehaviorSubject<PaginationConfig>(DEFAULT_PAGINATION_OPTIONS);

  /** Paginator page event. */
  public pageEvent!: PageEvent;

  /** Request params. */
  public params = new HttpParams();

  /** Anime length. */
  public length = 0;

  /** Anime page size. */
  public pageSize = 10;

  /** Anime table column. */
  public displayedColumns: string[] = [
    'image',
    'title_eng',
    'title_jpn',
    'aired_start',
    'type',
    'status',
  ];

  public constructor(private animeService: AnimeService) {
    this.animeList$ = this.params$.pipe(
      switchMap(params => this.animeService.fetchAnime({ ...DEFAULT_PAGINATION_OPTIONS, ...params })),
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
    this.params$.next({
      ...DEFAULT_PAGINATION_OPTIONS,
      limit: event.pageSize,

      // TODO: Explain magic number
      page: event.pageIndex + 1,
    });
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   **/
  public handleSortChange(event: PageEvent): void {
    this.params$.next({
      ...DEFAULT_PAGINATION_OPTIONS,
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
