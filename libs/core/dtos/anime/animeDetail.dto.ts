/** Aired DTO. */
import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Possible source for anime. */
export enum SourceDto {
  FourKomaManga = 'FOUR_KOMA_MANGA',
  Book = 'BOOK',
  CardGame = 'CARD_GAME',
  Game = 'GAME',
  LightNovel = 'LIGHT_NOVEL',
  Manga = 'MANGA',
  MixedMedia = 'MIXED_MEDIA',
  Music = 'MUSIC',
  Novel = 'NOVEL',
  Original = 'ORIGINAL',
  PictureBook = 'PICTURE_BOOK',
  Radio = 'RADIO',
  VisualNovel = 'VISUAL_NOVEL',
  WebManga = 'WEB_MANGA',
  WebNovel = 'WEB_NOVEL',
  Other = 'OTHER',
  Unknown = 'UNKNOWN',
}

/** Possible rating for anime. */
export enum RatingDto {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG_13',
  R17 = 'R_17',
  RPlus = 'R_PLUS',
  RX = 'R_X',
  Unknown = 'UNKNOWN',
}

/** Possible season for anime. */
export enum SeasonDto {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
  NonSeasonal = 'NON_SEASONAL',
}

/** Anime detail DTO. */
export interface AnimeDetailDto extends AnimeDto {

  /** Youtube trailer id. */
  readonly trailer_youtube_id: string | null;

  /**  */
  readonly source: SourceDto;

  /** Anime airing status. */
  readonly airing: boolean;

  /** Anime rating. */
  readonly rating: RatingDto;

  /** Anime season. */
  readonly season: SeasonDto;

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
