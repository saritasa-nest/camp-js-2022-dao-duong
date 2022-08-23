import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';

import { Pagination } from '@js-camp/core/models/pagination';

import { http } from '..';

const url = 'anime/anime/';

export namespace AnimeService {

  /** Fetches a list of genres. */
  export async function fetchAnime({
    limit,
    page,
    sort,
    search,
    type,
  }: AnimeListQueryParams): Promise<Pagination<Anime>> {
    const params = AnimeQueryParamsMapper.toDto({
      limit,
      page,
      sort,
      search,
      type,
    });

    const animeResponse = await http.get<PaginationDto<AnimeDto>>(url, {
      params,
    });
    return PaginationMapper.fromDto(animeResponse.data, animeDto =>
      AnimeMapper.fromDto(animeDto));
  }
}
