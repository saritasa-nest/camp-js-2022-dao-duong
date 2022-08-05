import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {

  /** Total number of items. */
  public readonly count: number;

  /** Next set of items.*/
  public readonly next: string | null;

  /** Previous set of items.*/
  public readonly previous: string | null;

  /** Array of data objects. */
  public readonly results: readonly T[];

  public constructor(data: InitArgsPagination<T>) {
    super();
    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }
}
type InitArgsPagination<T> = OmitImmerable<Pagination<T>>;
