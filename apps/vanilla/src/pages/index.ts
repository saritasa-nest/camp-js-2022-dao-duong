import { Navbar } from '../namespaces/navbar';
import { AuthService } from '../services/authService';

window.addEventListener('load', async() => {
  await AuthService.navigateToLoginIfNotAuthenticated();
  Navbar.renderNavbar();
});
