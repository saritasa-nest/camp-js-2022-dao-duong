import { Immerable, OmitImmerable } from '../immerable';

/** Define Token data. */
export class Token extends Immerable {

  /** Data of refresh token. */
  public readonly refresh: string;

  /** Data of access token. */
  public readonly access: string;

  public constructor(data: TokenArgs) {
    super();
    this.refresh = data.refresh;
    this.access = data.access;
  }
}

type TokenArgs = OmitImmerable<Token>;
