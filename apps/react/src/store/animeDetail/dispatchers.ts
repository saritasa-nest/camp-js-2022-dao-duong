import {
  Anime,
} from '@js-camp/core/models/anime/';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeDetail = createAsyncThunk(
  'animeDetail/fetch',
  (id: Anime['id']) => AnimeService.fetchAnimeById(id),
);
