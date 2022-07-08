import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

/**
 * Convert response date object to readable format.
 * @param date Date data from response object.
 */
export const dateConverter = (date: string | null): string => {
  if (date !== null) {
    return (new Date(date))
      .toString();
  }
  return 'None';
};

/**
 * Checks whether has sort options enabled.
 * @param option Option value to check.
 */
export const hasSortOption = (option: string): boolean => option !== '';

/**
 * Change state of the order direction.
 * @param hasOption Whether has sort option enabled.
 */
export const changeDirectionState = (hasOption: boolean): void => {
  const sortDirection = document.querySelector<HTMLSelectElement>('.sort__direction');
  assertNonNullish(sortDirection);
    if (hasOption) {
      sortDirection.disabled = false;
      sortDirection.style.cursor = 'default';
    } else {
      sortDirection.disabled = true;
      sortDirection.style.cursor = 'not-allowed';
  }
};
