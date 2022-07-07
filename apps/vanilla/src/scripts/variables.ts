import { SortOption, SortSetting } from './interfaces';

/** Available options for sorting. */
export enum Ordering {
  EnglishTitle = 'title_eng',
  Status = 'status',
  AiredStart = 'aired__startswith',
}

/** Setting for sort. */
export const SORT_SETTINGS: SortSetting = {
  option: '',
  direction: '',
};

/** Available value for sorting options. */
export const SORT_OPTIONS: readonly SortOption[] =
  [
    { text: 'Default', value: '' },
    { text: 'English Title', value: Ordering.EnglishTitle },
    { text: 'Aired Start', value: Ordering.AiredStart },
    { text: 'Status', value: Ordering.Status },
  ];

/** Available direction for sorting options. */
export const SORT_DIRECTION: readonly SortOption[] =
  [
    { text: 'Ascending', value: '' },
    { text: 'Descending', value: '-' },
  ];

/** Number of items per request. */
export const LIMIT = 20;

/** Pagination state. */
export const PAGINATION_STATE = {
  page: 1,
  window: 9,
  active: 1,
};
