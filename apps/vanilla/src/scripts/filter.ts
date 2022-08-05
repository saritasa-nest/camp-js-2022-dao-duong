import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AnimeService } from '../services/animeService';

import { renderTable } from './animeTable';

import { FIRST_PAGE, LIMIT, FILTERING_TYPES } from './variables';

import { PaginationLocalStorage } from './constants';

/** Render filtering.*/
export function renderFilterOptions(): void {
  const filterElement = document.querySelector<HTMLSelectElement>('.filter__select-type');
  assertNonNull(filterElement);
  FILTERING_TYPES.forEach(type => {
    filterElement.innerHTML += `<option value="${type.value}" class="type">${type.text}</option>`;
  });
  filterElement.addEventListener('change', async() => {
    localStorage.setItem(PaginationLocalStorage.active, FIRST_PAGE.toString());
    localStorage.setItem(PaginationLocalStorage.type, filterElement.value);
    const sortSetting = localStorage.getItem(PaginationLocalStorage.sort);
    const searchQuery = localStorage.getItem(PaginationLocalStorage.search);
    assertNonNull(sortSetting);
    assertNonNull(searchQuery);

    const paginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: sortSetting,
      type: filterElement.value,
      search: searchQuery,
    };
    const animeList = await AnimeService.getAnime(paginationConfig);
    renderTable(animeList);
  });
}
