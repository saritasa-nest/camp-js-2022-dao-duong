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

import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { AnimeDetailDto } from '@js-camp/core/dtos/anime/animeDetail.dto';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/animeDetail.mapper';

import { ApiService } from './api.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  public constructor(
    private readonly apiService: ApiService,
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
    return this.apiService.get<PaginationDto<AnimeDto>>(
      path,
      params,
    ).pipe(
      map(animes =>
        PaginationMapper.fromDto(animes, animeDto =>
          AnimeMapper.fromDto(animeDto))),
    );
  }

  /**
   * Fetch anime data by id from server.
   * @param animeId Id of the anime.
   */
  public fetchAnimeById(animeId: number): Observable<AnimeDetail> {
    const path = `anime/anime/${animeId}/`;
    return this.apiService.get<AnimeDetailDto>(path).pipe(map(anime => AnimeDetailMapper.fromDto(anime)));
  }

  /**
   * Delete anime from server.
   * @param animeId Id of the anime.
   */
  public deleteAnime(animeId: number): Observable<void> {
    const path = `anime/anime/`;
    return this.apiService.delete(path, animeId).pipe(map(() => void 0));
  }
}
