import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/** Api service. */
@Injectable({
  providedIn: 'root',
})

export class ApiService {
  public constructor(private http: HttpClient) {}

  private formatErrors(error: unknown): Error {
    return new Error(`${error}`);
  }

  /**
   * Get service.
   * @param path Url path.
   * @param params Parameters for request.
   **/
  public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.api_url}${path}`, { params });
  }
}
