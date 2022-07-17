import { Url } from '../scripts/constants';
import { checkAuthentication, navigate, renderLogoutButton } from '../scripts/functions';

window.addEventListener('load', async() => {
  const isAuthenticated = await checkAuthentication();
  if (!isAuthenticated) {
    navigate(Url.Login);
  }
  renderLogoutButton();
});
