/** Error data received from server Dto. */
export interface ErrorData {
  readonly [key: string]: readonly string[];
}

/** HTTP error Dto. */
export interface HttpErrorDto {

  /** Error detail. */
  readonly detail: string;

  /** Error data. */
  readonly data?: ErrorData;

  /** Error code. */
  readonly code?: string;
}
