import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AnimeService } from '../services/animeService';

import { StorageService } from '../services/storageService';

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
    StorageService.set(PaginationLocalStorage.active, FIRST_PAGE);
    StorageService.set(PaginationLocalStorage.type, filterElement.value);
    const sortSetting = await StorageService.get<string>(PaginationLocalStorage.sort);
    const searchQuery = await StorageService.get<string>(PaginationLocalStorage.search);
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
