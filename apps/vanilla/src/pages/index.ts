import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { renderFilterOptions } from '../scripts/filter';
import { resetTableState } from '../scripts/functions';
import { initSearch } from '../scripts/search';

window.addEventListener('load', (): void => {
  initHomepage();
});

const initHomepage = async(): Promise<void> => {
  resetTableState();
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
    type: '',
    search: '',
  };

  const data = await getAnime(paginationConfig);

  renderAnimeTable(data);
  renderSortOptions();
  renderFilterOptions();
  initSearch();
};
