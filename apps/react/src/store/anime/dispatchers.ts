import { Anime, AnimeDetailPost } from '@js-camp/core/models/anime';
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

export const deleteAnime = createAsyncThunk(
  'anime/delete',
  (id: Anime['id']) => {
    AnimeService.deleteAnime(id);
    return id;
  },
);

export const updateAnime = createAsyncThunk(
  'animeDetail/update',
  (updateParams: { id: Anime['id']; animeData: AnimeDetailPost; }) =>
    AnimeService.updateAnime(updateParams.id, updateParams.animeData),
);
