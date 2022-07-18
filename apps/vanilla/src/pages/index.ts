import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { AnimeService } from '../services/animeService';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { initSearch } from '../scripts/search';

import { Url } from '../scripts/constants';
import { checkAuthentication, navigate, renderNavbar } from '../scripts/functions';

window.addEventListener('load', async(): Promise<void> => {
  const isAuthenticated = await checkAuthentication();
  if (isAuthenticated === false) {
    navigate(Url.Login);
  }
  initHomepage();
  renderNavbar();
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
  const data = await AnimeService.getAnime(paginationConfig);
  renderAnimeTable(data);
  renderSortOptions();
  initSearch();
};
