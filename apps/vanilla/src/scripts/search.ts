import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AnimeService } from '../services/animeService';

import { PaginationLocalStorage } from './constants';
import { renderTable } from './animeTable';

import { FIRST_PAGE, LIMIT } from './variables';

/** Search feature. */
export function initSearch(): void {
  const searchFormElement = document.querySelector<HTMLFormElement>('.search');
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  assertNonNull(searchInputElement);
  assertNonNull(searchFormElement);

  searchFormElement.addEventListener('submit', async event => {
    event.preventDefault();
    localStorage.setItem(PaginationLocalStorage.active, FIRST_PAGE.toString());
    localStorage.setItem(PaginationLocalStorage.search, searchInputElement.value);
    const orderingOptions = localStorage.getItem(PaginationLocalStorage.sort);
    assertNonNull(orderingOptions);

    const paginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: orderingOptions,
      search: searchInputElement.value,
    };
    const animeList = await AnimeService.getAnime(paginationConfig);
    renderTable(animeList);
  });
}
