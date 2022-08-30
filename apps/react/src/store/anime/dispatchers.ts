import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeList = createAsyncThunk(
  'anime_list/fetch',
  (params: AnimeListQueryParams) => AnimeService.fetchAnimeList(params),
);

export const fetchNextAnimeList = createAsyncThunk(
  'anime_list/fetchNext',
  () => AnimeService.fetchNextAnimeList(),
);
