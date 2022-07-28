import { User } from '@js-camp/core/models/user';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Navbar } from '../../namespaces/navbar';

import { AuthService } from '../../services/authService';
import { convertDate } from '../../utils/convertDate';

window.addEventListener('load', async(): Promise<void> => {
  await AuthService.navigateToLoginIfNotAuthenticated();
  Navbar.renderNavbar();
  renderUserProfile();
});

/** Render user profile. */
export async function renderUserProfile(): Promise<void> {
  const user = await AuthService.getUser();
  renderDetail(user);
}

/**
 * Render user detail.
 * @param user User data to render.
 */
export function renderDetail(user: User): void {
  const profileSection = document.querySelector('.profile');
  assertNonNull(profileSection);
  profileSection.innerHTML = `
  <ul>
    <li>Email: ${user.email}</li>
    <li>First Name: ${user.firstName ?? 'No first name available'}</li>
    <li>Last Name: ${user.lastName ? user.lastName : 'No last name available'}</li>
    <li>Created at: ${convertDate(user.created)}</li>
    <li>Modified at: ${convertDate(user.modified)}</li>
    <li>Avatar: ${user.avatar ? `
      <img class="user-avatar" src="${user.avatar}" alt="${user.firstName}${user.lastName}" />
    ` : 'No avatar available'}
    </li>
  </ul>`;
}
