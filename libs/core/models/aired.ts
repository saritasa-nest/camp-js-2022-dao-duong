import { OmitImmerable, Immerable } from './immerable';

/** Anime aired time. */
export class Aired extends Immerable {

  /** Anime start date. */
  public readonly start: Date;

  /** Anime end date. */
  public readonly end: Date;

  public constructor(data: InitArgsAired) {
    super();
    this.end = data.end;
    this.start = data.start;
  }
}
type InitArgsAired = OmitImmerable<Aired>;
