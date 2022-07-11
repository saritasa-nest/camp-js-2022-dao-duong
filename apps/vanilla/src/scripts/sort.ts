import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { renderAnimeTable } from './animeTable';
import { SORT_DIRECTIONS, SORT_OPTIONS, LIMIT, FIRST_PAGE } from './variables';
import { getAnime } from './anime';
import { setDirectionState, hasSortOption } from './functions';

/**  Render sort options.*/
export const renderSortOptions = (): void => {
  const sortOptions = document.querySelectorAll('.sort__selectElement');
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
    element.addEventListener('change', async(): Promise<void> => {
      localStorage.setItem('active', FIRST_PAGE.toString());
      const sortSetting = sortDirection.value + sortOption.value;
      localStorage.setItem('sort', sortSetting);
      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: FIRST_PAGE,
        ordering: sortSetting,
      };
      setDirectionState(hasSortOption(sortOption.value));
      const data: Pagination<Anime> = await getAnime(paginationConfig);
      renderAnimeTable(data);
    });
  });
};
