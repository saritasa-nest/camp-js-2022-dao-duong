import { Anime } from '@js-camp/core/models/anime/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Utility } from '../namespaces/utility';

import { CLICKED_ANIME, Url } from './constants';

import { renderPagination } from './pagination';
import { LIMIT } from './variables';

/**
 * Render anime table.
 * @param dataset Data for rendering.
 */
export function renderTable(dataset: Pagination<Anime>): void {
  const dataTable = document.querySelector<HTMLDivElement>('.anime-table');
  assertNonNull(dataTable);
  const tableBody = dataset.results.reduce((previousBody: string, currentData: Anime): string => `${previousBody}
    <tr data-id=${currentData.id}>
      <td>
        <img class="anime-image" src="${currentData.image}" alt="Anime image">
      </td>
      <td>${currentData.englishTitle}</td>
      <td>${currentData.japaneseTitle}</td>
      <td>${Utility.convertDate(currentData.aired.start)}</td>
      <td>${currentData.type}</td>
      <td>${currentData.status}</td>
    </tr>`, '');
  dataTable.innerHTML = `
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
  const totalPages = Math.ceil(dataset.count / LIMIT);
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
      Utility.navigate(Url.Detail);
    });
  });
}
