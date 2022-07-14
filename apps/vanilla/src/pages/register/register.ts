import { Register } from '@js-camp/core/models/auth/register';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';
import { checkAuthentication, validateConfirmPassword, navigate } from '../../scripts/functions';

import { AuthService } from '../../services/authService';
import { ErrorService } from '../../services/errorService';

window.addEventListener('load', async() => {
  const isAuthenticated = await checkAuthentication();
  if (isAuthenticated) {
    navigate(Url.Base);
  }
});

const registerForm = document.querySelector<HTMLFormElement>('.form');
assertNonNull(registerForm);
registerForm.addEventListener('submit', async event => {
  event.preventDefault();
  const emailTextInput = document.querySelector<HTMLInputElement>('input[name="email"]');
  assertNonNull(emailTextInput);
  const firstNameTextInput = document.querySelector<HTMLInputElement>('input[name="first_name"]');
  assertNonNull(firstNameTextInput);
  const lastNameTextInput = document.querySelector<HTMLInputElement>('input[name="last_name"]');
  assertNonNull(lastNameTextInput);
  const passwordTextInput = document.querySelector<HTMLInputElement>('input[name="password"]');
  assertNonNull(passwordTextInput);
  const confirmPasswordTextInput = document.querySelector<HTMLInputElement>('input[name="confirm_password"]');
  assertNonNull(confirmPasswordTextInput);
  if (validateConfirmPassword(passwordTextInput.value, confirmPasswordTextInput.value)) {
    const registerData: Register = {
    email: emailTextInput.value,
    firstName: firstNameTextInput.value,
    lastName: lastNameTextInput.value,
    password: passwordTextInput.value,
    };
    try {
      await AuthService.register(registerData);
      navigate(Url.Base);
      } catch (error: unknown) {
      ErrorService.renderErrorMessage(error);
      }
  } else {
      const confirmationErrorText = 'The password confirmation does not match';
      ErrorService.createErrorElement(confirmPasswordTextInput, confirmationErrorText);
    }
});
