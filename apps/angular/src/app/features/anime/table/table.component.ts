import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable } from 'rxjs';

import { AnimeService } from '../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'camp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  /** Anime list. */
  public animeList$: Observable<Pagination<Anime>>;

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
    this.animeList$ = this.animeService.getAnime();
  }

  /**
   * Format response date object to readable format.
   * @param date Date data from response object.
   */
  public formatDate(date: Date | null): string {
    if (date !== null) {
      return date.toLocaleDateString('en-GB');
    }
    return 'None';
  }
}
