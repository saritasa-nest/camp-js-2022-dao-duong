import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { getAnime } from '../scripts/anime';
import { SORT_SETTINGS, LIMIT, PAGINATION_STATE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';

window.onload = (): void => {
  initialRender();
};

const initialRender = async(): Promise<void> => {
  const data: Pagination<Anime> = await getAnime(LIMIT, PAGINATION_STATE.page, SORT_SETTINGS);
  renderAnimeTable(data);
  renderSortOptions();
};
