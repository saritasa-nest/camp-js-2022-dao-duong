import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';

import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { AnimeDetailDto } from '@js-camp/core/dtos/anime/animeDetail.dto';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/animeDetail.mapper';

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
   * @param config Configuration for request.
   */
  public fetchAnime(config: PaginationConfig): Observable<Pagination<Anime>> {
    const path = 'anime/anime/';
    const params = new HttpParams({
      fromObject: {
        ...PaginationMapper.toDto(config),
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

  /**
   * Fetch anime data by id from server.
   * @param animeId Id of the anime.
   */
  public fetchAnimeById(animeId: AnimeDetail['id']): Observable<AnimeDetail> {
    const path = `anime/anime/${animeId}/`;
    return this.http
      .get<AnimeDetailDto>(`${this.apiConfig.apiUrl}${path}`)
      .pipe(map(anime => AnimeDetailMapper.fromDto(anime)));
  }

  /**
   * Delete anime from server.
   * @param animeId Id of the anime.
   */
  public deleteAnime(animeId: number): Observable<void> {
    const path = `anime/anime/${animeId}/`;
    return this.http.delete(`${this.apiConfig.apiUrl}${path}`).pipe(map(() => void 0));
  }
}
