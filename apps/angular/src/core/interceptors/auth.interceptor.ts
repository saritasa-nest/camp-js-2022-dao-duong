import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';

import { JwtService } from '../services/';
import { ApiConfigService } from '../services/api-config.service';

/** Api key interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly apiConfig: ApiConfigService,
  ) {}

  /**
   * Interceptor.
   * @param request Request object.
   * @param next Handler function.
   */
  public intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    if (this.shouldInterceptToken(request.url)) {
      return this.jwtService.getTokens().pipe(
        map(token =>
          token === null ?
            request :
            request.clone({
                setHeaders: { Authorization: `Bearer ${token.access}` },
            })),
        switchMap(newRequest => next.handle(newRequest)),
      );
    }
    return next.handle(request);
  }

  private shouldInterceptToken(url: string): boolean {
    const s3Url = new URL(
      'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev',
    ).toString();
    const isS3Upload = url.startsWith(s3Url);
    const isAuthRequest = url.startsWith(
      new URL('auth', this.apiConfig.apiUrl).toString(),
    );
    return !isAuthRequest && !isS3Upload;
  }
}
