import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from './api-config.service';

/** Api service. */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public constructor(
    private readonly http: HttpClient,
    private readonly apiConfig: ApiConfigService,
  ) {}

  /**
   * Get service.
   * @param path Url path.
   * @param params Parameters for request.
   */
  public get<T>(
    path: string,
    params?: HttpParams,
  ): Observable<T> {
    return this.http.get<T>(`${this.apiConfig.apiUrl}${path}`, { params });
  }

  /**
   * Post service.
   * @param path Url path.
   * @param body Body data for the request.
   */
  public post<T>(
    path: string,
    body?: Object,
  ): Observable<T> {
    return this.http.post<T>(`${this.apiConfig.apiUrl}${path}`, JSON.stringify(body));
  }

  /**
   * Put service.
   * @param path Url path.
   * @param body Body data for the request.
   */
  public put<T>(
    path: string,
    body?: Object,
  ): Observable<T> {
    return this.http.put<T>(`${this.apiConfig.apiUrl}${path}`, JSON.stringify(body));
  }

  /**
   * Delete service.
   * @param path Url path.
   * @param id Body data for the request.
   */
  public delete<T>(
    path: string,
    id: number,
  ): Observable<T> {
    return this.http.delete<T>(`${this.apiConfig.apiUrl}${path}${id}/`);
  }
}
