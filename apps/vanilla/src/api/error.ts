import axios, { AxiosError } from 'axios';
import { HttpError } from '@js-camp/core/models/httpError';
import { HttpErrorMapper } from '@js-camp/core/mappers/httpError.mapper';
import { HttpErrorDto } from '@js-camp/core/dtos/httpError.dto';

/**
 * Get the error message.
 * @param error Error from the server.
 */
export function getError(error: unknown): HttpError {
  if (axios.isAxiosError(error)) {
    const httpError = error as AxiosError<HttpErrorDto>;
    if (httpError.response !== undefined) {
      return HttpErrorMapper.fromDto(httpError.response.data);
    }
  }

  return new HttpError({ detail: 'Unknown error' });
}
