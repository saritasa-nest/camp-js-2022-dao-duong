import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { api } from './api';

/**
 * Get anime data from the server.
 * @param PaginationConfig Option for request parameters.
 */
export async function getAnime({ limit, page, ordering, search, type }: PaginationConfig): Promise<Pagination<Anime>> {
  const params = PaginationMapper.toDto({ limit, page, ordering, search, type });
  const animeResponse = await api.get<PaginationDto<AnimeDto>>(
    `anime/anime/`, { params },
  );

  return PaginationMapper.fromDto(animeResponse.data, animeDto => AnimeMapper.fromDto(animeDto));
}
