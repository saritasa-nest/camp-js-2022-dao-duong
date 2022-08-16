import { Sort } from '@angular/material/sort';
import { SortDirection, SortField } from '@js-camp/core/interfaces/sort';

export const SORT_FIELD_TO_DTO: Readonly<Record<string, SortField>> = {
  titleEng: SortField.EnglishTitle,
  status: SortField.Status,
  airedStart: SortField.AiredStart,
};
export namespace SortMapper {

  /**
   * Maps angular sort to string.
   * @param sortValue The sort value to change.
   */
  export function toParamsString(sortValue: Sort): string {
    const direction = sortValue.direction === 'desc' ? SortDirection.Descending : SortDirection.Ascending;
    const field = SORT_FIELD_TO_DTO[sortValue.active] ? SORT_FIELD_TO_DTO[sortValue.active] : '';
    return `${direction}${field}`;
  }
}
