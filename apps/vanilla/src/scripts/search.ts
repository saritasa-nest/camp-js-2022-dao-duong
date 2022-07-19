import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { getAnime } from './anime';
import { renderAnimeTable } from './animeTable';

import { FIRST_PAGE, LIMIT, SEARCH_LS, SORT_LS, TYPE_LS } from './variables';

/** Search feature. */
export function initSearch(): void {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');
  const filterType = localStorage.getItem(TYPE_LS);
  assertNonNullish(searchInputElement);
  assertNonNullish(searchButtonElement);
  assertNonNullish(filterType);

  searchButtonElement.addEventListener('click', async() => {
    localStorage.setItem(SEARCH_LS, searchInputElement.value);
    const orderingOptions = localStorage.getItem(SORT_LS);
    assertNonNullish(orderingOptions);

    const paginationConfig: PaginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: orderingOptions,
      type: filterType,
      search: searchInputElement.value,
    };
    const data = await getAnime(paginationConfig);
    renderAnimeTable(data);
  });
}
