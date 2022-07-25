import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable } from 'rxjs';

import { AnimeService } from '../../core/services/anime.service';

/** Data component. */
@Component({
  selector: 'camp-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent implements OnInit {

  /** Anime list. */
  public animeList$: Observable<Pagination<Anime>>;

  /** Anime table column. */
  public displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'type', 'status'];

  public constructor(private animeService: AnimeService) {
    // const params = new HttpParams().set('ordering', '-title_eng');
    this.animeList$ = this.animeService.getAnime();
  }

  /** On init. */
  public ngOnInit(): void {
  }
}
