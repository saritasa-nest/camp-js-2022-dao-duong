/* eslint-disable import/order */
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { Url } from '../../scripts/constants';
import { isAuthenticated, renderLogoutButton, navigate } from '../../scripts/functions';
import { AuthService } from '../../services/authService';

window.addEventListener('load', (): void => {
  if (!isAuthenticated()) {
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
    <li>First Name: ${user.firstName}</li>
    <li>Last Name: ${user.lastName}</li>
    <li>Avatar: ${user.avatar}</li>
    <li>Created at: ${user.created}</li>
    <li>Modified at: ${user.modified}</li>
  </ul>
  `;
}
