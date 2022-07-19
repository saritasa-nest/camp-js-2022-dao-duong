import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/animeDetail.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { Pagination } from '@js-camp/core/models/pagination';

import { api } from '../api/api';

export namespace AnimeService {

  /**
   * Get anime data from the server.
   * @param PaginationConfig Option for request parameters.
   */
  export async function getAnime({ limit, page, ordering, search }: PaginationConfig): Promise<Pagination<Anime>> {
    const params = PaginationMapper.toDto({ limit, page, ordering, search });

    const { data } = await api.get<PaginationDto<AnimeDto>>(
      `anime/anime/`, { params },
    );
    return PaginationMapper.fromDto(data, animeDto => AnimeMapper.fromDto(animeDto));
  }

  /**
   * Get anime detail from the server.
   * @param id ID of the anime.
   */
  export async function getAnimeDetail(id: string): Promise<AnimeDetail> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { data } = await api.get(`anime/anime/${id}/`);
    return AnimeDetailMapper.fromDto(data);
  }
}