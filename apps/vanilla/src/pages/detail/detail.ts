import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Navbar } from '../../namespaces/navbar';
import { Utility } from '../../namespaces/utility';
import { CLICKED_ANIME } from '../../scripts/constants';

import { AnimeService } from '../../services/animeService';
import { AuthService } from '../../services/authService';

window.addEventListener('load', async() => {
  await AuthService.navigateByAuthorization();
  Navbar.renderNavbar();
  const id = localStorage.getItem(CLICKED_ANIME);
  assertNonNull(id);
  const data = await AnimeService.getAnimeDetail(id);
  renderImage(data.image);
  renderContent(data);
  if (data.youtubeTrailerId) {
    renderTrailerButton();
  }
  handleMediaClick(data.image, data.youtubeTrailerId);
});

/**
 * Render image.
 * @param url Url of the image.
 */
function renderImage(url: string): void {
  const mediaElement = document.querySelector('.anime-detail__media');
  assertNonNull(mediaElement);
  mediaElement.innerHTML += `<img src="${url}" class="anime-detail__image" alt="Anime Image"></img>`;
}

/** Render trailer. */
function renderTrailerButton(): void {
  const mediaElement = document.querySelector('.anime-detail__media');
  assertNonNull(mediaElement);
  mediaElement.innerHTML += `<button type="button" class="waves-effect waves-light btn trailer-btn">Watch Trailer!</button>
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
    <p>Type: ${data.type}</p>
    <p>Status: ${data.status}</p>
    <p>Synopsis: ${data.synopsis}</p>
    <p>Airing: ${data.airing}</p>
    <p>Aired Start: ${Utility.convertDate(data.aired.start)}</p>
    <p>Aired End: ${Utility.convertDate(data.aired.end)}</p>
    <p>Studio List: ${data.studioList.map(studio => studio.name)}</p>
    <p>Genre List: ${data.genreList.map(genre => genre.name)}</p>
  `;
}

/**
 * Open trailer.
 * @param youtubeId Youtube trailer Id.
 */
function openTrailer(youtubeId: string): void {
  const modalWrapper = document.querySelector<HTMLDivElement>('.modal-wrapper');
  const modalWrapperOverlay = document.querySelector<HTMLDivElement>('.modal-wrapper__overlay');
  const modalWrapperInner = document.querySelector<HTMLDivElement>('.modal-wrapper__inner');
  assertNonNull(modalWrapper);
  assertNonNull(modalWrapperOverlay);
  assertNonNull(modalWrapperInner);
  modalWrapper.classList.remove('hidden');
  modalWrapperInner.innerHTML = `
  <iframe src="https://www.youtube-nocookie.com/embed/${youtubeId}" title="Trailer" frameborder="0" allowfullscreen class="video"></iframe>
  `;
  const video = document.querySelector<HTMLIFrameElement>('.video');
  assertNonNull(video);
  modalWrapperOverlay.addEventListener('click', () => {
    video.setAttribute('src', '');
    modalWrapper.classList.add('hidden');
  });
}

/**
 * Open full size image.
 * @param imageURL Youtube trailer Id.
 */
function openFullSizeImage(imageURL: string): void {
  const modalWrapper = document.querySelector<HTMLDivElement>('.modal-wrapper');
  const modalWrapperOverlay = document.querySelector<HTMLDivElement>('.modal-wrapper__overlay');
  assertNonNull(modalWrapper);
  assertNonNull(modalWrapperOverlay);
  modalWrapper.classList.remove('hidden');
  const modalWrapperInner = document.querySelector<HTMLDivElement>('.modal-wrapper__inner');
  assertNonNull(modalWrapperInner);
  modalWrapperInner.innerHTML = `
  <img src="${imageURL}" alt="Anime Image" class="image"></img>
  `;
  modalWrapperOverlay.addEventListener('click', () => {
    modalWrapper.classList.add('hidden');
  });
}

/**
 * Handle media click .
 * @param imgUrl Image URL.
 * @param trailerUrl Trailer URL.
 * */
function handleMediaClick(imgUrl: string, trailerUrl: string | null): void {
  const imageElement = document.querySelector<HTMLImageElement>('.anime-detail__image');
  assertNonNull(imageElement);
  imageElement.addEventListener('click', () => openFullSizeImage(imgUrl));
  if (trailerUrl) {
    const trailerButton = document.querySelector('.trailer-btn');
    assertNonNull(trailerButton);
    trailerButton.addEventListener('click', () => openTrailer(trailerUrl));
  }
}
