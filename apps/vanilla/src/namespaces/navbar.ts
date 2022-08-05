import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../scripts/constants';
import { AuthService } from '../services/authService';
import { navigate } from '../utils/navigate';

export namespace Navbar {

  /** Render navbar. */
  export async function render(): Promise<void> {
    const { body } = document;
    const isAuthenticated = await AuthService.checkIsAuthenticated();
    body.innerHTML = `
    <nav class="navbar">
      <h5><a href="/#">Anime</a></h5>
    </nav>${body.innerHTML}`;
    if (isAuthenticated) {
      renderLinks();
      renderLogoutButton();
    } else {
      renderLoginButton();
    }
  }

  /** Render logout button. */
  function renderLogoutButton(): void {
    const navbar = document.querySelector('.navbar');
    assertNonNull(navbar);
    navbar.innerHTML += `<button type="button" class="logout-btn">Logout</button>`;
    const logoutButton = document.querySelector('.logout-btn');
    assertNonNull(logoutButton);
    logoutButton.addEventListener('click', async() => {
      await AuthService.logout();
      navigate(Url.Login);
    });
  }

  /** Render login button. */
  export function renderLoginButton(): void {
    const navbar = document.querySelector('.navbar');
    assertNonNull(navbar);
    navbar.innerHTML += `<button type="button" class="login-btn">Login</button>`;
    const loginButton = document.querySelector('.login-btn');
    assertNonNull(loginButton);
    loginButton.addEventListener('click', () => {
      navigate(Url.Login);
    });
  }

  /** Render navigation links. */
  export function renderLinks(): void {
    const navbar = document.querySelector('.navbar');
    assertNonNull(navbar);
    navbar.innerHTML += `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/profile/">Profile</a></li>
    </ul>`;
  }
}
