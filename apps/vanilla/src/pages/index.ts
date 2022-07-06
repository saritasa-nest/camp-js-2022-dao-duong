import { getAnime } from '../composable/anime';
window.onload = (): void => {
  initialRender();
};
const LIMIT = 10;
const OFFSET_INITIAL_VALUE = 10;
let MAX_PAGE_LENGTH = 0;
let OFFSET = 0;
let TOTAL: number;
const initialRender = (): void =>{
  renderAnimeTable(OFFSET);
};
const dayConverter = (date: string): Date => new Date(date);

// Render anime table
const renderAnimeTable = async(offset: number): Promise<void> => {
  const data: IAnime = await getAnime(LIMIT, offset);
  const dataTable = document.querySelector('.anime-table') ?? document.body;
  TOTAL = data.count;
  MAX_PAGE_LENGTH = TOTAL / LIMIT;
  let tableBody = ``;
  data.results.forEach(anime => {
    tableBody += `
      <tr>
        <td>
          <img class="anime-image" src="${anime.image}" alt="Anime image">
        </td>
        <td>${anime.title_eng}</td>
        <td>${anime.title_jpn}</td>
        <td>${dayConverter(anime.aired.start).getFullYear()}</td>
        <td>${anime.type}</td>
        <td>${anime.status}</td>
      </tr>
    `;
  });
  dataTable.innerHTML = `
      <table class="responsive-table centered" >
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
  paginateButton(MAX_PAGE_LENGTH);
};

const state = {
  page: 1,
  window: 5,
  active: 1,
};

/** Render pagination.
 * @param pages Number of total pages.
 * */
function paginateButton(pages: number): void {
  const wrapper: HTMLDivElement = document.getElementById('pagination-wrapper');
  wrapper.innerHTML = ``;
  let maxLeft = (state.page - Math.floor(state.window / 2));
  let maxRight = (state.page + Math.floor(state.window / 2));

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = state.window;
  }

  if (maxRight > pages) {
    maxLeft = pages - (state.window - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = pages;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    wrapper.innerHTML += `<li index=${page} class="waves-effect paginate-number page ${state.active === page ? 'active' : ''}"><a href="#!">
    ${page}
      </a>
    </li>`;
  }
  wrapper.innerHTML = `
    <li id="left" index=1 class="waves-effect paginate page"><a>First</a></li>
    ${wrapper?.innerHTML}`;

  wrapper.innerHTML += `
  <li id="left" index=${pages} class="waves-effect paginate page"><a>Last</a></li>`;
  const pageBtn = document.querySelectorAll('.page');
  pageBtn.forEach(element => {
  element.addEventListener('click', () => {
    const currIndex = parseInt(element.getAttribute('index'), 10);
    state.page = currIndex;
    state.active = currIndex;
    if (OFFSET >= 0) {
      OFFSET = ((currIndex - 1) * OFFSET_INITIAL_VALUE);
      renderAnimeTable(OFFSET);
  }
  });
});
}
