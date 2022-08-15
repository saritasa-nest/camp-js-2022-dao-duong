import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { Observable } from 'rxjs';

/** Login component. */
@Component({
  selector: 'camp-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent {
  /** Anime form type. */
  @Input()
  public type = '';

  /** Anime data. */
  @Input()
  public animeData$: Observable<AnimeDetail> = new Observable();
}
