import { OmitImmerable, Immerable } from '../immerable';
import { DateRange } from '../dateRange';

/** Possible options anime type. */
export enum AnimeType {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'Movie',
  Special = 'Special',
  Ona = 'ONA',
  Music = 'Music',
}

/** Possible options anime status. */
export enum AnimeStatus {
  Airing = 'Airing',
  Finished = 'Finished',
  NotYetAired = 'Not yet aired',
}

/** Sort settings. */
export interface AnimeSort<TDirection, TField> {

  /** Ordering direction. */
  readonly direction: TDirection;

  /** Field by sort. */
  readonly field: TField;
}

/** Fields by which you can sort. */
export enum AnimeSortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

/** Fields by which you can sort. */
export enum AnimeSortField {
  EnglishTitle = 'english',
  Aired = 'aired',
  Status = 'status',
}

/** Anime. */
export class Anime extends Immerable {
  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly englishTitle: string;

  /** Title in Japanese. */
  public readonly japaneseTitle: string;

  /** Release and end dates. */
  public readonly aired: DateRange;

  /** Anime type. */
  public readonly type: AnimeType;

  /** Anime status. */
  public readonly status: AnimeStatus;

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.englishTitle = data.englishTitle;
    this.japaneseTitle = data.japaneseTitle;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
  }
}

type InitArgsAnime = OmitImmerable<Anime>;
