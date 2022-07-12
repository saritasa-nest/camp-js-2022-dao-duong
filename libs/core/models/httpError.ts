import { ErrorDataDto } from '../dtos/httpError.dto';

import { Immerable, OmitImmerable } from './immerable';

/** HttpError. */
export class HttpError extends Immerable {

  /** Id. */
  public readonly detail: string;

  /** Name. */
  public readonly code?: string;

  /** Name. */
  public readonly data?: ErrorDataDto[];

  public constructor(error: ErrorInitArgs) {
    super();
    this.detail = error.detail;
    this.data = error.data;
    this.code = error.code;
  }
}

type ErrorInitArgs = OmitImmerable<HttpError>;
