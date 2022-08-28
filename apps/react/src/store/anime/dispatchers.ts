import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnime = createAsyncThunk(
  'anime/fetch',
  (params: AnimeListQueryParams) => AnimeService.fetchAnime(params),
);

export const fetchNextAnime = createAsyncThunk(
  'anime/fetchNext',
  () => AnimeService.fetchNextAnime(),
);
