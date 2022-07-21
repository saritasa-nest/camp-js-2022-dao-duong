/**
 * Convert response date object to readable format.
 * @param date Date data from response object.
 */
export function convertDate(date: Date | null): string {
  if (date !== null) {
    return date.toLocaleDateString('en-GB');
  }
  return 'None';
}
