import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3UploadDto } from '@js-camp/core/dtos/s3UploadDto';
import { map, Observable, switchMap } from 'rxjs';
import { xml2js } from 'xml-js';

import { ApiConfigService } from './api-config.service';

interface S3PostData {
  readonly formAction: string;
  readonly formData: FormData;
}

interface S3Response {

  /** S3 post response. */
  // Server response in camelCase format.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly PostResponse: {

    /** Image URL location object. */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly Location: string;
  };
}

/** Navigate service. */
@Injectable({
  providedIn: 'root',
})
export class S3Service {
  private readonly s3directUrl: URL;

  public constructor(
    apiConfig: ApiConfigService,
    private readonly http: HttpClient,
  ) {
    this.s3directUrl = new URL('s3direct/get_params/', apiConfig.apiUrl);
  }

  /** Save anime image. */
  public saveAnimeImage(image: File, imageLocalUrl: string): Observable<string> {
    return this.http.post<S3UploadDto>(this.s3directUrl.toString(), {
      dest: 'anime_images',
      filename: imageLocalUrl,
    }).pipe(
      map(s3DirectUpload => this.generateS3PostData(s3DirectUpload, image)),
      switchMap(({ formAction, formData }) => this.http.post(formAction, formData, { responseType: 'text' })),
      map(s3Response => <S3Response>xml2js(s3Response, { compact: true })),
      map(s3ResponseDto => s3ResponseDto.PostResponse.Location),
    );
  }

  private generateS3PostData(s3UploadData: S3UploadDto, imageFile: File): S3PostData {
    const s3UploadFormData = new FormData();
    Object.keys(s3UploadData).forEach(s3DataKey => s3UploadFormData.append(s3DataKey, s3UploadData[s3DataKey as keyof S3UploadDto]));
    s3UploadFormData.append('file', imageFile);

    return { formAction: s3UploadData.form_action, formData: s3UploadFormData };
  }
}
