/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { assertNonNull } from '@js-camp/core/utils/assertNonNull';

import { Navbar } from '../../namespaces/navbar';
import { CLICKED_ANIME } from '../../scripts/constants';

import { AnimeService } from '../../services/animeService';
import { AuthService } from '../../services/authService';
import { StorageService } from '../../services/storageService';

window.addEventListener('load', async() => {
  await AuthService.navigateByAuthorization();
  await Navbar.render();
  const params = new URLSearchParams(window.location.search);
  const animeId = await StorageService.get<string>(CLICKED_ANIME) || params.get('id');
  assertNonNull(animeId);
  const animeDetail = await AnimeService.getAnimeDetail(animeId);
  renderTitle(animeDetail.englishTitle || animeDetail.japaneseTitle);
  AnimeService.renderImage(animeDetail.image);
  AnimeService.renderContent(animeDetail);
  if (animeDetail.youtubeTrailerId) {
    AnimeService.renderTrailerButton();
  }
  AnimeService.handleMediaClick(animeDetail.image, animeDetail.youtubeTrailerId);
});

/**
 * Render title for detail page.
 * @param title Title of the anime.
 */
export function renderTitle(title: string | null): void {
  const { body } = document;
  const titleElement = document.createElement('h1');
  titleElement.classList.add('title');
  titleElement.innerHTML = title ? title : 'Detail page';
  body.prepend(titleElement);
}
