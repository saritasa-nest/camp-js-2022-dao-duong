import { Login } from '@js-camp/core/models/login';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';

import { checkAuthentication, navigate } from '../../scripts/functions';
import { AuthService } from '../../services/authService';
import { ErrorService } from '../../services/errorService';

const loginForm = document.querySelector<HTMLFormElement>('.form');

window.addEventListener('load', async() => {
  const isAuthenticated = await checkAuthentication();
  if (isAuthenticated) {
    navigate(Url.Base);
  }
});

assertNonNull(loginForm);
loginForm.addEventListener('submit', async(event): Promise<void> => {
  event.preventDefault();
  const emailTextInput = document.querySelector<HTMLInputElement>('input[name="email"]');
  assertNonNull(emailTextInput);
  const passwordTextInput = document.querySelector<HTMLInputElement>('input[name="password"]');
  assertNonNull(passwordTextInput);
  const loginData: Login = {
    email: emailTextInput.value,
    password: passwordTextInput.value,
  };
  try {
    await AuthService.login(loginData);
    navigate(Url.Base);
  } catch (error: unknown) {
    ErrorService.renderErrorMessage(error);
  }
});
