import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';

import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

import { ApiConfigService } from './api-config.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService,
  ) {}

  /**
   * Fetch anime data from server.
   * @param queryParams Query params for the request.
   */
  public fetchAnime(queryParams: AnimeListQueryParams): Observable<Pagination<Anime>> {
    const path = 'anime/anime/';
    const params = new HttpParams({
      fromObject: {
        ...AnimeQueryParamsMapper.toDto(queryParams),
      },
    });
    return this.http
      .get<PaginationDto<AnimeDto>>(`${this.apiConfig.apiUrl}${path}`, { params })
      .pipe(
        map(animes =>
          PaginationMapper.fromDto(animes, animeDto =>
            AnimeMapper.fromDto(animeDto))),
      );
  }
}
