import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimePage = createAsyncThunk(
  'anime_page/fetch',
  (params: AnimeListQueryParams) => AnimeService.fetchAnimePage(params),
);

export const fetchNextAnimePage = createAsyncThunk(
  'anime_page/fetchNext',
  () => AnimeService.fetchNextAnimePage(),
);
