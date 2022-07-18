import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { performSearching } from '../scripts/search';

window.addEventListener('load', (): void => {
  initHomepage();
});

const initHomepage = async(): Promise<void> => {
  localStorage.setItem('active', FIRST_PAGE.toString());
  localStorage.setItem('sort', '');
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
    search: '',
  };

  const data = await getAnime(paginationConfig);
  renderAnimeTable(data);
  renderSortOptions();
  performSearching();
};
