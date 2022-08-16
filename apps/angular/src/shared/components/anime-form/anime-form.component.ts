import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '@js-camp/core/dtos/anime/anime.dto';
import { Source, Season, Rating } from '@js-camp/core/dtos/anime/animeDetail.dto';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { DateRange } from '@js-camp/core/models/dateRange';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

/** Date range control interface for form. */
interface DateRangeControls {

  /** Start date. */
  readonly start: FormControl<Date | null>;

  /** End date. */
  readonly end: FormControl<Date | null>;

}

/** Anime form interface. */
interface AnimeForm {

  /** Anime poster control. */
  readonly image: FormControl<string | null>;

  /** Trailer youtube id control. */
  readonly youtubeTrailerId: FormControl<string | null>;

  /** Title of English control. */
  readonly englishTitle: FormControl<string>;

  /** Title of Japanese control. */
  readonly japaneseTitle: FormControl<string>;

  /** Synopsis control. */
  readonly synopsis: FormControl<string>;

  // /** Type control. */
  // readonly type: FormControl<AnimeType | null>;

  // /** Status control. */
  // readonly status: FormControl<Status | null>;

  // /** Source control. */
  // readonly source: FormControl<Source | null>;

  // /** Season control. */
  // readonly season: FormControl<Season | null>;

  // /** Rating control. */
  // readonly rating: FormControl<Rating | null>;

  // /** Is airing. */
  // readonly isAiring: FormControl<boolean>;

  // /** Aired date range. */
  // readonly aired: FormGroup<DateRangeControls>;

  // /** Genres control. */
  // readonly genres: FormControl<readonly number[]>;

  // /** Genres search control. */
  // readonly genresSearch: FormControl<string>;

  // /** Studios control. */
  // readonly studios: FormControl<readonly number[]>;

  // /** Genres search control. */
  // readonly studiosSearch: FormControl<string>;
}

/** Login component. */
@Component({
  selector: 'camp-anime-form',
  templateUrl: './anime-form.component.html',
  styleUrls: ['./anime-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFormComponent implements OnInit {
  /** Anime form type. */
  @Input()
  public type = '';

  /** Anime data. */
  @Input()
  public animeData$: Observable<AnimeDetail> = new Observable();

  /** Anime form group. */
  public readonly animeForm: FormGroup<AnimeForm>;

  public constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.animeForm = this.initAnimeForm();
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.animeData$.pipe(
      tap(data => {
        if (data) {
          this.animeForm.patchValue(data);
        }
      }),
    ).subscribe();
  }

  private initAnimeForm(): FormGroup<AnimeForm> {
    return this.formBuilder.group({
      image: ['', [Validators.required]],
      youtubeTrailerId: [''],
      englishTitle: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required],
      }),
      japaneseTitle: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required],
      }),
      synopsis: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required],
      }),
    });
  }
}
