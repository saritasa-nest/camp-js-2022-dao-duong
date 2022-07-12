import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getError } from '../api/error';

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

/** Remove all error text element.*/
function removeAllErrorElement(): void {
  const inputErrorElementList = document.querySelectorAll('.input-error');
  if (inputErrorElementList !== null) {
    inputErrorElementList.forEach(errorElement => errorElement.remove());
  }
}

/**
 * Render error message to the form input field.
 * @param error Error message.
 */
export function renderErrorMessage(error: unknown): void {
  removeAllErrorElement();
  const errorMessages = getError(error);

  // Render error message detail
  const inputForm = document.querySelector<HTMLFormElement>('.form');
  assertNonNull(inputForm);
  createErrorElement(inputForm, errorMessages.detail);
  for (const err in errorMessages.data) {
    if (Object.prototype.hasOwnProperty.call(errorMessages.data, err)) {
      if (err === 'token' || err === 'non_field_errors') {
        errorMessages.data[err].forEach(errorMessage => {
          createErrorElement(inputForm, errorMessage);
        });
      } else {
        const textInput = document.querySelector<HTMLInputElement>(`input[name="${err}"]`);
        assertNonNull(textInput);
        assertNonNull(errorMessages.data);
        errorMessages.data[err].forEach(errorMessage => {
          createErrorElement(textInput, errorMessage);
  });
      }
    }
  }
}
