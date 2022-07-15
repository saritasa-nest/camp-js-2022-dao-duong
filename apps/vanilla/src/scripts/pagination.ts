import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { LIMIT, FIRST_PAGE, HALF_NUMBER_OF_PAGES, NUMBER_OF_PAGES } from './variables';
import { renderAnimeTable } from './animeTable';

import { getAnime } from './anime';

/**
 * Render pagination.
 * @param pages Number of total pages.
 * */
export function renderPaginateButton(pages: number): void {
  const pageValueFromStorage = localStorage.getItem('active');
  assertNonNullish(pageValueFromStorage);
  const currentPage = parseInt(pageValueFromStorage, 10);
  const wrapper = document.querySelector<HTMLDivElement>('.pagination');
  assertNonNullish(wrapper);
  wrapper.innerHTML = ``;
  let maxLeft = (currentPage - HALF_NUMBER_OF_PAGES);
  let maxRight = (currentPage + HALF_NUMBER_OF_PAGES);

  if (maxLeft < FIRST_PAGE) {
    maxLeft = FIRST_PAGE;
    maxRight = NUMBER_OF_PAGES;
  }

  if (maxRight > pages) {
    maxLeft = pages - (NUMBER_OF_PAGES - FIRST_PAGE);

    if (maxLeft < FIRST_PAGE) {
      maxLeft = FIRST_PAGE;
    }
    maxRight = pages;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `
    <li index=${page} class="waves-effect pagination__item ${page === currentPage ? 'pagination__item-active' : ''}">
    ${page}
    </li>`;
  }
  wrapper.innerHTML = `
    <li index=${FIRST_PAGE} class="waves-effect pagination__item">First</li>
    ${wrapper.innerHTML}`;

  wrapper.innerHTML += `<li index=${pages} class="waves-effect pagination__item">Last</li>`;
  const paginateButton = document.querySelectorAll('.pagination__item');
  paginateButton.forEach(element => {
    element.addEventListener('click', async() => {
      const currentIndex = element.getAttribute('index');
      assertNonNullish(currentIndex);
      localStorage.setItem('active', currentIndex);
      const sortSetting = localStorage.getItem('sort');
      const filterType = localStorage.getItem('type');
      assertNonNullish(sortSetting);
      assertNonNullish(filterType);
      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: parseInt(currentIndex, 10),
        ordering: sortSetting,
        type: filterType,
      };
      const data = await getAnime(paginationConfig);
      renderAnimeTable(data);
    });
  });
}
