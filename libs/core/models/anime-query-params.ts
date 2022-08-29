import { AnimeSort, AnimeType } from './anime/anime';

/** Options for query params. */
export interface AnimeListQueryParams {

  /** Number of items per request. */
  readonly limit: number;

  /**  Current page base on total items and limit. */
  readonly page: number;

  /** Sort params for request query string. */
  readonly sort: AnimeSort;

  /** Query string. */
  readonly search: string | null;

  /** Filtering type. */
  readonly type: readonly AnimeType[];
}
