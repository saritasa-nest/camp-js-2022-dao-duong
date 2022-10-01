import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeDetailAdapter = createEntityAdapter<AnimeDetail>();

/** Anime state. */
export interface AnimeDetailState {

  /** Error. */
  readonly error?: string;

  /** Whether the anime are loading or not. */
  readonly isLoading: boolean;
}

export const initialState = animeDetailAdapter.getInitialState<AnimeDetailState>({
  isLoading: false,
});

export type State = typeof initialState;
