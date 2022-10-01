/** Options for pagination. */
export interface PaginationConfig {

  /** Number of items per request. */
  readonly limit: number;

  /**  Current page base on total items and limit. */
  readonly page: number;

  /** Sort order params for request query string. */
  readonly ordering: string;

  /** Type for request query string. */
  readonly type: string;

  /** Query string. */
  readonly search: string;
}
