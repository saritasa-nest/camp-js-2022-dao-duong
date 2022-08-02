import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '../services/api-config.service';

/** Api key interceptor. */
@Injectable()
export class HttpApiKeyInterceptor implements HttpInterceptor {
  public constructor(private readonly apiConfig: ApiConfigService) {}

  /**
   * Interceptor.
   * @param req HttpRequest object.
   * @param next HttpHandler function.
   **/
  public intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    req.headers.set('Api-Key', this.apiConfig.apiKey);
    return next.handle(req);
  }
}
