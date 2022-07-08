/** Sort setting. */
export interface SortSetting {

  /** Option for sort. */
  readonly option: string;

  /** Direction for sort. */
  readonly direction: string;
}

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
  readonly ordering: SortSetting;
}

/** State for pagination. */
export interface PaginationState {

  /** Number of items per request. */
  readonly page: number;

  /** Number of pages to display. */
  readonly displayPages: number;

  /** Active page. */
  readonly active: number;
}
