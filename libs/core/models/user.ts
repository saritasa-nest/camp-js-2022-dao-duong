import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {

  /** User email. */
  public readonly email: string;

  /** User first name. */
  public readonly firstName: string;

  /** User last name. */
  public readonly lastName: string;

  /** User avatar. */
  public readonly avatar: string | null;

  /** User created date. */
  public readonly created: Date;

  /** User modified date. */
  public readonly modified: Date;

  public constructor(data: UserInitArgs) {
    super();
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.created = data.created;
    this.modified = data.modified;
    this.avatar = data.avatar;
  }
}

type UserInitArgs = OmitImmerable<User>;
