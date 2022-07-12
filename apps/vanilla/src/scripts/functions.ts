import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { StorageService } from '../services/storageService';

import { Token, Url } from './constants';
import { Helpers } from './helpers';
import { navigate } from './navigation';

/** */
export function isAuthenticated(): boolean {
  return StorageService.get(Token.Access) !== null;
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
