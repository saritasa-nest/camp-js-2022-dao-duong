import { HttpErrorDto } from '../dtos/httpError.dto';
import { HttpError } from '../models/httpError';

export namespace HttpErrorMapper {

  /**
   * Maps dto to model.
   * @param error HttpError dto.
   */
  export function fromDto(error: HttpErrorDto): HttpError {
    return new HttpError({
      detail: error.detail,
      data: error.data,
      code: error.code,
    });
  }
}
