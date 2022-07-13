export interface ErrorDataDto {
  readonly [key: string]: readonly string[];
}

export interface HttpErrorDto {
  readonly detail: string;
  readonly data?: ErrorDataDto;
  readonly code?: string;
}
