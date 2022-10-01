import { Immerable, OmitImmerable } from '../immerable';

/** Define Token data. */
export class Token extends Immerable {

  /** Data of refresh token. */
  public readonly refreshToken: string;

  /** Data of access token. */
  public readonly accessToken: string;

  public constructor(data: TokenArgs) {
    super();
    this.refreshToken = data.refreshToken;
    this.accessToken = data.accessToken;
  }
}

type TokenArgs = OmitImmerable<Token>;
