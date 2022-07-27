import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Anime } from '@js-camp/core/models/anime/anime';

import { map, Observable } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  /** Anime list observer. */
  public animeList$: Observable<readonly Anime[]>;

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
    this.params = this.params.set('limit', this.pageSize);
    this.animeList$ = this.getAnimeList(this.params);
  }

  /**
   * Handle changes in paginator.
   * @param event Paginator event emission.
   **/
  public handlePaginatorChange(event: PageEvent): void {
    this.params = this.params
      .set('limit', event.pageSize)
      .set('offset', event.pageIndex * event.pageSize);
    this.animeList$ = this.getAnimeList(this.params);
  }

  /**
   * Handle changes in sort.
   * @param event Sort event emission.
   **/
  public handleSortChange(event: PageEvent): void {
    this.params = this.params.set('ordering', event.toString());
    this.animeList$ = this.getAnimeList(this.params);
  }

  private getAnimeList(params?: HttpParams): Observable<readonly Anime[]> {
    return this.animeService.fetchAnime(params).pipe(
      map(pagination => {
        this.length = pagination.count;

        return pagination.results;
      }),
    );
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
