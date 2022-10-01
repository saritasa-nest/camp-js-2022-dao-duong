import { S3UploadDto } from '../dtos/s3UploadDto';
import { S3Upload } from '../models/s3Upload';

export namespace S3Mapper {

  /**
   * Maps dto to model.
   * @param s3UploadDto S3 dto.
   */
  export function fromDto(s3UploadDto: S3UploadDto): S3Upload {
    return new S3Upload({
      policy: s3UploadDto.policy,
      successActionStatus: s3UploadDto.success_action_status,
      credential: s3UploadDto['x-amz-credential'],
      date: s3UploadDto['x-amz-date'],
      signature: s3UploadDto['x-amz-signature'],
      algorithm: s3UploadDto['x-amz-algorithm'],
      securityToken: s3UploadDto['x-amz-security-token'],
      formAction: s3UploadDto.form_action,
      key: s3UploadDto.key,
      acl: s3UploadDto.acl,
      cacheControl: s3UploadDto['Cache-Control'],
      contentDisposition: s3UploadDto['Content-Disposition'],
      contentType: s3UploadDto['content-type'],
    });
  }
}
