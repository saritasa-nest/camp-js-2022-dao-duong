import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Status } from '@js-camp/core/dtos/anime/anime.dto';
import { Rating, Season, Source } from '@js-camp/core/dtos/anime/animeDetail.dto';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { Observable, tap } from 'rxjs';

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
  public readonly animeForm: FormGroup;

  /** Anime type value. */
  public readonly animeTypeList: readonly AnimeType[] = [
    AnimeType.TV,
    AnimeType.Movie,
    AnimeType.Music,
    AnimeType.ONA,
    AnimeType.OVA,
    AnimeType.Special,
  ];

  /** Anime type value. */
  public readonly animeStatusList: readonly Status[] = [
    Status.Airing,
    Status.Finished,
    Status.NotYetAired,
  ];

  /** Anime type value. */
  public readonly animeSourceList: readonly Source[] = [
    Source.Book,
    Source.CardGame,
    Source.FourKomaManga,
    Source.Game,
    Source.LightNovel,
    Source.Manga,
    Source.MixedMedia,
    Source.Music,
    Source.Novel,
    Source.Original,
    Source.Other,
    Source.PictureBook,
    Source.Radio,
    Source.Unknown,
    Source.VisualNovel,
    Source.WebManga,
    Source.WebNovel,
  ];

  /** Anime type value. */
  public readonly animeSeasonList: readonly Season[] = [
    Season.Spring,
    Season.Summer,
    Season.Fall,
    Season.Winter,
    Season.NonSeasonal,
  ];

  /** Anime type value. */
  public readonly animeRatingList: readonly Rating[] = [
    Rating.G,
    Rating.PG,
    Rating.PG13,
    Rating.R17,
    Rating.RPlus,
    Rating.RX,
    Rating.Unknown,
  ];

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
          console.log(data);
          this.animeForm.patchValue(data);
        }
      }),
    ).subscribe();
  }

  /** Handle form submission. */
  public onFormSubmit(): void {
    console.log(this.animeForm.value);
  }

  private initAnimeForm(): FormGroup {
    return this.formBuilder.group({
      image: ['', [Validators.required]],
      youtubeTrailerId: [''],
      englishTitle: ['', [Validators.required]],
      japaneseTitle: ['', [Validators.required]],
      type: [null, [Validators.required]],
      status: [null, [Validators.required]],
      source: [null, [Validators.required]],
      airing: [false, [Validators.required]],
      aired: this.formBuilder.group({
        start: [null],
        end: [null],
      }),
      rating: ['', [Validators.required]],
      season: [null, [Validators.required]],
      synopsis: ['', [Validators.required]],
      studioIdList: [[], [Validators.required]],
      genreIdList: [[], [Validators.required]],
    });
  }
}
