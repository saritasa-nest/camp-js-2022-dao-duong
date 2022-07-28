import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { renderTable } from './animeTable';
import { SORT_DIRECTIONS, SORT_OPTIONS, LIMIT, ACTIVE_LS, SEARCH_LS, TYPE_LS } from './variables';
import { getAnime } from './anime';
import { setDirectionState, hasSortOption } from './functions';

/** Render sort options. */
export function renderSortOptions(): void {
  const sortOptions = document.querySelectorAll('.sort__select-element');
  const sortOption = document.querySelector<HTMLSelectElement>('.sort__option');
  const sortDirection = document.querySelector<HTMLSelectElement>('.sort__direction');

  assertNonNullish(sortOption);
  assertNonNullish(sortDirection);
  sortOption.innerHTML = ``;
  sortDirection.innerHTML = ``;
  SORT_OPTIONS.forEach(option => {
    sortOption.innerHTML += `<option value="${option.value}" class="select__option">${option.text}</option>`;
  });
  SORT_DIRECTIONS.forEach(direction => {
    sortDirection.innerHTML += `<option value="${direction.value}" class="select__option">${direction.text}</option>`;
  });

  setDirectionState(hasSortOption(sortOption.value));
  sortOptions.forEach(element => {
    element.addEventListener('change', async() => {
      const sortSetting = sortDirection.value + sortOption.value;
      localStorage.setItem('sort', sortSetting);

      setDirectionState(hasSortOption(sortOption.value));
      const currentPage = localStorage.getItem(ACTIVE_LS);
      const searchQuery = localStorage.getItem(SEARCH_LS);
      const filterType = localStorage.getItem(TYPE_LS);
      assertNonNullish(filterType);
      assertNonNullish(searchQuery);
      assertNonNullish(currentPage);
      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: parseInt(currentPage, 10),
        ordering: sortSetting,
        type: filterType,
        search: searchQuery,
      };
      const animeList = await getAnime(paginationConfig);

      renderTable(animeList);
    });
  });
}
