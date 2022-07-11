import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/register.mapper';
import { Login } from '@js-camp/core/models/login';
import { Register } from '@js-camp/core/models/register';

import { api } from '../api/API';
import { Token } from '../scripts/constants';
import { Helpers } from '../scripts/helpers';

import { StorageService } from './storageService';

export namespace AuthService {

  /**
   * Login service.
   * @param loginData Login data from login form.
   */
  export async function login(loginData: Login): Promise<void> {
    const userLoginDto = LoginMapper.toDto(loginData);
    const { data } = await api.post('/auth/login/', userLoginDto);
    StorageService.set(Token.Refresh, data.refresh);
    StorageService.set(Token.Access, data.access);
  }

  /**
   * Login service.
   * @param registerData Register data from register form.
   */
  export async function register(registerData: Register): Promise<void> {
    const userRegisterDto = RegisterMapper.toDto(registerData);
    const { data } = await api.post('/auth/register/', userRegisterDto);
    Helpers.setToken(data);
  }

  /** Logout service.*/
  export function logout(): void {
    Helpers.clearToken();
  }
}
