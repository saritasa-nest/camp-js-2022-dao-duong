import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { AnimeService } from '../services/animeService';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderAnimeTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { initSearch } from '../scripts/search';

import { Navbar } from '../namespaces/navbar';
import { AuthService } from '../services/authService';
import { PaginationLocalStorage } from '../scripts/constants';

window.addEventListener('load', async(): Promise<void> => {
  await AuthService.navigateByAuthorization();
  Navbar.renderNavbar();
  initHomepage();
});

const initHomepage = async(): Promise<void> => {
  localStorage.setItem(PaginationLocalStorage.active, FIRST_PAGE.toString());
  localStorage.setItem(PaginationLocalStorage.sort, '');
  localStorage.setItem(PaginationLocalStorage.search, '');
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
