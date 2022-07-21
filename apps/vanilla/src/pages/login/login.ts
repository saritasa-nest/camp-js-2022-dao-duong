import { Login } from '@js-camp/core/models/auth/login';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';

import { AuthService } from '../../services/authService';
import { ErrorService } from '../../services/errorService';
import { navigate } from '../../utils/navigate';

const loginForm = document.querySelector<HTMLFormElement>('.form');

window.addEventListener('load', async() => {
  await AuthService.navigateByAuthorization();
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
    navigate(Url.Home);
  } catch (error: unknown) {
    ErrorService.renderInputError(error);
  }
});
