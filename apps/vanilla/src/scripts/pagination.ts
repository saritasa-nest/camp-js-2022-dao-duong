import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { PAGINATION_STATE, LIMIT, SORT_SETTINGS, FIRST_PAGE, HALF_NUMBER_OF_PAGES } from './variables';
import { renderAnimeTable } from './animeTable';

import { getAnime } from './anime';
import { PaginationOptions } from './interfaces';

/**
 * Render pagination.
 * @param pages Number of total pages.
 * */
export const renderPaginateButton = (pages: number): void => {
  const wrapper = document.querySelector<HTMLDivElement>('#pagination-wrapper');
  assertNonNullish(wrapper);
  wrapper.innerHTML = ``;
  let maxLeft = (PAGINATION_STATE.page - HALF_NUMBER_OF_PAGES);
  let maxRight = (PAGINATION_STATE.page + HALF_NUMBER_OF_PAGES);

  if (maxLeft < FIRST_PAGE) {
    maxLeft = FIRST_PAGE;
    maxRight = PAGINATION_STATE.window;
  }

  if (maxRight > pages) {
    maxLeft = pages - (PAGINATION_STATE.window - FIRST_PAGE);

    if (maxLeft < FIRST_PAGE) {
      maxLeft = FIRST_PAGE;
    }
    maxRight = pages;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `
    <li index=${page} class="waves-effect paginate-number page ${PAGINATION_STATE.active === page ? 'active' : ''}"><a href="#!">
    ${page}
      </a>
    </li>`;
  }
  wrapper.innerHTML = `
    <li id="left" index=1 class="waves-effect paginate page"><a>First</a></li>
    ${wrapper?.innerHTML}`;

  wrapper.innerHTML += `
  <li id="left" index=${pages} class="waves-effect paginate page"><a>Last</a></li>`;
  const paginateButton = document.querySelectorAll('.page');
  paginateButton.forEach(element => {
  element.addEventListener('click', async(): Promise<void> => {
    let currIndex = parseInt(element.getAttribute('index'));
    PAGINATION_STATE.page = currIndex;
    PAGINATION_STATE.active = currIndex;
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
