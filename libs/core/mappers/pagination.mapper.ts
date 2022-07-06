import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';
import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { AnimeMapper } from './anime.mapper';
export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination dto.
   */
  export function fromDto(dto: PaginationDto<AnimeDto>): Pagination<Anime> {
    return new Pagination<Anime>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(result => AnimeMapper.fromDto(result)),
    });
  }
}
