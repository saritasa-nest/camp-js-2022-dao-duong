import { Anime } from '@js-camp/core/models/anime/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { convertDate } from '../utils/convertDate';
import { navigate } from '../utils/navigate';

import { CLICKED_ANIME, Url } from './constants';

import { renderPagination } from './pagination';
import { LIMIT } from './variables';

/**
 * Render anime table.
 * @param animeList Data for rendering.
 */
export function renderTable(animeList: Pagination<Anime>): void {
  const animeTable = document.querySelector<HTMLDivElement>('.anime-table');
  assertNonNull(animeTable);
  const tableBody = animeList.results.reduce((previousBody: string, anime: Anime): string => `${previousBody}
    <tr data-id=${anime.id}>
      <td>
        <img class="anime-image" src="${anime.image}" alt="Anime image">
      </td>
      <td>${anime.englishTitle}</td>
      <td>${anime.japaneseTitle}</td>
      <td>${convertDate(anime.aired.start)}</td>
      <td>${anime.type}</td>
      <td>${anime.status}</td>
    </tr>`, '');
  animeTable.innerHTML = `
    <table class="responsive-table centered highlight" >
      <thead>
        <tr>
          <th>Image</th>
          <th>English Title</th>
          <th>Japanese Title</th>
          <th>Aired Start</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${tableBody}
      </tbody>
    </table>
  `;
  const totalPages = Math.ceil(animeList.count / LIMIT);
  renderPagination(totalPages);
  handleAnimeClick();
}

/** Handle click on anime rows. */
export function handleAnimeClick(): void {
  const animeTableRows = document.querySelectorAll<HTMLTableRowElement>('tbody tr');
  assertNonNull(animeTableRows);
  animeTableRows.forEach(animeRow => {
    animeRow.addEventListener('click', () => {
      const animeId = animeRow.getAttribute('data-id');
      assertNonNull(animeId);
      localStorage.setItem(CLICKED_ANIME, animeId);
      navigate(Url.Detail);
    });
  });
}
