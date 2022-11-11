import { HttpError } from '../models/httpError';

/** State for http request. */
export interface HttpRequestState<T> {

  /** Loading state. */
  isLoading: boolean;

  /** Value. */
  value?: T;

  /** Error. */
  error?: HttpError;
}
