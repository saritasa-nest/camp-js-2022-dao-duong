import { Url } from '../scripts/constants';

export namespace Utility {

  /**
   * Navigation functions.
   * @param url Url to navigate to.
   */
  export function navigate(url: Url): void {
    window.location.href = url;
  }

  /**
   * Convert response date object to readable format.
   * @param date Date data from response object.
   */
  export function convertDate(date: string | null): string {
    if (date !== null) {
      return (new Date(date)).toLocaleDateString('en-gb');
    }
    return 'None';
  }
}
