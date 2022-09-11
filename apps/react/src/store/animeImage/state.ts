/** Anime state. */
export interface AnimeImageState {

  /** Error. */
  readonly error?: string;

  /** Whether the image is being uploaded or not. */
  readonly isUploading: boolean;

  /** Image URL. */
  readonly imageUrl: string;
}

export const initialState: AnimeImageState = {
  isUploading: false,
  imageUrl: '',
};
