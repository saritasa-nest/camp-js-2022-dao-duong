import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';

import { environment } from '../../environments/environment';

/** Api service. */
@Injectable({
  providedIn: 'root',
})

export class AnimeService {
  public constructor(private http: HttpClient) {}

  private formatErrors(error: string): Error {
    return new Error(error);
  }

  /**
   * Get service.
   * @param path Url path.
   * @param params Parameters for request.
   **/
  public getAnime(params: HttpParams = new HttpParams()): Observable<Pagination<Anime>> {
    const animeResponse$ = this.http.get<PaginationDto<AnimeDto>>(`${environment.api_url}anime/anime/`, { params });
    return animeResponse$.pipe(map(animes => PaginationMapper.fromDto(animes, animeDto => AnimeMapper.fromDto(animeDto))));
  }
}
