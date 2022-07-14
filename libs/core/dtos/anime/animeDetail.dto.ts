/** Aired DTO. */
import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Possible source for anime. */
export enum Source {
  'FOUR_KOMA_MANGA',
  'BOOK',
  'CARD_GAME',
  'GAME',
  'LIGHT_NOVEL',
  'MANGA',
  'MIXED_MEDIA',
  'MUSIC',
  'NOVEL',
  'ORIGINAL',
  'PICTURE_BOOK',
  'RADIO',
  'VISUAL_NOVEL',
  'WEB_MANGA',
  'WEB_NOVEL',
  'OTHER',
  'UNKNOWN',
}

/** Possible rating for anime. */
export enum Rating {
  'G',
  'PG',
  'PG_13',
  'R_17',
  'R_PLUS',
  'R_X',
  'UNKNOWN',
}

/** Possible season for anime. */
export enum Season {
  'SUMMER',
  'WINTER',
  'SPRING',
  'FALL',
  'NON_SEASONAL',
}

/** Anime DTO. */
export interface AnimeDetailDto extends AnimeDto {

  /** Youtube trailer id. */
  readonly trailer_youtube_id: string | null;

  /**  */
  readonly source: Source;

  /** Anime airing status. */
  readonly airing: boolean;

  /** Anime rating. */
  readonly rating: Rating;

  /** Anime season. */
  readonly season: Season;

  /** Anime synopsis. */
  readonly synopsis: string;

  /** Anime background. */
  readonly background: string;

  /** Anime broadcast day. */
  readonly broadcast_day: string;

  /** Anime broadcast time. */
  readonly broadcast_time: string | null;

  /** Anime broadcast timezone. */
  readonly broadcast_timezone: string | null;

  /** Anime studio(s). */
  readonly studios: readonly number[];

  /** Anime studios data. */
  readonly studios_data: readonly StudioDto[];

  /** Anime genres. */
  readonly genres: readonly number[];

  /** Anime genres data. */
  readonly genres_data: readonly GenreDto[];
}
