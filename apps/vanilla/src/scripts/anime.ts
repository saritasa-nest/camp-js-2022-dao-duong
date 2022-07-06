import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { api } from './API';

export const getAnime = async(limit: number, offset: number): Promise<Pagination<Anime>> => {
  const { data } = await api.get<PaginationDto<AnimeDto>>(`anime/anime/?limit=${limit}&offset=${offset}`);
  return PaginationMapper.fromDto(data);
};
