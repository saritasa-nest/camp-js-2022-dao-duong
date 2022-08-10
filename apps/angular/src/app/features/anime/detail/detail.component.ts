import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';

import { switchMap, Observable, Subject, BehaviorSubject } from 'rxjs';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  public readonly mediaImageUrl$ = new BehaviorSubject<SafeResourceUrl>('');

  /** Media image behavior subject. */
  public readonly mediaTrailerUrl$ = new BehaviorSubject<SafeResourceUrl>('');

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly animeService: AnimeService,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.anime$ = this.route.params.pipe(
      switchMap(params => this.animeService.fetchAnimeById(params['id'])),
    );
  }

  /**
   * Open trailer video.
   * @param trailerId The id of the trailer to open.
   */
  public openTrailer(trailerId: string): void {
    const trailer = `https://www.youtube-nocookie.com/embed/${trailerId}`;
    this.mediaTrailerUrl$.next(this.sanitizer.bypassSecurityTrustResourceUrl(trailer));
  }

  /**
   * Open trailer video.
   * @param imageUrl The url of the image.
   */
  public openFullSizeImage(imageUrl: string): void {
    this.mediaImageUrl$.next(
      this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl),
    );
  }

  /** Close modal. */
  public closeModal(): void {
    this.mediaTrailerUrl$.next('');
    this.mediaImageUrl$.next('');
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.subscriptionDestroy$.next(true);
    this.subscriptionDestroy$.complete();
  }
}
