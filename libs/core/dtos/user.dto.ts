/** Register user DTO. */
export interface UserDto {

  /** User email.*/
  readonly email: string;

  /** User first name. */
  readonly first_name: string;

  /** User last name. */
  readonly last_name: string | null;

  /** User password. */
  readonly password: string | null;

  /** User avatar.*/
  readonly avatar: string | null;

  /** User created date. */
  readonly created: string;

  /** User modified date.*/
  readonly modified: string;
}
