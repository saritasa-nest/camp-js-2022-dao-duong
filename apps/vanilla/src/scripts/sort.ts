import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { renderAnimeTable } from './animeTable';
import { SORT_DIRECTIONS, SORT_OPTIONS, LIMIT, FIRST_PAGE } from './variables';
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
      localStorage.setItem('active', FIRST_PAGE.toString());
      const sortSetting = sortDirection.value + sortOption.value;
      localStorage.setItem('sort', sortSetting);
      localStorage.setItem('active', FIRST_PAGE.toString());
      const filterType = localStorage.getItem('type');
      assertNonNullish(filterType);
      const searchQuery = localStorage.getItem('search');
      assertNonNullish(searchQuery);
      setDirectionState(hasSortOption(sortOption.value));
      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: FIRST_PAGE,
        ordering: sortSetting,
        type: filterType,
        search: searchQuery,
      };
      const data = await getAnime(paginationConfig);

      renderAnimeTable(data);
    });
  });
}
