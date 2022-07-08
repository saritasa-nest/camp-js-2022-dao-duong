import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { renderAnimeTable } from './animeTable';
import { PAGINATION_STATE, SORT_DIRECTIONS, SORT_OPTIONS, LIMIT, SORT_SETTINGS, FIRST_PAGE } from './variables';
import { getAnime } from './anime';
import { setDirectionState, hasSortOption } from './functions';
import { PaginationState, SortSetting, PaginationConfig } from './interfaces';

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
    setDirectionState(hasSortOption(SORT_SETTINGS.option));
    sortOptions.forEach(element => {
      element.addEventListener('change', async(): Promise<void> => {
        const paginationState: PaginationState = PAGINATION_STATE;
        const ordering: SortSetting = {
          ...SORT_SETTINGS,
          direction: sortDirection.value,
          option: sortOption.value,
        };
        PAGINATION_STATE.page = FIRST_PAGE;
        SORT_SETTINGS.direction = sortDirection.value;
        SORT_SETTINGS.option = sortOption.value;

        setDirectionState(hasSortOption(ordering.option));
        const paginationConfig: PaginationConfig = {
          limit: LIMIT,
          page: paginationState.page,
          ordering,
        };
        const data: Pagination<Anime> = await getAnime(paginationConfig);
        renderAnimeTable(data);
      });
    });
};
