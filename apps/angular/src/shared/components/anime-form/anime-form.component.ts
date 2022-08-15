import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
}
