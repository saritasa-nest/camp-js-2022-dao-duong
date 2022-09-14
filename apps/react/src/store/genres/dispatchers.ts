import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genresService';

export const fetchGenres = createAsyncThunk(
  'genres/fetch',
  () => GenresService.fetchGenres(),
);

export const addGenre = createAsyncThunk(
  'genres/add',
  (genreName: string) => GenresService.addGenre(genreName),
);
