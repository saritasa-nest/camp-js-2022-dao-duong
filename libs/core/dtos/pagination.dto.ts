/** Pagination meta info. */
export interface PaginationDto<T> {

  /** Total count of items. */
  readonly count: number;

  /** Next page of items. */
  readonly next: string;

  /** Previous page of items. */
  readonly previous: string;

  /** Array of items requested. */
  readonly results: readonly T[];
}

export interface PaginationOptionsDto {

  /** Number of items per request. */
  readonly limit: string;

  /** First items of requested data. */
  readonly offset: string;

  /** Ordering options. */
  readonly ordering: string;

  /** Filtering type. */
  readonly type: string;

  /** Search query. */
  readonly search: string;
}
