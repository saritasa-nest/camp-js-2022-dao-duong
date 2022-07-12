import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getError } from '../api/error';

import { StorageService } from '../services/storageService';

import { Token, Url } from './constants';
import { Helpers } from './helpers';

/** Check whether the user authenticated or not.*/
export function isAuthenticated(): boolean {
  return StorageService.get(Token.Access) !== null;
}

/** Render logout button. */
export function renderLogoutButton(): void {
  const { body } = document;
  body.innerHTML += `
    <nav class="navbar">
      <button class="logout-btn btn_right">Logout</button>
    </nav>
  `;
  const logoutButton = document.querySelector('.logout-btn');
  assertNonNull(logoutButton);
  logoutButton.addEventListener('click', () => {
    Helpers.clearToken();
    navigate(Url.Login);
});
}

/**
 *Navigation functions.
 *@param url Url to navigate to.
 */
export function navigate(url: Url): void {
  window.location.href = url;
}

/** Validate password.
 * @param password Password to validate.
 * @param confirmPassword Password to validate.
 */
export function validateConfirmPassword(password: string, confirmPassword: string): boolean {
  return (password === confirmPassword);
}

/**
 * Create error text element.
 * @param errorElement Input element that contains error message.
 * @param err Error messages of the element.
 */
function createErrorElement(errorElement: HTMLInputElement | HTMLFormElement, err: string): void {
  const errorText = document.createElement('span');
  errorText.innerHTML = err;
  errorText.classList.add('input-error');
  errorElement.parentElement?.append(errorText);
}

/**
 * Render error message to the form input field.
 * @param error Error message.
 */
export function renderErrorMessage(error: unknown): void {

  const errorMessage = getError(error);

  // Render error message detail
  const inputForm = document.querySelector<HTMLFormElement>('.form');
  assertNonNull(inputForm);
  createErrorElement(inputForm, errorMessage.detail);

  // Render password error message
  if (errorMessage.data?.password) {
    const passwordTextInput = document.querySelector<HTMLInputElement>('input[name="password"]');
    assertNonNull(passwordTextInput);
    errorMessage.data?.password.forEach(err => createErrorElement(passwordTextInput, err));
  }

  // Render email error message
  if (errorMessage.data?.email) {
    const passwordTextInput = document.querySelector<HTMLInputElement>('input[name="email"]');
    assertNonNull(passwordTextInput);
    errorMessage.data?.email.forEach(err => createErrorElement(passwordTextInput, err));
  }

  // Render first name error message
  if (errorMessage.data?.first_name) {
    const firstNameTextInput = document.querySelector<HTMLInputElement>('input[name="first-name"]');
    assertNonNull(firstNameTextInput);
    errorMessage.data?.first_name.forEach(err => createErrorElement(firstNameTextInput, err));
  }

  // Render last name error message
  if (errorMessage.data?.last_name) {
    const lastNameTextInput = document.querySelector<HTMLInputElement>('input[name="last-name"]');
    assertNonNull(lastNameTextInput);
    errorMessage.data?.last_name.forEach(err => createErrorElement(lastNameTextInput, err));
  }

  // Render avatar error message
  if (errorMessage.data?.avatar) {
    const avatarTextInput = document.querySelector<HTMLInputElement>('input[name="avatar"]');
    assertNonNull(avatarTextInput);
    errorMessage.data?.avatar.forEach(err => createErrorElement(avatarTextInput, err));
  }

  // Render non field errors
  if (errorMessage.data?.non_field_errors) {
    errorMessage.data?.non_field_errors.forEach(err => createErrorElement(inputForm, err));
  }
}
