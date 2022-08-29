import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Anime } from '@js-camp/core/models/anime/anime';

import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';

import { http } from '..';

export namespace AnimeService {
  const URL = 'anime/anime/';
  let nextUrl: string | null = null;

  /**
   * Fetches a list of anime.
   * @param queryParams Anime query parameters for the request.
   */
  export async function fetchAnime(queryParams: AnimeListQueryParams): Promise<readonly Anime[]> {

    const animeResponse = await http.get<PaginationDto<AnimeDto>>(URL, {
      params: AnimeQueryParamsMapper.toDto(queryParams),
    });
    const animePage = PaginationMapper.fromDto(animeResponse.data, animeDto =>
      AnimeMapper.fromDto(animeDto));
    setNextUrl(animePage.next);
    return animePage.results;
  }

  /** Fetch next page of anime list. */
  export async function fetchNextAnime(): Promise<readonly Anime[] | null> {
    if (nextUrl === null) {
      return null;
    }

    const animeResponse = await http.get<PaginationDto<AnimeDto>>(nextUrl);
    const animePage = PaginationMapper.fromDto(animeResponse.data, animeDto =>
      AnimeMapper.fromDto(animeDto));
    setNextUrl(animePage.next);
    return animePage.results;
  }

  /**
   * Set the next url for the next page.
   * @param url The next url.
   */
  function setNextUrl(url: string | null) {
    nextUrl = url;
  }
}
