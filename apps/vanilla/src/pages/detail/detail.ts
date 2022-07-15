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
  if (data.youtubeTrailerId) {
    renderTrailerButton(data.youtubeTrailerId);
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
    document.body.innerHTML += `<img src="${url}" alt="Anime Image"></img>`;
  });
}

/**
 * Render trailer.
 * @param youtubeId Youtube trailer Id.
 */
function renderTrailerButton(youtubeId: string): void {
  const mediaElement = document.querySelector('.anime-detail__media');
  assertNonNull(mediaElement);
  mediaElement.innerHTML += `<button type="button" class="trailer-btn">Watch Trailer!</button>
  `;
  const trailerButton = document.querySelector('.trailer-btn');
  assertNonNull(trailerButton);
  trailerButton.addEventListener('click', () => openTrailer(youtubeId));
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

/**
 * Open trailer.
 * @param youtubeId Youtube trailer Id.
 */
function openTrailer(youtubeId: string): void {
  const videoWrapper = document.querySelector<HTMLDivElement>('.video-wrapper');
  assertNonNull(videoWrapper);
  const videoWrapperOverlay = document.querySelector<HTMLDivElement>('.video-wrapper__overlay');
  assertNonNull(videoWrapperOverlay);
  videoWrapper.classList.remove('hidden');
  const videoWrapperInner = document.querySelector<HTMLDivElement>('.video-wrapper__inner');
  assertNonNull(videoWrapperInner);
  const video = document.querySelector<HTMLIFrameElement>('.video');
  assertNonNull(video);
  const trailerURL = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
  video.setAttribute('src', trailerURL);
  videoWrapperOverlay.addEventListener('click', () => {
  video.setAttribute('src', '');
    videoWrapper.classList.add('hidden');
  });
}
