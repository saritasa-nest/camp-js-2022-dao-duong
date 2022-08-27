import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';

import { http } from '..';

const url = 'anime/anime/';

export namespace AnimeService {

  /**
   * Fetches a list of genres.
   * @param queryParams Anime query parameters for the request.
   */
  export async function fetchAnime(queryParams: AnimeListQueryParams): Promise<readonly Anime[]> {

    const animeResponse = await http.get<PaginationDto<AnimeDto>>(url, {
      params: AnimeQueryParamsMapper.toDto(queryParams),
    });
    const animePage = PaginationMapper.fromDto(animeResponse.data, animeDto =>
      AnimeMapper.fromDto(animeDto));
    return animePage.results;
  }
}
