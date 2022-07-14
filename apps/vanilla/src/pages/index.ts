import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { renderFilterOptions } from '../scripts/filter';
import { resetState } from '../scripts/functions';

window.addEventListener('load', (): void => {
  initHomepage();
});

const initHomepage = async(): Promise<void> => {
  resetState();
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
    type: '',
  };

  const data = await getAnime(paginationConfig);

  renderAnimeTable(data);
  renderSortOptions();
  renderFilterOptions();
};
