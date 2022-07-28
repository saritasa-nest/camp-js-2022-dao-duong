import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { getAnime } from './anime';
import { renderTable } from './animeTable';

import { ACTIVE_LS, FILTERING_TYPES, FIRST_PAGE, LIMIT, SEARCH_LS, SORT_LS, TYPE_LS } from './variables';

/** Render filtering.*/
export function renderFilterOptions(): void {
  const filterElement = document.querySelector<HTMLSelectElement>('.filter__select-type');
  assertNonNullish(filterElement);
  FILTERING_TYPES.forEach(type => {
    filterElement.innerHTML += `<option value="${type.value}" class="type">${type.text}</option>`;
  });
  filterElement.addEventListener('change', async() => {
    localStorage.setItem(ACTIVE_LS, FIRST_PAGE.toString());
    localStorage.setItem(TYPE_LS, filterElement.value);
    const sortSetting = localStorage.getItem(SORT_LS);
    const searchQuery = localStorage.getItem(SEARCH_LS);
    assertNonNullish(sortSetting);
    assertNonNullish(searchQuery);

    const paginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: sortSetting,
      type: filterElement.value,
      search: searchQuery,
    };
    const data = await getAnime(paginationConfig);

    renderTable(data);
  });
}
