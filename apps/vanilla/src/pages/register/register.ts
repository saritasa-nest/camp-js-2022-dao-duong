import { Register } from '@js-camp/core/models/auth/register';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Utility } from '../../namespaces/utility';

import { Url } from '../../scripts/constants';

import { AuthService } from '../../services/authService';
import { ErrorService } from '../../services/errorService';

window.addEventListener('load', async() => {
  await AuthService.navigateByAuthorization();
});

const registerForm = document.querySelector<HTMLFormElement>('.form');
assertNonNull(registerForm);
registerForm.addEventListener('submit', async event => {
  event.preventDefault();
  const formElement = document.querySelector<HTMLFormElement>('.form');
  assertNonNull(formElement);
  const formData = new FormData(formElement);
  const email = formData.get('email');
  const firstName = formData.get('first_name');
  const lastName = formData.get('last_name');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm_password');
  assertNonNull(email);
  assertNonNull(firstName);
  assertNonNull(lastName);
  assertNonNull(password);
  assertNonNull(confirmPassword);

  if (validateConfirmPassword(password.toString(), confirmPassword.toString())) {
    const registerData: Register = {
      email: email.toString(),
      firstName: firstName.toString(),
      lastName: lastName.toString(),
      password: password.toString(),
    };
    try {
      await AuthService.register(registerData);
      Utility.navigate(Url.Home);
    } catch (error: unknown) {
      ErrorService.renderInputError(error);
    }
  } else {
      const confirmPasswordInput = document.querySelector<HTMLInputElement>('input[name=confirm_password]');
      assertNonNull(confirmPasswordInput);
      const confirmationErrorText = 'The password confirmation does not match';
      ErrorService.displayErrorMessage(confirmPasswordInput, confirmationErrorText);
    }
});

/**
 * Validate password.
 * @param password Password to validate.
 * @param confirmPassword Confirm password to validate.
 */
function validateConfirmPassword(password: string, confirmPassword: string): boolean {
  return (password === confirmPassword);
}
