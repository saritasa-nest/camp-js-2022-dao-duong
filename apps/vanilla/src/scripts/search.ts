import { PaginationConfig } from '@js-camp/core/interfaces/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { getAnime } from './anime';
import { renderAnimeTable } from './animeTable';

import { FIRST_PAGE, LIMIT } from './variables';

/** Search feature. */
export function performSearching(): void {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search_input');
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search_button');
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
    const data = await getAnime(paginationConfig);
    renderAnimeTable(data);
  });
}
