import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AnimeService } from '../services/animeService';

import { renderAnimeTable } from './animeTable';

import { FIRST_PAGE, LIMIT } from './variables';

/** Search feature. */
export function initSearch(): void {
  const searchInputElement = document.querySelector<HTMLInputElement>('.search__input');
  const searchButtonElement = document.querySelector<HTMLButtonElement>('.search__button');
  assertNonNull(searchInputElement);
  assertNonNull(searchButtonElement);

  searchButtonElement.addEventListener('click', async() => {
    localStorage.setItem('active', FIRST_PAGE.toString());
    localStorage.setItem('search', searchInputElement.value);
    const orderingOptions = localStorage.getItem('sort');
    assertNonNull(orderingOptions);

    const paginationConfig = {
      limit: LIMIT,
      page: FIRST_PAGE,
      ordering: orderingOptions,
      search: searchInputElement.value,
    };
    const data = await AnimeService.getAnime(paginationConfig);
    renderAnimeTable(data);
  });
}
