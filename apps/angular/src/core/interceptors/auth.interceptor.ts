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
   * @param req HttpRequest object.
   * @param next HttpHandler function.
   **/
  public intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    return this.jwtService
      .getTokens()
      .pipe(map(token => token === null ? req : req.clone({
        setHeaders: { Authorization: `Bearer ${token.access}` },
      })),
      switchMap(newRequest => next.handle(newRequest)));
  }
}
