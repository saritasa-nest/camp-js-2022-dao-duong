import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** App-specific implementation of app config. */
@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  /** Api url. */
  public readonly apiUrl = environment.campJsApiUrl;

  /** Api key. */
  public readonly apiKey = environment.campJsApiKey;
}
