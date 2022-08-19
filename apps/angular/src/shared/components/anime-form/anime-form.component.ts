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
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { Genre } from '@js-camp/core/models/anime/genre';

import {
  map,
  Observable,
  tap,
  shareReplay,
  combineLatestWith,
  startWith,
  switchMap,
  BehaviorSubject,
} from 'rxjs';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Studio } from '@js-camp/core/models/anime/studio';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

  public isLoading$ = new BehaviorSubject<boolean>(false);

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
  public readonly allStudios$: Observable<readonly Studio[]>;

  /** Filtered studio observer. */
  public readonly filteredStudios$: Observable<readonly Studio[]>;

  public selectedStudios$: Observable<readonly Studio[]>;

  public studiosControl = new FormControl('');

  /** Anime type list. */
  public readonly animeTypeList = this.animeService.getTypeList();

  /** Anime status list. */
  public readonly animeStatusList = this.animeService.getStatusList();

  /** Anime source list. */
  public readonly animeSourceList = this.animeService.getSourceList();

  /** Anime season list. */
  public readonly animeSeasonList = this.animeService.getSeasonList();

  /** Anime rating list. */
  public readonly animeRatingList = this.animeService.getRatingList();

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
    this.allStudios$ = this.animeService.getStudio().pipe(
      map(studios => studios.results),
      shareReplay({ refCount: false, bufferSize: 1 }),
    );
    this.filteredStudios$ = this.studiosControl.valueChanges.pipe(
      startWith(null),
      combineLatestWith(this.allStudios$),
      map(([studioName, allStudios]) =>
       studioName ? allStudios.filter(genre => genre.name.toLowerCase().includes(studioName)) : allStudios),
    );
    this.selectedStudios$ = this.animeForm.controls['studioIdList'].valueChanges.pipe(
      combineLatestWith(this.allStudios$),
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

    this.genresControl.setValue(null);
    if (this.genreIdListFormControl.value.includes(event.option.value.id)) {
      return;
    }
    const newGenreArray = [...this.genreIdListFormControl.value, event.option.value.id];
    this.genreIdListFormControl.patchValue(newGenreArray);
  }

  public onGenreRemove(genreId: Genre['id']): void {
    const newGenreArray = this.genreIdListFormControl.value.filter((id: Genre['id']) => id !== genreId);
    this.genreIdListFormControl.patchValue(newGenreArray);
  }

  public onStudioSelected(event: MatAutocompleteSelectedEvent): void {
    this.genresControl.setValue(null);
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
            this.animeForm.patchValue(data);
          }
        }),
      )
      .subscribe();
  }

  /** Handle form submission. */
  public onFormSubmit(): void {
    switch (this.type) {
      case 'create':
        this.animeData$.pipe(
          tap(() => this.isLoading$.next(true)),
          switchMap(() => this.animeService.createAnime(this.animeForm.value)),
          tap(() => this.isLoading$.next(false)),
          untilDestroyed(this),
        ).subscribe();
        break;
      case 'edit':
        this.animeData$.pipe(
          tap(() => this.isLoading$.next(true)),
          switchMap(data => this.animeService.updateAnime(data.id, this.animeForm.value)),
          tap(() => this.isLoading$.next(false)),
          untilDestroyed(this),
        ).subscribe();
        break;
      default:
        break;
    }

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
