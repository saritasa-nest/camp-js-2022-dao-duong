import { Url } from '../scripts/constants';
import { isAuthenticated, renderLogoutButton } from '../scripts/functions';

import { navigate } from '../scripts/navigation';

window.addEventListener('load', (): void => {
  if (!isAuthenticated()) {
    navigate(Url.Login);
  }
  renderLogoutButton();
});
