import { Url } from './constants';

/**
 *Navigation functions.
 *@param url Url to navigate to.
 */
export function navigate(url: Url): void {
  window.location.href = url;
}
