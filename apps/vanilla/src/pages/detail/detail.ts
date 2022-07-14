import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Url } from '../../scripts/constants';

import { checkAuthentication, dateConverter, navigate, renderLogoutButton } from '../../scripts/functions';

import { AnimeService } from '../../services/animeService';

window.addEventListener('load', async() => {
  const isAuthenticated = await checkAuthentication();
  if (isAuthenticated === false) {
    navigate(Url.Login);
  }
  const id = localStorage.getItem('CLICKED_ANIME_ID');
  assertNonNull(id);
  const data = await AnimeService.getAnimeDetail(id);
  renderLogoutButton();
  renderImage(data.image);
  renderContent(data);
  console.log(data.youtubeTrailerId);

  if (data.youtubeTrailerId) {
    renderTrailer(data.youtubeTrailerId);
  }
});

/**
 * Render image.
 * @param url Url of the image.
 */
function renderImage(url: string): void {
  const mediaElement = document.querySelector('.anime-detail__media');
  assertNonNull(mediaElement);
  mediaElement.innerHTML += `<img src="${url}" class="anime-detail__image" alt="Anime Image"></img>`;
  const imageElement = document.querySelector<HTMLImageElement>('.anime-detail__image');

  assertNonNull(imageElement);
  imageElement.addEventListener('click', () => {
    console.log('1');

    document.body.innerHTML += `<img src="${url}" alt="Anime Image"></img>`;
  });
}

/**
 * Render trailer.
 * @param youtubeId Youtube trailer Id.
 */
function renderTrailer(youtubeId: string): void {
  const mediaElement = document.querySelector('.anime-detail__media');
  assertNonNull(mediaElement);
  mediaElement.innerHTML += `<button type="button" class="trailer-btn">Watch Trailer!</button>
  <iframe src="https://www.youtube.com/embed/${youtubeId}" title="Trailer"></iframe>
  `;
}

/**
 * Render content.
 * @param data Anime data.
 */
function renderContent(data: AnimeDetail): void {
  const contentElement = document.querySelector<HTMLDivElement>('.anime-detail__content');
  assertNonNull(contentElement);
  contentElement.innerHTML = `
    <p>English Title: ${data.englishTitle}</p>
    <p>Japanese Title: ${data.japaneseTitle}</p>
    <p>Type Title: ${data.type}</p>
    <p>Status: ${data.status}</p>
    <p>Synopsis: ${data.synopsis}</p>
    <p>Airing: ${data.airing}</p>
    <p>Aired Start: ${dateConverter(data.aired.start)}</p>
    <p>Aired End: ${dateConverter(data.aired.end)}</p>
    <p>Studio List: ${data.studioList.map(studio => studio.name)}</p>
    <p>Genre List: ${data.genreList.map(genre => genre.name)}</p>
  `;
}
