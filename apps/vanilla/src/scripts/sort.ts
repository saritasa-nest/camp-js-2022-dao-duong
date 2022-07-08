import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { renderAnimeTable } from './animeTable';
import { PAGINATION_STATE, SORT_SETTINGS, SORT_DIRECTION, SORT_OPTIONS, LIMIT, FIRST_PAGE } from './variables';
import { getAnime } from './anime';
import { changeDirectionState, hasSortOption } from './functions';
import { PaginationOptions } from './interfaces';

/**  Render sort options.*/
export const renderSortOptions = (): void => {
  const sortOptions = document.querySelectorAll('.sort');
  const sortOption = document.querySelector<HTMLSelectElement>('#sort-option');
  const sortDirection = document.querySelector<HTMLSelectElement>('#sort-direction');
  assertNonNullish(sortOption);
  assertNonNullish(sortDirection);
    sortOption.innerHTML = ``;
    sortDirection.innerHTML = ``;

    SORT_OPTIONS.forEach(option => {
      sortOption.innerHTML += `<option value="${option.value}" class="sort-option">${option.text}</option>`;
    });

    SORT_DIRECTION.forEach(direction => {
      sortDirection.innerHTML += `<option value="${direction.value}" class="sort-option">${direction.text}</option>`;
    });
    changeDirectionState(hasSortOption(SORT_SETTINGS.option));
    sortOptions.forEach(element => {
      element.addEventListener('change', async(): Promise<void> => {
        PAGINATION_STATE.page = FIRST_PAGE;
        PAGINATION_STATE.active = FIRST_PAGE;
        SORT_SETTINGS.direction = sortDirection.value;
        SORT_SETTINGS.option = sortOption.value;
        changeDirectionState(hasSortOption(SORT_SETTINGS.option));
        const paginationOptions: PaginationOptions = {
          limit: LIMIT,
          page: PAGINATION_STATE.page,
          sortSettings: SORT_SETTINGS,
        };
        const data: Pagination<Anime> = await getAnime(paginationOptions);
        renderAnimeTable(data);
      });
    });
};
