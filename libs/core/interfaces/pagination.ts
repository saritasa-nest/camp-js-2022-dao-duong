/** Options for pagination. */
export interface PaginationConfig {

  /** Number of items per request. */
  readonly limit: number;

  /**  */
  readonly page: number;

  /** Setting for sort features. */
  readonly ordering: string;
}
