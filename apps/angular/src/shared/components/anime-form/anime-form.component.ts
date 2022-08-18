/* eslint-disable jsdoc/require-jsdoc */
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Status } from '@js-camp/core/dtos/anime/anime.dto';
import {
  Rating,
  Season,
  Source,
} from '@js-camp/core/dtos/anime/animeDetail.dto';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { Genre } from '@js-camp/core/models/anime/genre';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

import {
  map,
  Observable,
  tap,
  shareReplay,
  combineLatestWith,
  startWith,
} from 'rxjs';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Studio } from '@js-camp/core/models/anime/studio';

import { UntilDestroy } from '@ngneat/until-destroy';

import { AnimeService } from '../../../core/services/';

/** Login component. */
@UntilDestroy()
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

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  /** Anime form group. */
  public readonly animeForm: FormGroup;

  /** Genre observer. */
  public readonly allGenres$: Observable<readonly Genre[]>;

  /** Genre observer. */
  public readonly filteredGenres$: Observable<readonly Genre[]>;

  public selectedGenres$: Observable<readonly Genre[]>;

  public genresControl = new FormControl('');

  /** Genre observer. */
  public readonly studios$: Observable<readonly Studio[]>;

  public selectedStudios$: Observable<readonly Studio[]>;

  // @ViewChild('genreInput')
  // public genreInput: ElementRef<HTMLInputElement>;

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
    private readonly animeService: AnimeService,
  ) {
    this.animeForm = this.initAnimeForm();
    this.allGenres$ = this.animeService.getGenre().pipe(
      map(genres => genres.results),
      shareReplay({ refCount: false, bufferSize: 1 }),
    );

    this.filteredGenres$ = this.genresControl.valueChanges.pipe(
      startWith(null),
      combineLatestWith(this.allGenres$),
      map(([genreName, allGenres]) =>
       genreName ? allGenres.filter(genre => genre.name.toLowerCase().includes(genreName)) : allGenres),
    );
    this.selectedGenres$ = this.animeForm.controls[
      'genreIdList'
    ].valueChanges.pipe(
      combineLatestWith(this.allGenres$),
      map(([idList, genres]) => {
        const tempSelectedGenres: Genre[] = [];
        genres.map(genre => {
          if (idList.includes(genre.id)) {
            tempSelectedGenres.push(genre);
          }
        });
        return tempSelectedGenres;
      }),
    );
    this.studios$ = this.animeService.getStudio().pipe(
      map(studios => studios.results),
      shareReplay({ refCount: false, bufferSize: 1 }),
    );

    this.selectedStudios$ = this.animeForm.controls['studioIdList'].valueChanges.pipe(
      combineLatestWith(this.studios$),
      map(([idList, studios]) => {
        const tempSelectedStudios: Studio[] = [];
        studios.map(studio => {
          if (idList.includes(studio.id)) {
            tempSelectedStudios.push(studio);
          }
        });
        return tempSelectedStudios;
      }),
    );
  }

  public onGenreSelected(event: MatAutocompleteSelectedEvent): void {

    if (this.genreIdListFormControl.value.includes(event.option.value.id)) {
      return;
    }
    const newGenreArray = [...this.genreIdListFormControl.value, event.option.value.id];
    this.genreIdListFormControl.patchValue(newGenreArray);
    this.genresControl.setValue(null);
  }

  public onGenreRemove(genreId: Genre['id']): void {
    const newGenreArray = this.genreIdListFormControl.value.filter((id: Genre['id']) => id !== genreId);
    this.genreIdListFormControl.patchValue(newGenreArray);
  }

  public onStudioSelected(event: MatAutocompleteSelectedEvent): void {

    if (this.studioIdListFormControl.value.includes(event.option.value)) {
      return;
    }
    const newStudioArray = [...this.studioIdListFormControl.value, event.option.value];
    this.studioIdListFormControl.patchValue(newStudioArray);
  }

  public onStudioRemove(studioId: Studio['id']): void {
    const newStudioArray = this.studioIdListFormControl.value.filter((id: Studio['id']) => id !== studioId);
    this.studioIdListFormControl.patchValue(newStudioArray);
  }

  /** @inheritdoc */
  public ngOnInit(): void {
    this.animeData$
      .pipe(
        tap(data => {
          if (data) {
            // console.log(data);
            this.animeForm.patchValue(data);
            console.log(data);
            console.log(this.animeForm.controls);
          }
        }),
      )
      .subscribe();
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

      // genreIdList: this.formBuilder.array([]),
    });
  }

  private get genreIdListFormControl(): FormControl {
    return this.animeForm.get('genreIdList') as FormControl;
  }

  private get studioIdListFormControl(): FormControl {
    return this.animeForm.get('studioIdList') as FormControl;
  }
}
