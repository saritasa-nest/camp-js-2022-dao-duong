import { OmitImmerable, Immerable } from './immerable';

/** Anime aired time. */
export class AiredTime extends Immerable {

  /** Anime start date. */
  public readonly start: Date;

  /** Anime end date. */
  public readonly end: Date;

  public constructor(data: InitArgsAiredTime) {
    super();
    this.end = data.end;
    this.start = data.start;
  }
}

/** Anime. */
export class Anime extends Immerable {
  /** ID. */
  public readonly id: number;

  /** Url address image. */
  public readonly image: string;

  /** Title in English. */
  public readonly titleEnglish: string;

  /** Title in Japanese. */
  public readonly titleJapanese: string;

  /** Release and end dates. */
  public readonly aired: AiredTime;

  /** Anime type. */
  public readonly type: string;

  /** Anime status. */
  public readonly status: string;

  public constructor(data: InitArgsAnime) {
    super();
    this.id = data.id;
    this.image = data.image;
    this.titleEnglish = data.titleEnglish;
    this.titleJapanese = data.titleJapanese;
    this.aired = data.aired;
    this.type = data.type;
    this.status = data.status;
  }
}

type InitArgsAiredTime = OmitImmerable<AiredTime>;
type InitArgsAnime = OmitImmerable<Anime>;
