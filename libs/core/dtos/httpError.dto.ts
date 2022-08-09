/** Error data received from server Dto. */
export interface ErrorData {
  readonly [key: string]: readonly string[];
}

/** HTTP error Dto. */
export interface HttpErrorDto {

  /** Human-readable representation of error. */
  readonly detail: string;

  /** Object containing messages related to incorrect fields. */
  readonly data?: ErrorData;

  /** HTTP status code for the error. */
  readonly code?: string;
}
