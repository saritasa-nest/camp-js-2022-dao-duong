import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';

import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { ApiService } from './api.service';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(private apiService: ApiService) {}

  /**
   * Get service.
   * @param options Pagination options.
   **/
  public fetchAnime(options: PaginationConfig): Observable<Pagination<Anime>> {

    // Handle params
    const params = new HttpParams({
      fromObject: {
        ...PaginationMapper.toDto(options),
      },
    });

    const animeResponse$ = this.apiService.get<PaginationDto<AnimeDto>>(
      `anime/anime/`,
      params,
    );
    return animeResponse$.pipe(
      map(animes =>
        PaginationMapper.fromDto(animes, animeDto =>
          AnimeMapper.fromDto(animeDto))),
    );
  }
}
