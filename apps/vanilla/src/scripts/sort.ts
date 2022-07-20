import { assertNonNull } from '@js-camp/core/utils/assertNonNull';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { AnimeService } from '../services/animeService';

import { Utility } from '../namespaces/utility';

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

  Utility.setDirectionState(Utility.hasSortOption(sortOption.value));
  sortOptions.forEach(element => {
    element.addEventListener('change', async() => {
      const sortSetting = sortDirection.value + sortOption.value;
      localStorage.setItem(PaginationLocalStorage.sort, sortSetting);

      Utility.setDirectionState(Utility.hasSortOption(sortOption.value));
      const currentPage = localStorage.getItem(PaginationLocalStorage.active);
      const searchQuery = localStorage.getItem(PaginationLocalStorage.search);
      assertNonNull(searchQuery);
      assertNonNull(currentPage);

      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: parseInt(currentPage, 10),
        ordering: sortSetting,
        search: searchQuery,
      };
      const anime = await AnimeService.getAnime(paginationConfig);

      renderTable(anime);
    });
  });
}
