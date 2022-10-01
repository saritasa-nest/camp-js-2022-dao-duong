import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { getError } from '../api/error';

export namespace ErrorService{

  /**
   * Create error text element.
   * @param errorElement Input element that contains error message.
   * @param err Error messages of the element.
   */
  export function displayErrorMessage(errorElement: HTMLInputElement | HTMLFormElement, err: string): void {
    const errorText = document.createElement('span');
    errorText.innerHTML = err;
    errorText.classList.add('input-error');
    errorElement.parentElement?.append(errorText);
  }

  /** Remove all error text element. */
  function removeAllErrorElement(): void {
    const inputErrorElementList = document.querySelectorAll<HTMLElement>('.input-error');
    if (inputErrorElementList !== null) {
      inputErrorElementList.forEach(errorElement => errorElement.remove());
    }
  }

  /**
   * Render error message to the form input field.
   * @param error Error message.
   */
  export function renderInputError(error: unknown): void {
    removeAllErrorElement();
    const errorMessages = getError(error);

    // Render error message detail
    const inputForm = document.querySelector<HTMLFormElement>('.form');
    assertNonNull(inputForm);
    displayErrorMessage(inputForm, errorMessages.detail);
    for (const err in errorMessages.data) {
      if (err === 'token' || err === 'non_field_errors') {
        errorMessages.data[err].map(errorMessage => {
          displayErrorMessage(inputForm, errorMessage);
        });
      } else {
        const textInput = document.querySelector<HTMLInputElement>(`input[name="${err}"]`);
        assertNonNull(textInput);
        assertNonNull(errorMessages.data);
        errorMessages.data[err].map(errorMessage => {
          displayErrorMessage(textInput, errorMessage);
      });
      }
    }
  }
}
