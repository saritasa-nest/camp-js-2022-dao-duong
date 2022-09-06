import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimePage = createAsyncThunk(
  'animePage/fetch',
  (params: AnimeListQueryParams) => AnimeService.fetchAnimePage(params),
);

export const fetchNextAnimePage = createAsyncThunk(
  'animePage/fetchNext',
  () => AnimeService.fetchNextAnimePage(),
);
