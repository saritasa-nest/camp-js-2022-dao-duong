import { LoginDto } from '../../dtos/auth/login.dto';
import { Login } from '../../models/auth/login';

export namespace LoginMapper {

  /**
   * Maps model to DTO.
   * @param credential User login credential.
   */
  export function toDto(credential: Login): LoginDto {
    return {
      email: credential.email,
      password: credential.password,
    } as LoginDto;
  }
}
