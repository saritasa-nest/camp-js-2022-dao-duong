import { Login } from '@js-camp/core/models/login';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';

import { AuthService } from '../../services/authService';
import { ErrorService } from '../../services/errorService';
import { navigate } from '../../utils/navigate';

const loginForm = document.querySelector<HTMLFormElement>('.form');

window.addEventListener('load', async() => {
  await AuthService.navigateToHomeIfIsAuthenticated();
});

assertNonNull(loginForm);
loginForm.addEventListener('submit', async(event): Promise<void> => {
  event.preventDefault();
  const form = document.querySelector('.form') as HTMLFormElement;
  assertNonNull(form);
  const email = form.elements.namedItem('email') as HTMLInputElement;
  const password = form.elements.namedItem('password') as HTMLInputElement;

  assertNonNull(email);
  assertNonNull(password);
  const loginData: Login = {
    email: email.value,
    password: password.value,
  };
  try {
    await AuthService.login(loginData);
    navigate(Url.Home);
  } catch (error: unknown) {
    ErrorService.renderInputError(error);
  }
});
