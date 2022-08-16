import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';

import { switchMap, Observable, Subject, BehaviorSubject, tap, takeUntil } from 'rxjs';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Genre } from '@js-camp/core/models/anime/genre';
import { Studio } from '@js-camp/core/models/anime/studio';

import { MatDialog } from '@angular/material/dialog';

import { AnimeService } from '../../../../core/services';

/** Anime detail component. */
@Component({
  selector: 'camp-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnDestroy {
  /** Subscription manager. */
  private readonly subscriptionDestroy$: Subject<boolean> = new Subject();

  /** Anime observer. */
  public readonly anime$: Observable<AnimeDetail>;

  /** Media image behavior subject. */
  protected readonly mediaImageUrl$ = new BehaviorSubject<SafeResourceUrl>('');

  /** Media trailer behavior subject. */
  protected readonly mediaTrailerUrl$ = new BehaviorSubject<SafeResourceUrl>(
    '',
  );

  /** Check whether user is trying to delete. */
  protected readonly isDelete$ = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly animeService: AnimeService,
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
    public readonly dialog: MatDialog,
  ) {
    this.anime$ = this.route.params.pipe(
      switchMap(params => this.animeService.fetchAnimeById(params['id'])),
    );
  }

  /**
   * Open trailer video.
   * @param trailerId The id of the trailer to open.
   */
  public onTrailerButtonClick(trailerId: string): void {
    const trailer = `https://www.youtube-nocookie.com/embed/${trailerId}`;
    this.mediaTrailerUrl$.next(
      this.sanitizer.bypassSecurityTrustResourceUrl(trailer),
    );
  }

  /**
   * Open trailer video.
   * @param imageUrl The url of the image.
   */
  public onImageClick(imageUrl: string): void {
    this.mediaImageUrl$.next(
      this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl),
    );
  }

  /** Close modal. */
  public closeModal(): void {
    this.mediaTrailerUrl$.next('');
    this.mediaImageUrl$.next('');
    this.isDelete$.next(false);
  }

  /**
   * Track by id function.
   * @param _index Index of the item in the list.
   * @param listItem List item data to track.
   */
  public trackById(_index: number, listItem: Studio | Genre): number {
    return listItem.id;
  }

  /**
   * Handle edit button click event.
   * @param animeId Id of the anime.
   */
  public onEditButtonClick(animeId: number): void {
    this.router.navigate(['anime/edit/', animeId]);
  }

  /** Handle delete button click event.*/
  public onDeleteButtonClick(): void {
    this.isDelete$.next(true);
  }

  /** Handle delete button click event.*/
  public onConfirmButtonClick(): void {
    this.anime$.pipe(
      switchMap(anime => this.animeService.deleteAnime(anime.id)),
      tap(() => this.router.navigate([''])),
      takeUntil(this.subscriptionDestroy$),
    ).subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
    this.subscriptionDestroy$.complete();
  }
}
