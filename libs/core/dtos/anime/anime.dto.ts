import { DateRangeDto } from '../dateRange.dto';

/** Possible values for type. */
export enum Type {
  Tv = 'TV',
  Ova = 'OVA',
  Movie = 'MOVIE',
  Special = 'SPECIAL',
  Ona = 'ONA',
  Music = 'MUSIC',
}

/** Possible values for status. */
export enum Status {
  Airing = 'AIRING',
  Finished = 'FINISHED',
  NotYetAired = 'NOT_YET_AIRED',
}

/** Anime DTO. */
export interface AnimeDto {

  /** Id. */
  readonly id: number;

  /** Creation time, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string;

  /** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string;

  /** Anime English title. */
  readonly title_eng: string;

  /** Anime Japanese title. */
  readonly title_jpn: string;

  /** Anime image. */
  readonly image: string;

  /** Anime aired date. */
  readonly aired: DateRangeDto;

  /** Anime Status. */
  readonly status: Status;

  /** Anime type. */
  readonly type: Type;
}
