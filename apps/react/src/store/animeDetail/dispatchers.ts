import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeDetail = createAsyncThunk(
  'anime_detail/fetch',
  (id: AnimeDetail['id']) => AnimeService.fetchAnimeById(id),
);
