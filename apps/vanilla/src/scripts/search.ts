import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { getAnime } from './anime';
import { renderTable } from './animeTable';

import { FIRST_PAGE, LIMIT } from './variables';

/** Search feature. */
export function initSearch(): void {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');
  assertNonNullish(searchInputElement);
  assertNonNullish(searchButtonElement);

  searchButtonElement.addEventListener('click', async() => {
    localStorage.setItem('search', searchInputElement.value);
    const orderingOptions = localStorage.getItem('sort');
    assertNonNullish(orderingOptions);

    const paginationConfig: PaginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: orderingOptions,
      search: searchInputElement.value,
    };
    const animeList = await getAnime(paginationConfig);

    renderTable(animeList);
  });
}
