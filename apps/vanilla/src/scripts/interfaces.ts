/** Sort options. */
export interface SortOption {

  /** Sort option text. */
  readonly text: string;

  /** Sort option value. */
  readonly value: string;
}

/** Options for pagination. */
export interface PaginationConfig {

  /** Number of items per request. */
  readonly limit: number;

  /**  */
  readonly page: number;

  /** Setting for sort features. */
  readonly ordering: string;
}
