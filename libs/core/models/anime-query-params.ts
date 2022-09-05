import { AnimeSort, AnimeType } from './anime/anime';
import { AnimeDetail } from './anime/animeDetail';

/** Options for query params. */
export interface AnimeListQueryParams {

  /** Number of items per request. */
  readonly limit: number;

  /**  Current page base on total items and limit. */
  readonly page: number;

  /** Sort params for request query string. */
  readonly sort: AnimeSort;

  /** Query string. */
  readonly search: string;

  /** Filtering type. */
  readonly type: readonly AnimeType[];
}

/** Options for query params with id of the anime. */
export interface AnimeListQueryParamsWithId extends AnimeListQueryParams {

  /** Anime id. */
  id: AnimeDetail['id'] | null;
}
