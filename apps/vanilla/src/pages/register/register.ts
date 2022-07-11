// import { Register } from '@js-camp/core/models/register';
import { Register } from '@js-camp/core/models/register';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AuthService } from '../../services/authService';

const registerForm = document.querySelector<HTMLFormElement>('.form');
assertNonNull(registerForm);
registerForm.addEventListener('submit', event => {
  event.preventDefault();
  const emailTextInput = document.querySelector<HTMLInputElement>('input[name="email"]');
  assertNonNull(emailTextInput);
  const firstNameTextInput = document.querySelector<HTMLInputElement>('input[name="first_name"]');
  assertNonNull(firstNameTextInput);
  const lastNameTextInput = document.querySelector<HTMLInputElement>('input[name="last_name"]');
  assertNonNull(lastNameTextInput);
  const passwordTextInput = document.querySelector<HTMLInputElement>('input[name="password"]');
  assertNonNull(passwordTextInput);
  const registerData: Register = {
    email: emailTextInput.value,
    firstName: firstNameTextInput.value,
    lastName: lastNameTextInput.value,
    password: passwordTextInput.value,
  };
  AuthService.register(registerData);
});