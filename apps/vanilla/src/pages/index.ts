import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { getAnime } from '../scripts/anime';
import { SORT_SETTINGS, LIMIT, PAGINATION_STATE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { PaginationOptions } from '../scripts/interfaces';

window.addEventListener('load', (): void => {
  initialRender();
});

const initialRender = async(): Promise<void> => {
  const paginationOptions: PaginationOptions = {
    limit: LIMIT,
    page: PAGINATION_STATE.page,
    sortSettings: SORT_SETTINGS,
  };

  const data: Pagination<Anime> = await getAnime(paginationOptions);
  renderAnimeTable(data);
  renderSortOptions();
};
