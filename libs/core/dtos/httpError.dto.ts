/** Error data received from server Dto. */
export interface ErrorDataDto {
  readonly [key: string]: readonly string[];
}

/** HTTP error Dto. */
export interface HttpErrorDto {
  readonly detail: string;
  readonly data?: ErrorDataDto;
  readonly code?: string;
}
