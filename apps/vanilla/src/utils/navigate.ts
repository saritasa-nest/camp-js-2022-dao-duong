import { Url } from '../scripts/constants';

/**
 * Navigation functions.
 * @param url Url to navigate to.
 * @param id ID of the anime.
 */
export function navigate(url: Url, id?: string): void {
  if (id) {
    const params = new URLSearchParams({ id });
    window.location.href = `${url}?${params}`;
  } else {
    window.location.href = url;
  }
}
