import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { AnimeService } from '../../services/animeService';

window.addEventListener('load', async() => {
  const id = localStorage.getItem('CLICKED_ANIME_ID');
  assertNonNull(id);
  const test: AnimeDetail = await AnimeService.getAnimeDetail(id);
  console.log(test);
  renderImage(test);
});

function renderImage(data) {
  const content = document.querySelector('.detail__content');
  content.innerHTML = `<img src="${data.image}"></img>`;
}
