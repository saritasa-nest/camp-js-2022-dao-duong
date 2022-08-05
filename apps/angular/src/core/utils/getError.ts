import { HttpError } from '@js-camp/core/models/httpError';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Get the error message.
 * @param error Error from the server.
 */
export function getError(error: unknown): HttpError {
  if (error instanceof HttpErrorResponse) {
    if (error.error !== undefined) {
      return HttpErrorMapper.fromDto(error.error);
    }
  }

  return new HttpError({ detail: 'Unknown error' });
}
