/** Available options for sorting. */
export enum SortField {
  EnglishTitle = 'title_eng',
  Status = 'status',
  AiredStart = 'aired__startswith',
}

/** Available options for sorting. */
export enum SortDirection {
  Ascending = '',
  Descending = '-',
}

/** Sort interface. */
export interface Sort {

  /** Sort field value. */
  field: SortField;

  /** Sort direction value. */
  direction: SortDirection;
}
