import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpError } from '@js-camp/core/models/httpError';

/** Error service. */
@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  /**
   * Change error from server to more readable error.
   * @param error Error from server.
   */
  public getError(error: unknown): HttpError {
    if (error instanceof HttpErrorResponse) {
      if (error.error !== undefined) {
        return HttpErrorMapper.fromDto(error.error);
      }
    }
    return new HttpError({ detail: 'Unknown error' });
  }

  /**
   * Change error from server to more readable error.
   * @param error Error from server.
   * @param form Form group to set error.
   */
  public showErrorToForm(error: HttpError, form: FormGroup): void {
    if (error.data) {
      Object.entries(error.data).forEach(([key, value]) => {
        if (key in form.controls) {
          form.controls[key].setErrors({
            [key]: value,
          });
      }
    });
    }
  }
}
