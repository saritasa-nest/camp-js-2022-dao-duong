// import { Register } from '@js-camp/core/models/register';
import { Login } from '@js-camp/core/models/login';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';

import { isAuthenticated, navigate } from '../../scripts/functions';
import { AuthService } from '../../services/authService';

const loginForm = document.querySelector<HTMLFormElement>('.form');

window.addEventListener('load', () => {
  if (isAuthenticated()) {
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
  await AuthService.login(loginData);
});
