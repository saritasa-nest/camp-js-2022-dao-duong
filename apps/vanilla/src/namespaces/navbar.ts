import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../scripts/constants';
import { AuthService } from '../services/authService';
import { navigate } from '../utils/navigate';

export namespace Navbar {

  /** Render navbar. */
  export function renderNavbar(): void {
    const { body } = document;
    body.innerHTML = `
    <nav class="navbar">
      <p><a href="/#">Anime</a></p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/profile/">Profile</a></li>
      </ul>
    </nav>${body.innerHTML}`;
    renderLogoutButton();
  }

  /** Render logout button. */
  export function renderLogoutButton(): void {
    const navbar = document.querySelector('.navbar');
    assertNonNull(navbar);
    navbar.innerHTML += `<button type="button" class="logout-btn btn-right">Logout</button>`;
    const logoutButton = document.querySelector('.logout-btn');
    assertNonNull(logoutButton);
    logoutButton.addEventListener('click', async() => {
      await AuthService.logout();
      navigate(Url.Login);
    });
  }
}
