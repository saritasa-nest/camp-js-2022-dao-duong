import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { PaginationConfig } from '../scripts/interfaces';

window.addEventListener('load', (): void => {
  initialRender();
});

const initialRender = async(): Promise<void> => {
  localStorage.setItem('active', FIRST_PAGE.toString());
  localStorage.setItem('sort', '');
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
  };

  const data: Pagination<Anime> = await getAnime(paginationConfig);
  renderAnimeTable(data);
  renderSortOptions();
};
