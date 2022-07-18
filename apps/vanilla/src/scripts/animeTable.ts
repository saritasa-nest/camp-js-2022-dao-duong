import { Anime } from '@js-camp/core/models/anime/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { convertDate, navigate } from '../scripts/functions';

import { Url } from './constants';

import { renderPagination } from './pagination';
import { LIMIT } from './variables';

/**
 * Render anime table.
 * @param dataset Data for render.
 */
export function renderAnimeTable(dataset: Pagination<Anime>): void {
  const dataTable = document.querySelector<HTMLDivElement>('.anime-table');
  assertNonNull(dataTable);
  const tableBody = dataset.results.reduce((previousValue: string, currentValue: Anime): string => `${previousValue}
    <tr data-id = "${currentValue.id}">
         <td>
           <img class="anime-image" src="${currentValue.image}" alt="Anime image">
         </td>
         <td>${currentValue.englishTitle}</td>
         <td>${currentValue.japaneseTitle}</td>
         <td>${convertDate(currentValue.aired.start)}</td>
         <td>${currentValue.type}</td>
         <td>${currentValue.status}</td>
       </tr>
    `, '');
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
      </table>`;
  const totalPages = Math.ceil(dataset.count / LIMIT);
  renderPagination(totalPages);
  const animeTableRows = document.querySelectorAll<HTMLTableRowElement>('tbody tr');
  assertNonNull(animeTableRows);
  animeTableRows.forEach(anime => {
    anime.addEventListener('click', () => {
      const animeId = anime.getAttribute('data-id');
      assertNonNull(animeId);
      localStorage.setItem('CLICKED_ANIME_ID', animeId);
      navigate(Url.Detail);
    });
  });
}
