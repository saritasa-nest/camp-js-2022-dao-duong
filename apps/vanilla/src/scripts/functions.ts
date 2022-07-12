import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AuthService } from '../services/authService';

import { StorageService } from '../services/storageService';

import { Token, Url } from './constants';
import { Helpers } from './helpers';

/** Check whether the user authenticated or not.*/
export async function isAuthenticated(): Promise<boolean> {
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
      <button class="logout-btn btn_right">Logout</button>
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
