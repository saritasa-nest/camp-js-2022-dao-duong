import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchStudios = createAsyncThunk(
  'studios/fetch',
  () => AnimeService.fetchStudios(),
);
