import { Rating, Season, Source } from '../../../core/dtos/anime/animeDetail.dto';

import { OmitImmerable } from '../immerable';

import { Genre } from './genre';
import { Studio } from './studio';
import { Anime } from './anime';

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

type InitArgsAnime = OmitImmerable<AnimeDetail>;
