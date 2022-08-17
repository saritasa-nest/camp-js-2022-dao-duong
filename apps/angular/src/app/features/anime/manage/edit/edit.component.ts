import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';

import { Observable, switchMap } from 'rxjs';

import { AnimeService } from '../../../../../core/services';

/** Edit component. */
@Component({
  selector: 'camp-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  /** Anime observer. */
  public readonly anime$: Observable<AnimeDetail>;

  public constructor(
    route: ActivatedRoute,
    private readonly animeService: AnimeService,
  ) {
    this.anime$ = route.params.pipe(
      switchMap(params => this.animeService.fetchAnimeById(params['id'])),
    );
  }
}
