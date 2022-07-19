import { User } from '@js-camp/core/models/user/user';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Navbar } from '../../namespaces/navbar';
import { Utility } from '../../namespaces/utility';

import { AuthService } from '../../services/authService';
import { UserService } from '../../services/userService';

window.addEventListener('load', async(): Promise<void> => {
  await AuthService.navigateByAuthorization();
  Navbar.renderNavbar();
  renderUserProfile();
});

/** Render user profile. */
export async function renderUserProfile(): Promise<void> {
  const user = await UserService.getUser();
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
    <li>Created at: ${Utility.convertDate(user.created)}</li>
    <li>Modified at: ${Utility.convertDate(user.modified)}</li>
    <li>Avatar: ${user.avatar ? `
      <img class="user-avatar" src="${user.avatar}" alt="${user.firstName}${user.lastName}" />
    ` : 'No avatar available'}
    </li>
  </ul>`;
}
