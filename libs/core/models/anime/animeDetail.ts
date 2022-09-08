import { OmitImmerable } from '../immerable';

import { Genre } from './genre';
import { Studio } from './studio';
import { Anime } from './anime';

/** Possible source for anime. */
export enum Source {
  FourKomaManga = 'Four Koma Manga',
  Book = 'Book',
  CardGame = 'Card Game',
  Game = 'Game',
  LightNovel = 'Light Novel',
  Manga = 'Manga',
  MixedMedia = 'Mixed Media',
  Music = 'Music',
  Novel = 'NOVNovelEL',
  Original = 'Original',
  PictureBook = 'Picture Book',
  Radio = 'Radio',
  VisualNovel = 'VisualNovel',
  WebManga = 'Web Manga',
  WebNovel = 'Web Novel',
  Other = 'Other',
  Unknown = 'Unknown',
}

/** Possible rating for anime. */
export enum Rating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG_13',
  R17 = 'R_17',
  RPlus = 'R_PLUS',
  RX = 'R_X',
  Unknown = 'Unknown',
}

/** Possible season for anime. */
export enum Season {
  Summer = 'Summer',
  Winter = 'Winter',
  Spring = 'Spring',
  Fall = 'Fall',
  NonSeasonal = 'NonSeasonal',
}

/** Anime Detail. */
export class AnimeDetail extends Anime {
  /** Anime status. */
  public readonly synopsis: string;

  /** Anime status. */
  public readonly airing: boolean;

  /** Anime status. */
  public readonly studioIdList: readonly number[];

  /** Anime status. */
  public readonly studioList: readonly Studio[];

  /** Anime status. */
  public readonly genreIdList: readonly number[];

  /** Anime status. */
  public readonly genreList: readonly Genre[];

  /** Anime status. */
  public readonly youtubeTrailerId: string | null;

  /** Anime status. */
  public readonly source: Source;

  /** Anime status. */
  public readonly season: Season;

  /** Anime status. */
  public readonly rating: Rating;

  public constructor(data: InitArgsAnime) {
    super(data);
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studioIdList = data.studioIdList;
    this.studioList = data.studioList;
    this.genreIdList = data.genreIdList;
    this.genreList = data.genreList;
    this.youtubeTrailerId = data.youtubeTrailerId;
    this.source = data.source;
    this.season = data.season;
    this.rating = data.rating;
  }
}

export type AnimeDetailPost = Omit<AnimeDetail, 'id'>;

type InitArgsAnime = OmitImmerable<AnimeDetail>;
