import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { api } from './API';
import { PaginationConfig } from './interfaces';

/**
 * Get anime data from the server.
 * @param PaginationConfig Option for request parameters.
 */
export const getAnime = async({ limit, page, sortSettings }: PaginationConfig): Promise<Pagination<Anime>> => {
  const offset: number = limit * (page - 1);
  const { data } = await api.get<PaginationDto<AnimeDto>>(
    `anime/anime/?limit=${limit}&offset=${offset}&ordering=${sortSettings.direction}${sortSettings.option}`,
  );
  return PaginationMapper.fromDto(data);
};
