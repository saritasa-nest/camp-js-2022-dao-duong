import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { map, Observable } from 'rxjs';

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
    private route: ActivatedRoute,
  ) {
    this.anime$ = this.route.params.pipe(map(params => params['id']));
  }

}
