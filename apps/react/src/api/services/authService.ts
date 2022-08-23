// Disable `require-await` to make methods async
// for better refactoring/re-usability.
/* eslint-disable require-await */
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/auth/register.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { Token } from '@js-camp/core/models/auth/token';

import { http } from '..';

import { TokenService } from './tokenService';

export namespace AuthService {

  /**
   * Login service.
   * @param loginData Login data from login form.
   */
  export async function login(loginData: Login): Promise<Token> {
    const userLoginDto = LoginMapper.toDto(loginData);
    const loginResponse = await http.post('/auth/login/', userLoginDto);
    TokenService.saveToken(loginResponse.data);
    return loginResponse.data;
  }

  /**
   * Login service.
   * @param registerData Register data from register form.
   */
  export async function register(registerData: Register): Promise<Token> {
    const userRegisterDto = RegisterMapper.toDto(registerData);
    const registerResponse = await http.post('/auth/register/', userRegisterDto);
    TokenService.saveToken(registerResponse.data);
    return registerResponse.data;
  }

  /** Logout service.*/
  export async function logout(): Promise<void> {
    await TokenService.destroyToken();
  }
}
