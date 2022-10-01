import { Immerable, OmitImmerable } from './immerable';

/** S3Upload. */
export class S3Upload extends Immerable {

  /** Policy. */
  public readonly policy: string;

  /** Action status. */
  public readonly successActionStatus: string;

  /** Credential. */
  public readonly credential: string;

  /** Date. */
  public readonly date: string;

  /** Signature. */
  public readonly signature: string;

  /** Algorithm. */
  public readonly algorithm: string;

  /** Algorithm. */
  public readonly formAction: string;

  /** Algorithm. */
  public readonly key: string;

  /** Algorithm. */
  public readonly acl: string;

  /** Algorithm. */
  public readonly securityToken: string;

  /** Algorithm. */
  public readonly contentType: string;

  /** Algorithm. */
  public readonly cacheControl: string;

  /** Algorithm. */
  public readonly contentDisposition: string;

  public constructor(data: S3UploadInitArgs) {
    super();
    this.acl = data.acl;
    this.policy = data.policy;
    this.key = data.key;
    this.algorithm = data.algorithm;
    this.cacheControl = data.cacheControl;
    this.securityToken = data.securityToken;
    this.signature = data.signature;
    this.contentType = data.contentType;
    this.contentDisposition = data.contentDisposition;
    this.successActionStatus = data.successActionStatus;
    this.formAction = data.formAction;
    this.date = data.date;
    this.credential = data.credential;
  }
}

type S3UploadInitArgs = OmitImmerable<S3Upload>;
