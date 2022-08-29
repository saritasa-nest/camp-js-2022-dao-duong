import { PaginationOptionsDto } from '../dtos/pagination.dto';
import { AnimeListQueryParams } from '../models/anime-query-params';
import { SortDirectionDto, AnimeSortFieldDto, AnimeTypeDto } from '../dtos/anime/anime.dto';
import { AnimeSortField, AnimeType } from '../models/anime/anime';

export const SORT_FIELD_TO_DTO_MAP: Readonly<Record<AnimeSortField, AnimeSortFieldDto>> = {
  [AnimeSortField.EnglishTitle]: AnimeSortFieldDto.EnglishTitle,
  [AnimeSortField.Aired]: AnimeSortFieldDto.AiredStart,
  [AnimeSortField.Status]: AnimeSortFieldDto.Status,
  [AnimeSortField.None]: AnimeSortFieldDto.None,
};

export const ANIME_TYPE_TO_DTO_MAP: Readonly<Record<AnimeType, AnimeTypeDto>> = {
  [AnimeType.Movie]: AnimeTypeDto.Movie,
  [AnimeType.Music]: AnimeTypeDto.Music,
  [AnimeType.Ona]: AnimeTypeDto.Ona,
  [AnimeType.Ova]: AnimeTypeDto.Ova,
  [AnimeType.Special]: AnimeTypeDto.Special,
  [AnimeType.Tv]: AnimeTypeDto.Tv,
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
      AnimeSortFieldDto.None;
    const types = params.type ? params.type.map(type => ANIME_TYPE_TO_DTO_MAP[type]).toString() : '';
    return {
      limit: params.limit.toString(),
      offset,
      ordering: `${sortDirection}${sortField}`,
      search: params.search ?? '',
      type__in: types,
    } as PaginationOptionsDto;
  }
}
