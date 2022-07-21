import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { AnimeService } from '../services/animeService';

import { hasSortOption } from '../utils/hasSortOption';

import { setDirectionState } from '../utils/setDirectionState';

import { StorageService } from '../services/storageService';

import { PaginationLocalStorage } from './constants';
import { renderTable } from './animeTable';
import { SORT_DIRECTIONS, SORT_OPTIONS, LIMIT } from './variables';

/** Render sort options. */
export function renderSortOptions(): void {
  const sortOptions = document.querySelectorAll('.sort__select-element');
  const sortOption = document.querySelector<HTMLSelectElement>('.sort__option');
  const sortDirection = document.querySelector<HTMLSelectElement>('.sort__direction');
  assertNonNull(sortOption);
  assertNonNull(sortDirection);
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
      const currentPage = await StorageService.get<number>(PaginationLocalStorage.active);
      const searchQuery = await StorageService.get<string>(PaginationLocalStorage.search);
      StorageService.set<string>(PaginationLocalStorage.sort, sortSetting);
      assertNonNull(searchQuery);
      assertNonNull(currentPage);
      setDirectionState(hasSortOption(sortOption.value));

      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: currentPage,
        ordering: sortSetting,
        search: searchQuery,
      };
      const animeList = await AnimeService.getAnime(paginationConfig);
      renderTable(animeList);
    });
  });
}
