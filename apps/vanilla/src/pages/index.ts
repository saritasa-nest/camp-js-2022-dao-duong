import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { getAnime } from '../scripts/anime';
import { SORT_SETTINGS, LIMIT, PAGINATION_STATE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { PaginationConfig } from '../scripts/interfaces';

window.addEventListener('load', (): void => {
  initialRender();
});

const initialRender = async(): Promise<void> => {
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: PAGINATION_STATE.page,
    ordering: SORT_SETTINGS,
  };

  const data: Pagination<Anime> = await getAnime(paginationConfig);
  renderAnimeTable(data);
  renderSortOptions();
};
