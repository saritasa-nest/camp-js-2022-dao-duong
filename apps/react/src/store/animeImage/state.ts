import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeDetailAdapter = createEntityAdapter<AnimeDetail>();

/** Anime state. */
export interface AnimeDetailState {

  /** Error. */
  readonly error?: string;

  /** Whether the image is being uploaded or not. */
  readonly isUploading: boolean;

  /** Image URL. */
  imageUrl: string;
}

export const initialState = animeDetailAdapter.getInitialState<AnimeDetailState>({
  isUploading: false,
  imageUrl: '',
});

export type State = typeof initialState;
