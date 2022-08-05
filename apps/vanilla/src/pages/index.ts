import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { Navbar } from '../namespaces/navbar';
import { AuthService } from '../services/authService';

import { getAnime } from '../scripts/anime';
import { LIMIT, FIRST_PAGE } from '../scripts/variables';

import { renderTable } from '../scripts/animeTable';
import { renderSortOptions } from '../scripts/sort';
import { renderFilterOptions } from '../scripts/filter';
import { resetTableState } from '../scripts/functions';
import { initSearch } from '../scripts/search';

window.addEventListener('load', async() => {
  initHomepage();
  await AuthService.navigateToLoginIfNotAuthenticated();
  Navbar.renderNavbar();
});
const initHomepage = async(): Promise<void> => {
  resetTableState();
  localStorage.setItem('active', FIRST_PAGE.toString());
  localStorage.setItem('sort', '');
  localStorage.setItem('search', '');
  const paginationConfig: PaginationConfig = {
    limit: LIMIT,
    page: FIRST_PAGE,
    ordering: '',
    type: '',
    search: '',
  };
  const anime = await getAnime(paginationConfig);
  renderTable(anime);
  renderSortOptions();
  renderFilterOptions();
  initSearch();
};
