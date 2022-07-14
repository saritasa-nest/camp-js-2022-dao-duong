import { RegisterDto } from '../../dtos/auth/register.dto';
import { Register } from '../../models/register';

export namespace RegisterMapper {

  /**
   * Maps model to DTO.
   * @param credential User register credential.
   */
  export function toDto(credential: Register): RegisterDto {
    return {
      email: credential.email,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      first_name: credential.firstName,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      last_name: credential.lastName,
      password: credential.password,
    } as RegisterDto;
  }
}
