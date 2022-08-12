import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** Configuration for api service. */
@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  /** Api url. */
  public readonly apiUrl = environment.campJsApiUrl;

  /** Api key. */
  public readonly apiKey = environment.campJsApiKey;
}
