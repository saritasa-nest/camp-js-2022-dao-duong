import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { getAnime } from './anime';
import { renderAnimeTable } from './animeTable';

import { FILTERING_TYPES, FIRST_PAGE, LIMIT } from './variables';

/** Render filtering.*/
export function renderFilterOptions(): void {
  const filterElement = document.querySelector<HTMLSelectElement>('.filter__select-type');
  assertNonNullish(filterElement);
  FILTERING_TYPES.forEach(type => {
    filterElement.innerHTML += `<option value="${type.value}" class="type">${type.text}</option>`;
  });
  filterElement.addEventListener('change', async() => {
    /* Get and set pagination configuration */
    localStorage.setItem('active', FIRST_PAGE.toString());
    localStorage.setItem('type', filterElement.value);
    const sortSetting = localStorage.getItem('sort');
    const searchQuery = localStorage.getItem('search');
    assertNonNullish(sortSetting);
    assertNonNullish(searchQuery);

    /* Get anime data */
    const paginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: sortSetting,
      type: filterElement.value,
      search: searchQuery,
    };
    const data = await getAnime(paginationConfig);

    renderAnimeTable(data);
  });
}
