import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';

import { Url } from '../scripts/constants';
import { checkAuthentication, navigate, renderLogoutButton } from '../scripts/functions';

window.addEventListener('load', async(): Promise<void> => {
  const isAuthenticated = await checkAuthentication();
  if (isAuthenticated === false) {
    navigate(Url.Login);
  }
  initHomepage();
  renderLogoutButton();
});

const initHomepage = async(): Promise<void> => {
  localStorage.setItem('active', FIRST_PAGE.toString());
  localStorage.setItem('sort', '');
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
  };
  const data = await getAnime(paginationConfig);
  renderAnimeTable(data);
  renderSortOptions();
};
