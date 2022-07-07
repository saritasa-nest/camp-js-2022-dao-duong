import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';

import { PAGINATION_STATE, LIMIT, SORT_SETTINGS } from './variables';
import { renderAnimeTable } from './animeTable';

import { getAnime } from './anime';

/** Render pagination.
 * @param pages Number of total pages.
 * */
export const paginateButton = (pages: number): void => {
  const wrapper: HTMLDivElement = document.getElementById('pagination-wrapper');
  wrapper.innerHTML = ``;
  let maxLeft = (PAGINATION_STATE.page - Math.floor(PAGINATION_STATE.window / 2));
  let maxRight = (PAGINATION_STATE.page + Math.floor(PAGINATION_STATE.window / 2));

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = PAGINATION_STATE.window;
  }

  if (maxRight > pages) {
    maxLeft = pages - (PAGINATION_STATE.window - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
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
  const pageBtn = document.querySelectorAll('.page');
  pageBtn.forEach(element => {
  element.addEventListener('click', async(): Promise<void> => {
    const currIndex = parseInt(element.getAttribute('index'), 10);
    PAGINATION_STATE.page = currIndex;
    PAGINATION_STATE.active = currIndex;
    const data: Pagination<Anime> = await getAnime(LIMIT, PAGINATION_STATE.page, SORT_SETTINGS);
    renderAnimeTable(data);
  });
});
};
