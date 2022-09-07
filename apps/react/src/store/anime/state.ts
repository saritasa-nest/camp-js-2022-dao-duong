import { Anime } from '@js-camp/core/models/anime/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeAdapter = createEntityAdapter<Anime>();

/** Anime state. */
export interface AnimeState {

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;

  /** Whether the anime is deleting or not. */
  readonly isDeleting: boolean;
}

export const initialState = animeAdapter.getInitialState<AnimeState>({
  isLoading: false,
  isDeleting: false,
});

export type State = typeof initialState;
