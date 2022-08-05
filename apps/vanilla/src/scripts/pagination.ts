import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';
import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { LIMIT, FIRST_PAGE, NUMBER_OF_PAGES, ACTIVE_LS, SEARCH_LS, SORT_LS, TYPE_LS } from './variables';
import { renderTable } from './animeTable';

import { getAnime } from './anime';

/** Half number of pages to display.*/
const HALF_NUMBER_OF_PAGES = Math.floor(NUMBER_OF_PAGES / 2);

/**
 * Render pagination.
 * @param displayPages Number of pages to display.
 */
export function renderPagination(displayPages: number): void {
  const pageValueFromStorage = localStorage.getItem(ACTIVE_LS);
  assertNonNullish(pageValueFromStorage);
  const currentPage = parseInt(pageValueFromStorage, 10);
  const wrapper = document.querySelector<HTMLDivElement>('.pagination');
  assertNonNullish(wrapper);
  wrapper.innerHTML = ``;
  let firstDisplayPage = (currentPage - HALF_NUMBER_OF_PAGES);
  let lastDisplayPage = (currentPage + HALF_NUMBER_OF_PAGES);

  if (firstDisplayPage < FIRST_PAGE) {
    firstDisplayPage = FIRST_PAGE;
    lastDisplayPage = NUMBER_OF_PAGES;
  }

  if (lastDisplayPage > displayPages) {
    firstDisplayPage = displayPages - (NUMBER_OF_PAGES - FIRST_PAGE);
    if (firstDisplayPage < FIRST_PAGE) {
      firstDisplayPage = FIRST_PAGE;
    }
    lastDisplayPage = displayPages;
  }

  for (let page = firstDisplayPage; page <= lastDisplayPage; page++) {
    wrapper.innerHTML += `
    <li>
      <button index=${page}  class="btn waves-effect pagination__button ${page === currentPage ? 'pagination__button-active' : ''}">
        ${page}
      </button>
    </li>`;
  }
  wrapper.innerHTML = `
  <li>
    <button index=${FIRST_PAGE}  class="btn waves-effect pagination__button">
      First
    </button>
  </li>${wrapper.innerHTML}`;

  wrapper.innerHTML += `
  <li>
    <button index=${displayPages}  class="btn waves-effect pagination__button">
      Last
    </button>
  </li>`;
  const paginateButton = document.querySelectorAll('.pagination__button');
  paginateButton.forEach(element => {
    element.addEventListener('click', async() => {
      const currentIndex = element.getAttribute('index');
      assertNonNullish(currentIndex);
      localStorage.setItem(ACTIVE_LS, currentIndex);
      const sortSetting = localStorage.getItem(SORT_LS);
      const filterType = localStorage.getItem(TYPE_LS);
      const searchQuery = localStorage.getItem(SEARCH_LS);
      assertNonNullish(sortSetting);
      assertNonNullish(filterType);
      assertNonNullish(searchQuery);

      const paginationConfig: PaginationConfig = {
        limit: LIMIT,
        page: parseInt(currentIndex, 10),
        ordering: sortSetting,
        type: filterType,
        search: searchQuery,
      };
      const animeList = await getAnime(paginationConfig);

      renderTable(animeList);
    });
  });
}
