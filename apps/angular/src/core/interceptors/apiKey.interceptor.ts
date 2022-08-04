import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

/** Api key interceptor. */
@Injectable()
export class HttpApiKeyInterceptor implements HttpInterceptor {
  /**
   * Interceptor.
   * @param req HttpRequest object.
   * @param next HttpHandler function.
   **/
  public intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const request = req.clone({
      headers: req.headers.set('Api-Key', environment.apiKey),
    });
    return next.handle(request);
  }
}
