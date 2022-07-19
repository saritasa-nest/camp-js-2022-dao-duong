import { LoginMapper } from '@js-camp/core/mappers/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/register.mapper';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Register } from '@js-camp/core/models/register';
import { User } from '@js-camp/core/models/user';

import { api } from '../api/api';
import { Utility } from '../namespaces/utility';
import { Token, Url } from '../scripts/constants';

import { ErrorService } from './errorService';
import { StorageService } from './storageService';

export namespace AuthService {

  /**
   * Login service.
   * @param loginData Login data from login form.
   */
  export async function login(loginData: Login): Promise<void> {
    const userLoginDto = LoginMapper.toDto(loginData);
    const { data } = await api.post('/auth/login/', userLoginDto);
    StorageService.setToken(data);
  }

  /**
   * Login service.
   * @param registerData Register data from register form.
   */
  export async function register(registerData: Register): Promise<void> {
    const userRegisterDto = RegisterMapper.toDto(registerData);
    const { data } = await api.post('/auth/register/', userRegisterDto);
    StorageService.setToken(data);
  }

  /** Logout service.*/
  export async function logout(): Promise<void> {
    await StorageService.clearToken();
  }

  /** Get user.*/
  export async function getUser(): Promise<User> {
    const { data } = await api.get('/users/profile/');
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
      ErrorService.renderInputError(error);
      return false;
    }
  }

  /** Check whether the user authenticated or not.*/
  export async function checkIsAuthenticated(): Promise<boolean> {
    const token = await StorageService.get<string>(Token.Access);
    if (token === null) {
      return false;
    }
    return AuthService.verifyToken(token);
  }

  /** Check whether the user authenticated or not.*/
  export async function navigateByAuthorization(): Promise<void> {
    const currentLocation = window.location.pathname;
    const isAuthenticated = await checkIsAuthenticated();
    if ((currentLocation === Url.Home || currentLocation === Url.Profile) && !isAuthenticated) {
      Utility.navigate(Url.Login);
    }
    if ((currentLocation === Url.Login || currentLocation === Url.Register) && isAuthenticated) {
      Utility.navigate(Url.Home);
    }
  }
}
