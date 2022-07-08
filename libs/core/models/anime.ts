import { Type, Status } from '../dtos/anime.dto';

import { OmitImmerable, Immerable } from './immerable';
import { DateRange } from './dateRange';

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
  public readonly type: Type;

  /** Anime status. */
  public readonly status: Status;

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
