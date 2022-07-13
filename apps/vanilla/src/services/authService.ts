import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/register.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Register } from '@js-camp/core/models/register';
import { User } from '@js-camp/core/models/user';

import { api } from '../api/API';
import { Token, Url } from '../scripts/constants';
import { navigate } from '../scripts/functions';
import { Helpers } from '../scripts/helpers';

import { ErrorService } from './errorService';

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
      Helpers.setToken(data);
      navigate(Url.Login);
    } catch (error: unknown) {
      ErrorService.renderErrorMessage(error);
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
      navigate(Url.Login);
    } catch (error: unknown) {
      ErrorService.renderErrorMessage(error);
    }
  }

  /** Logout service.*/
  export function logout(): void {
    Helpers.clearToken();
  }

  /** Get user.*/
  export async function getUser(): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { data } = await api.get('/users/profile/', { headers: { Authorization: `Bearer ${StorageService.get(Token.Access)}` } });
    return UserMapper.fromDto(data);
  }

  /**
   * Verify token.
   * @param accessToken The access token to verify.
   */
  export async function verifyToken(accessToken: string): Promise<boolean> {
    try {
      await api.post('/auth/token/verify/', { token: accessToken });
      return true;
    } catch (error: unknown) {
      ErrorService.renderErrorMessage(error);
      return false;
    }
  }
}
