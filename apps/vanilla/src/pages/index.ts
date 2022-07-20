import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { initSearch } from '../scripts/search';

window.addEventListener('load', (): void => {
  initHomepage();
});

const initHomepage = async(): Promise<void> => {
  localStorage.setItem('active', FIRST_PAGE.toString());
  localStorage.setItem('sort', '');
  localStorage.setItem('search', '');
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
    search: '',
  };

  const anime = await getAnime(paginationConfig);
  renderTable(anime);
  renderSortOptions();
  initSearch();
};
