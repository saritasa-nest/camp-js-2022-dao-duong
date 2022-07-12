import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/register.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Register } from '@js-camp/core/models/register';
import { User } from '@js-camp/core/models/user';

import { api } from '../api/API';
import { Token, Url } from '../scripts/constants';
import { navigate, renderErrorMessage } from '../scripts/functions';
import { Helpers } from '../scripts/helpers';

import { StorageService } from './storageService';

export namespace AuthService {

  /**
   * Login service.
   * @param loginData Login data from login form.
   */
  export async function login(loginData: Login): Promise<void> {
    try {
      const userLoginDto = LoginMapper.toDto(loginData);
      const { data } = await api.post('/auth/login/', userLoginDto);
      StorageService.set(Token.Refresh, data.refresh);
      StorageService.set(Token.Access, data.access);
      navigate(Url.Login);
    } catch (error: unknown) {
      renderErrorMessage(error);
    }
  }

  /**
   * Login service.
   * @param registerData Register data from register form.
   */
  export async function register(registerData: Register): Promise<void> {
    try {
      const userRegisterDto = RegisterMapper.toDto(registerData);
      const { data } = await api.post('/auth/register/', userRegisterDto);
      Helpers.setToken(data);
    } catch (error: unknown) {
      renderErrorMessage(error);
    }
  }

  /** Logout service.*/
  export function logout(): void {
    Helpers.clearToken();
  }

  /** Test user.*/
  export async function getUser(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { data } = await api.get('/users/profile/', { headers: { Authorization: `Bearer ${StorageService.get(Token.Access)}` } });
    return UserMapper.fromDto(data);
  }
}
