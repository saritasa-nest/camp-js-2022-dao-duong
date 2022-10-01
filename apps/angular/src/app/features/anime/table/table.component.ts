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
  /** Anime list observer. */
  public readonly animeList$: Observable<Pagination<Anime>>;

  /** Anime table column. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  public constructor(private readonly animeService: AnimeService) {
    this.animeList$ = this.animeService.fetchAnime();
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

  /**
   * Table tracking function.
   * @param _index Index of the anime.
   * @param anime Anime data.
   */
  public trackAnimeById(_index: number, anime: Anime): number {
    return anime.id;
  }
}
