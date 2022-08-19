import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeDto, Status } from '@js-camp/core/dtos/anime/anime.dto';
import { Pagination } from '@js-camp/core/models/pagination';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime/anime.mapper';

import { PaginationConfig } from '@js-camp/core/interfaces/pagination';

import { AnimeDetail } from '@js-camp/core/models/anime/animeDetail';
import { AnimeDetailDto, Rating, Season, Source } from '@js-camp/core/dtos/anime/animeDetail.dto';
import { AnimeDetailMapper } from '@js-camp/core/mappers/anime/animeDetail.mapper';

import { Genre } from '@js-camp/core/models/anime/genre';
import { GenreDto } from '@js-camp/core/dtos/anime/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/anime/genre.mapper';
import { Studio } from '@js-camp/core/models/anime/studio';
import { StudioDto } from '@js-camp/core/dtos/anime/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/anime/studio.mapper';

import { AnimeType } from '@js-camp/core/utils/types/animeType';

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
  public deleteAnime(animeId: AnimeDetail['id']): Observable<void> {
    const path = `anime/anime/${animeId}/`;
    return this.http.delete(`${this.apiConfig.apiUrl}${path}`).pipe(map(() => void 0));
  }

  /**
   * Delete anime from server.
   * @param animeId Id of the anime.
   * @param animeData Anime data to be updated.
   */
  public updateAnime(animeId: number, animeData: AnimeDetail): Observable<AnimeDetail> {
    const path = `anime/anime/${animeId}/`;
    return this.http.put<AnimeDetailDto>(`${this.apiConfig.apiUrl}${path}`, AnimeDetailMapper.toDto(animeData)).pipe(
      map(animeDetailResponse => AnimeDetailMapper.fromDto(animeDetailResponse)),
    );
  }

  /**
   * Delete anime from server.
   * @param animeData Anime data to be updated.
   */
  public createAnime(animeData: AnimeDetail): Observable<AnimeDetail> {
    const path = `anime/anime/`;
    return this.http.post<AnimeDetailDto>(`${this.apiConfig.apiUrl}${path}`, AnimeDetailMapper.toDto(animeData)).pipe(
      map(animeDetailResponse => AnimeDetailMapper.fromDto(animeDetailResponse)),
    );
  }

  /** Get genres from server.  */
  public getGenre(): Observable<Pagination<Genre>> {
    const path = `anime/genres/`;
    return this.http.get<PaginationDto<GenreDto>>(`${this.apiConfig.apiUrl}${path}`).pipe(
      switchMap(genres => {
        const params = new HttpParams().set('limit', genres.count);
        return this.http.get<PaginationDto<GenreDto>>(`${this.apiConfig.apiUrl}${path}`, { params });
      }),
      map(genres => PaginationMapper.fromDto(genres, genresDto => GenreMapper.fromDto(genresDto))),
    );
  }

  /** Get genres from server.  */
  public getStudio(): Observable<Pagination<Studio>> {
    const path = `anime/studios/`;
    return this.http.get<PaginationDto<StudioDto>>(`${this.apiConfig.apiUrl}${path}`).pipe(
      switchMap(genres => {
        const params = new HttpParams().set('limit', genres.count);
        return this.http.get<PaginationDto<StudioDto>>(`${this.apiConfig.apiUrl}${path}`, { params });
      }),
      map(studios => PaginationMapper.fromDto(studios, studiosDto => StudioMapper.fromDto(studiosDto))),
    );
  }

  /** Get type list.  */
  public getTypeList(): readonly AnimeType[] {
    return [
      AnimeType.TV,
      AnimeType.Movie,
      AnimeType.Music,
      AnimeType.ONA,
      AnimeType.OVA,
      AnimeType.Special,
    ];
  }

  /** Get status list.  */
  public getStatusList(): readonly Status[] {
    return [
      Status.Airing,
      Status.Finished,
      Status.NotYetAired,
    ];
  }

  /** Get source list.  */
  public getSourceList(): readonly Source[] {
    return [
      Source.Book,
      Source.CardGame,
      Source.FourKomaManga,
      Source.Game,
      Source.LightNovel,
      Source.Manga,
      Source.MixedMedia,
      Source.Music,
      Source.Novel,
      Source.Original,
      Source.Other,
      Source.PictureBook,
      Source.Radio,
      Source.Unknown,
      Source.VisualNovel,
      Source.WebManga,
      Source.WebNovel,
    ];
  }

  /** Get season list.  */
  public getSeasonList(): readonly Season[] {
    return [
      Season.Spring,
      Season.Summer,
      Season.Fall,
      Season.Winter,
      Season.NonSeasonal,
    ];
  }

  /** Get rating list .  */
  public getRatingList(): readonly Rating[] {
    return [
      Rating.G,
      Rating.PG,
      Rating.PG13,
      Rating.R17,
      Rating.RPlus,
      Rating.RX,
      Rating.Unknown,
    ];
  }
}
