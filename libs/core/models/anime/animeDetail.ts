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
  public readonly studioList: readonly Studio[];

  /** Anime status. */
  public readonly genreList: readonly Genre[];

  /** Anime status. */
  public readonly youtubeTrailerId: string | null;

  public constructor(data: InitArgsAnime) {
    super(data);
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studioList = data.studioList;
    this.genreList = data.genreList;
    this.youtubeTrailerId = data.youtubeTrailerId;
  }
}

type InitArgsAnime = OmitImmerable<AnimeDetail>;
