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
import { NavigateService } from './navigate.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly apiService: ApiService,
    private readonly navigateService: NavigateService,
  ) {}

  /**
   * Fetch anime data from server.
   * @param config Configuration for request.
   */
  public fetchAnime(config: PaginationConfig): Observable<Pagination<Anime>> {
    const path = 'anime/anime/';
    const params = new HttpParams({
      fromObject: {
        ...PaginationMapper.toDto(config),
      },
    });
    return this.apiService
      .get<PaginationDto<AnimeDto>>(path, params)
      .pipe(
        map(animes =>
          PaginationMapper.fromDto(animes, animeDto =>
            AnimeMapper.fromDto(animeDto))),
      );
  }
}
