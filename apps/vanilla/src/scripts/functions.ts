
/** Convert response date object to readable format.
 * @param date Date data from response object.
 */
export const dayConverter = (date: Date | null): string => {
  if (date !== null) {
    return (new Date(date).getFullYear())
      .toString();
  }
  return 'None';
};

/** Checks whether has sort options enabled.
 * @param option Option value to check.
 */
export const hasSortOption = (option: string): boolean => option !== '';

/** Change state of the order direction.
 * @param hasOption Whether has sort option enabled.
 */
export const changeDirectionState = (hasOption: boolean): void => {
  const sortDirection: HTMLSelectElement = document.querySelector('#sort-direction');
  if (sortDirection) {
    if (hasOption) {
      sortDirection.disabled = false;
      sortDirection.style.cursor = 'default';
    } else {
      sortDirection.disabled = true;
      sortDirection.style.cursor = 'not-allowed';
    }
  }
};
