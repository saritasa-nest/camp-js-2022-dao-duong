import { Genre } from '@js-camp/core/models/anime';

/** Genres state. */
export interface GenresState {

  /** Error. */
  readonly error?: string;

  /** Whether the genres are loading or not. */
  readonly isLoading: boolean;

  /** Genres list. */
  readonly genres: Genre[];
}

export const initialState: GenresState = {
  isLoading: false,
  genres: [],
};
