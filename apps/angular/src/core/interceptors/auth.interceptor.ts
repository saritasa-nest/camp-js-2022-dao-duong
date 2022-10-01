import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';

import { JwtService } from '../services/';

/** Api key interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private readonly jwtService: JwtService) {}

  /**
   * Interceptor.
   * @param request Request object.
   * @param next Handler function.
   */
  public intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
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
}
