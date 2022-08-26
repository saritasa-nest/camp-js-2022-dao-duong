import { Anime } from '@js-camp/core/models/anime/anime';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeAdapter = createEntityAdapter<Anime>({
  selectId: anime => anime.id,
});

/** Anime state. */
export interface AnimeState {

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = animeAdapter.getInitialState<AnimeState>({
  isLoading: false,
});

export type State = typeof initialState;
