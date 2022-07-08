import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { PAGINATION_STATE, LIMIT, SORT_SETTINGS, FIRST_PAGE, HALF_NUMBER_OF_PAGES } from './variables';
import { renderAnimeTable } from './animeTable';

import { getAnime } from './anime';
import { PaginationConfig, PaginationState } from './interfaces';

/**
 * Render pagination.
 * @param pages Number of total pages.
 * */
export const renderPaginateButton = (pages: number): void => {
  const wrapper = document.querySelector<HTMLDivElement>('.pagination');
  const paginationState: PaginationState = PAGINATION_STATE;
  assertNonNullish(wrapper);
  wrapper.innerHTML = ``;
  let maxLeft = (paginationState.page - HALF_NUMBER_OF_PAGES);
  let maxRight = (paginationState.page + HALF_NUMBER_OF_PAGES);

  if (maxLeft < FIRST_PAGE) {
    maxLeft = FIRST_PAGE;
    maxRight = paginationState.displayPages;
  }

  if (maxRight > pages) {
    maxLeft = pages - (paginationState.displayPages - FIRST_PAGE);

    if (maxLeft < FIRST_PAGE) {
      maxLeft = FIRST_PAGE;
    }
    maxRight = pages;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `
    <li index=${page} class="waves-effect pagination__item ${paginationState.page === page ? 'active' : ''}">
    ${page}
    </li>`;
  }
  wrapper.innerHTML = `
    <li index=${FIRST_PAGE} class="waves-effect pagination__item">First</li>
    ${wrapper.innerHTML}`;

  wrapper.innerHTML += `<li index=${pages} class="waves-effect pagination__item">Last</li>`;
  const paginateButton = document.querySelectorAll('.pagination__item');
  paginateButton.forEach(element => {
  element.addEventListener('click', async(): Promise<void> => {
    const currIndex = element.getAttribute('index');
    assertNonNullish(currIndex);

    paginationState.page = parseInt(currIndex, 10);

    const paginationConfig: PaginationConfig = {
      limit: LIMIT,
      page: parseInt(currIndex, 10),
      ordering: SORT_SETTINGS,
    };
    const data: Pagination<Anime> = await getAnime(paginationConfig);
    renderAnimeTable(data);
  });
});
};
