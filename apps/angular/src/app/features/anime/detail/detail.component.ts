import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';

import { switchMap, Observable } from 'rxjs';

import { AnimeService } from '../../../../core/services';

/** Anime detail component. */
@Component({
  selector: 'camp-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  /** Anime observer. */
  public readonly anime$: Observable<AnimeDetail>;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = this.route.params.pipe(
      switchMap(params => this.animeService.fetchAnimeById(params['id'])),
    );
  }
}
