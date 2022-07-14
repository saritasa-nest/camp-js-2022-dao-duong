import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { getAnime } from './anime';
import { renderAnimeTable } from './animeTable';

import { FILTERING_TYPES, FIRST_PAGE, LIMIT } from './variables';

/**  Render filtering.*/
export function renderFilterOptions(): void {
  const filterElement = document.querySelector<HTMLSelectElement>('.filter__select-type');
  assertNonNullish(filterElement);
  FILTERING_TYPES.forEach(type => {
    filterElement.innerHTML += `<option value="${type.value}" class="type">${type.text}</option>`;
  });
  filterElement.addEventListener('change', async(): Promise<void> => {
    localStorage.setItem('active', FIRST_PAGE.toString());
      const sortSetting = localStorage.getItem('sort');
      assertNonNullish(sortSetting);
      localStorage.setItem('type', filterElement.value);
      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: FIRST_PAGE,
        ordering: sortSetting,
        type: filterElement.value,
      };
      const data = await getAnime(paginationConfig);
      renderAnimeTable(data);
  });
}
