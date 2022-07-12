export interface ErrorDataDto {
  readonly email?: readonly string[];
  readonly first_name?: readonly string[];
  readonly last_name?: readonly string[];
  readonly avatar?: readonly string[];
  readonly password?: readonly string[];
  readonly token?: readonly string[];
  readonly non_field_errors?: readonly string[];
}

export interface HttpErrorDto {
  readonly detail: string;
  readonly data?: ErrorDataDto;
  readonly code?: string;
}