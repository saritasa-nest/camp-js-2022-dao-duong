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

  const errorMessages = getError(error);

  // Render error message detail
  const inputForm = document.querySelector<HTMLFormElement>('.form');
  assertNonNull(inputForm);
  createErrorElement(inputForm, errorMessages.detail);
  for (const err in errorMessages.data) {
    if (Object.prototype.hasOwnProperty.call(errorMessages.data, err)) {
      const textInput = document.querySelector<HTMLInputElement>(`input[name="${err}"]`);
      assertNonNull(textInput);
      assertNonNull(errorMessages.data);
      errorMessages.data[err].forEach(errorMessage => {
        if (err === 'token' || err === 'non_field_errors') {
        createErrorElement(inputForm, errorMessage);

        }
        createErrorElement(textInput, errorMessage);
});
    }
  }
}
