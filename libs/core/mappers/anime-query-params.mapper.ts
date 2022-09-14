import { PaginationOptionsDto } from '../dtos/pagination.dto';
import { AnimeListQueryParams } from '../models/anime-query-params';
import { SortDirectionDto, AnimeSortFieldDto } from '../dtos/anime/anime.dto';
import { AnimeSortField } from '../models/anime/anime';

export const SORT_FIELD_TO_DTO_MAP: Readonly<Record<AnimeSortField, AnimeSortFieldDto>> = {
  [AnimeSortField.EnglishTitle]: AnimeSortFieldDto.EnglishTitle,
  [AnimeSortField.Aired]: AnimeSortFieldDto.AiredStart,
  [AnimeSortField.Status]: AnimeSortFieldDto.Status,
  [AnimeSortField.None]: AnimeSortFieldDto.None,
};

export namespace AnimeQueryParamsMapper {

  /**
   * Maps model to dto.
   * @param params Pagination configuration.
   */
  export function toDto(params: AnimeListQueryParams): PaginationOptionsDto {
    const offset = (params.limit * params.page).toString();
    const sortDirection = params.sort.direction === 'desc' ? SortDirectionDto.Descending : SortDirectionDto.Ascending;
    const sortField = SORT_FIELD_TO_DTO_MAP[params.sort.field] !== undefined ?
      SORT_FIELD_TO_DTO_MAP[params.sort.field] :
      '';
    return {
      limit: params.limit.toString(),
      offset,
      ordering: `${sortDirection}${sortField}`,
      search: params.search ?? '',
      type__in: params.type ? params.type.toString() : '',
    } as PaginationOptionsDto;
  }
}
