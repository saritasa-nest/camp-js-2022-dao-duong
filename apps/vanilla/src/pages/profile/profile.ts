import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';
import { checkAuthentication, navigate, convertDate, renderNavbar } from '../../scripts/functions';
import { UserService } from '../../services/userService';

window.addEventListener('load', async(): Promise<void> => {
  const isAuthenticated = await checkAuthentication();
  if (!isAuthenticated) {
    navigate(Url.Login);
  }
  renderUserProfile();
  renderNavbar();
});

/** Render user profile. */
export async function renderUserProfile(): Promise<void> {
  const user = await UserService.getUser();
  const profileSection = document.querySelector('.profile');
  assertNonNull(profileSection);
  profileSection.innerHTML = `
  <ul>
    <li>Email: ${user.email}</li>
    <li>First Name: ${user.firstName ? user.firstName : 'No first name available'}</li>
    <li>Last Name: ${user.lastName ? user.lastName : 'No last name available'}</li>
    <li>Created at: ${convertDate(user.created)}</li>
    <li>Modified at: ${convertDate(user.modified)}</li>
    <li>Avatar: ${user.avatar ? `
      <img class="user-avatar" src="${user.avatar}" alt="${user.firstName}${user.lastName}" />
    ` : 'No avatar available'}
    </li>
  </ul>
  `;
}
