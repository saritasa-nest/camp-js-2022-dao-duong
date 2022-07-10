import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { api } from './API';
import { PaginationConfig } from './interfaces';

/**
 * Get anime data from the server.
 * @param PaginationConfig Option for request parameters.
 */
export const getAnime = async({ limit, page, ordering }: PaginationConfig): Promise<Pagination<Anime>> => {
  const offset: number = limit * (page - 1);
  const params = new URLSearchParams({ limit: limit.toString(), offset: offset.toString(), ordering });
  const { data } = await api.get<PaginationDto<AnimeDto>>(
    `anime/anime/`, { params },
  );
  return PaginationMapper.fromDto<AnimeDto, Anime>(data, animeDto => AnimeMapper.fromDto(animeDto));
};
