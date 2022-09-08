import {
  Anime,
  AnimeDetailPost,
} from '@js-camp/core/models/anime/';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AnimeService } from '../../api/services/animeService';

export const fetchAnimeDetail = createAsyncThunk(
  'animeDetail/fetch',
  (id: Anime['id']) => AnimeService.fetchAnimeById(id),
);

export const updateAnime = createAsyncThunk(
  'animeDetail/update',
  (updateParams: { id: Anime['id']; animeData: AnimeDetailPost; }) =>
    AnimeService.updateAnime(updateParams.id, updateParams.animeData),
);
