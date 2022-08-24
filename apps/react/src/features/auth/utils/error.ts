import { HttpError } from '@js-camp/core/models/httpError';

/** Transformed error for fields. */
export interface TransformedError {

  /** Field error key - value. */
  readonly fieldsError: {
    [field: string]: string;
  };
}

/**
 * Transform error.
 * @param error Error object to transform.
 */
export function transformError(error: HttpError): TransformedError {
  const fieldsError: { [field: string]: string; } = {};
  if (error.data) {
    Object.entries(error.data).forEach(([key, value]) => {
      fieldsError[key] = value.toString();
    });
  }
  return { fieldsError };
}
