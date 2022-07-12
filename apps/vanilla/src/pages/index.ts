
import { Url } from '../scripts/constants';
import { isAuthenticated, navigate, renderLogoutButton } from '../scripts/functions';

window.addEventListener('load', async() => {
  const isAuthen = await isAuthenticated();
  if (isAuthen === false) {
    navigate(Url.Login);
  }
  renderLogoutButton();
});
