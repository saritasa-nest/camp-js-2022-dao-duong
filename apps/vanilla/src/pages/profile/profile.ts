/* eslint-disable import/order */
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { Url } from '../../scripts/constants';
import { checkAuthentication, renderLogoutButton, navigate } from '../../scripts/functions';
import { AuthService } from '../../services/authService';

window.addEventListener('load', async(): Promise<void> => {
  const isAuthenticated = await checkAuthentication();
  if (!isAuthenticated) {
    navigate(Url.Login);
  }
  renderLogoutButton();
  renderUserProfile();
});

/** Render user profile. */
export async function renderUserProfile(): Promise<void> {
  const user = await AuthService.getUser();
  const profileSection = document.querySelector('.profile');
  assertNonNull(profileSection);
  profileSection.innerHTML = `
  <ul>
    <li>Email: ${user.email}</li>
    <li>First Name: ${user.firstName ? user.firstName : 'No first name available'}</li>
    <li>Last Name: ${user.lastName ? user.lastName : 'No last name available'}</li>
    <li>Created at: ${user.created}</li>
    <li>Modified at: ${user.modified}</li>
    <li>Avatar: ${user.avatar ? `
      <img class="user-avatar" src="${user.avatar}" alt="User Avatar" />
    ` : 'No avatar available'}
    </li>
  </ul>
  `;
}
