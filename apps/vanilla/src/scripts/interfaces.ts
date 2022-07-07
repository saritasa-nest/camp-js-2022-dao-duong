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
export interface PaginationOptions {

  /** Number of items per request. */
  readonly limit: number;

  /**  */
  readonly page: number;

  /** Setting for sort features. */
  readonly sortSettings: SortSetting;
}
