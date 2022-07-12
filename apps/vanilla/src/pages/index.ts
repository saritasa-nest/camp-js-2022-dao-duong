
import { Url } from '../scripts/constants';
import { isAuthenticated, navigate, renderLogoutButton } from '../scripts/functions';

window.addEventListener('load', (): void => {
  if (!isAuthenticated()) {
    navigate(Url.Login);
  }
  renderLogoutButton();
});
