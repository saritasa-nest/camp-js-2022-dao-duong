import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AuthService } from '../services/authService';

import { StorageService } from '../services/storageService';

import { Token, Url } from './constants';
import { Helpers } from './helpers';

/** Check whether the user authenticated or not.*/
export async function checkAuthentication(): Promise<boolean> {
  const token = StorageService.get<string>(Token.Access);
  if (token !== null) {
    const isVerify = await AuthService.verifyToken(token);
    if (isVerify) {
      return true;
    }
    return false;
  }
  return false;
}

/** Render logout button. */
export function renderLogoutButton(): void {
  const { body } = document;
  body.innerHTML += `
    <nav class="navbar">
      <button type="button" class="logout-btn btn-right">Logout</button>
    </nav>
  `;
  const logoutButton = document.querySelector('.logout-btn');
  assertNonNull(logoutButton);
  logoutButton.addEventListener('click', () => {
    Helpers.clearToken();
    navigate(Url.Login);
});
}

/**
 *Navigation functions.
 *@param url Url to navigate to.
 */
export function navigate(url: Url): void {
  window.location.href = url;
}

/** Validate password.
 * @param password Password to validate.
 * @param confirmPassword Password to validate.
 */
export function validateConfirmPassword(password: string, confirmPassword: string): boolean {
  return (password === confirmPassword);
}

/**
 * Convert response date object to readable format.
 * @param date Date data from response object.
 */
export function dateConverter(date: string | null): string {
  if (date !== null) {
    return (new Date(date))
      .toString();
  }
  return 'None';
}

/**
 * Checks whether has sort options enabled.
 * @param option Option value to check.
 */
export function hasSortOption(option: string): boolean {
  return option !== '';
}

/**
 * Change state of the order direction.
 * @param hasOption Whether has sort option enabled.
 */
export function setDirectionState(hasOption: boolean): void {
  const sortDirection = document.querySelector<HTMLSelectElement>('.sort__direction');
  assertNonNull(sortDirection);
  if (hasOption) {
    sortDirection.disabled = false;
    sortDirection.style.cursor = 'default';
  } else {
    sortDirection.disabled = true;
    sortDirection.style.cursor = 'not-allowed';
  }
}
