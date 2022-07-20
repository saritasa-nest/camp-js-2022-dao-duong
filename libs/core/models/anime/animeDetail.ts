
import { Type, Status } from '../../dtos/anime/anime.dto';

import { OmitImmerable, Immerable } from '../immerable';
import { DateRange } from '../dateRange';

import { Genre } from './genre';
import { Studio } from './studio';

/** Anime Detail. */
export class AnimeDetail extends Immerable {
  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly englishTitle: string | null;

  /** Title in Japanese. */
  public readonly japaneseTitle: string | null;

  /** Release and end dates. */
  public readonly aired: DateRange;

  /** Anime type. */
  public readonly type: Type;

  /** Anime status. */
  public readonly status: Status;

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
    super();
    this.id = data.id;
    this.image = data.image;
    this.englishTitle = data.englishTitle;
    this.japaneseTitle = data.japaneseTitle;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
    this.synopsis = data.synopsis;
    this.airing = data.airing;
    this.studioList = data.studioList;
    this.genreList = data.genreList;
    this.youtubeTrailerId = data.youtubeTrailerId;
  }
}

type InitArgsAnime = OmitImmerable<AnimeDetail>;
