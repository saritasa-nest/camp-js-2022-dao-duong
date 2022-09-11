import { S3Upload } from '@js-camp/core/interfaces/s3Upload';
import { xml2js } from 'xml-js';

import { http } from '..';
import { CONFIG } from '../config';

interface S3PostData {

  /** Request Url. */
  readonly formAction: string;

  /** Form data for the request. */
  readonly formData: FormData;
}

interface S3Response {

  /** S3 post response. */
  readonly PostResponse: {

    /** Image URL location object. */
    readonly Location: {

      /** Image URL. */
      readonly _text: string;
    };
  };
}

export namespace S3Service {
  const s3directUrl = new URL('s3direct/get_params/', CONFIG.apiUrl);

  /**
   * Save anime image.
   * @param image Image file object.
   * @param imageLocalUrl Image local URL.
   */
  export async function saveAnimeImage(
    image: File,
  ): Promise<string> {
    const params = {
      dest: 'anime_images',
      filename: image.name,
    };
    const s3DirectUpload = await http.post<S3Upload>(
      s3directUrl.toString(),
      params,
    );
    const { formAction, formData } = generateS3PostData(
      s3DirectUpload.data,
      image,
    );
    const { data: s3RawResponse } = await http.post(formAction, formData, {
      responseType: 'text',
    });
    const s3Response = xml2js(s3RawResponse, {
      compact: true,
    }) as S3Response;
    return s3Response.PostResponse.Location._text;
  }

  /**
   * Generate post data for s3 request.
   * @param s3UploadData Data for s3 upload.
   * @param image Image file object.
   */
  function generateS3PostData(
    s3UploadData: S3Upload,
    image: File,
  ): S3PostData {
    const s3UploadFormData = new FormData();
    Object.keys(s3UploadData).forEach(s3DataKey =>
      s3UploadFormData.append(
        s3DataKey,
        s3UploadData[s3DataKey as keyof S3Upload],
      ));
    s3UploadFormData.append('file', image);
    s3UploadFormData.delete('form_action');
    return { formAction: s3UploadData.form_action, formData: s3UploadFormData };
  }
}
