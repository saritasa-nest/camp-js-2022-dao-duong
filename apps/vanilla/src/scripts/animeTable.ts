import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { assertNonNullish } from '@js-camp/core/utils/assertNonNullish';

import { dateConverter } from '../scripts/functions';

import { renderPaginateButton } from './pagination';
import { LIMIT } from './variables';

/**
 * Render anime table.
 * @param dataset Data for render.
 */
export const renderAnimeTable = (dataset: Pagination<Anime>): void => {
  const dataTable = document.querySelector<HTMLDivElement>('.anime-table');
  assertNonNullish(dataTable);
  const tableBody = dataset.results.reduce((previousValue: string, currentValue: Anime): string => `${previousValue}
    <tr>
         <td>
           <img class="anime-image" src="${currentValue.image}" alt="Anime image">
         </td>
         <td>${currentValue.englishTitle}</td>
         <td>${currentValue.japaneseTitle}</td>
         <td>${dateConverter(currentValue.aired.start)}</td>
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
    </table>
  `;
  const totalPages = dataset.count / LIMIT;
  renderPaginateButton(totalPages);
};
