import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchGenres = createAsyncThunk(
  'genres/fetch',
  () => AnimeService.fetchGenres(),
);
