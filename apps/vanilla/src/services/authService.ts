// Disable `require-await` to make methods async
// for better refactoring/re-usability.
/* eslint-disable require-await */
import { LoginMapper } from '@js-camp/core/mappers/auth/login.mapper';
import { RegisterMapper } from '@js-camp/core/mappers/auth/register.mapper';
import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';

import { api } from '../api/api';

import { Token, Url } from '../scripts/constants';
import { navigate } from '../utils/navigate';

import { StorageService } from './storageService';

export namespace AuthService {

  /**
   * Login service.
   * @param loginData Login data from login form.
   */
  export async function login(loginData: Login): Promise<void> {
    const userLoginDto = LoginMapper.toDto(loginData);
    const loginResponse = await api.post('/auth/login/', userLoginDto);
    StorageService.setToken(loginResponse.data);
  }

  /**
   * Login service.
   * @param registerData Register data from register form.
   */
  export async function register(registerData: Register): Promise<void> {
    const userRegisterDto = RegisterMapper.toDto(registerData);
    const registerResponse = await api.post('/auth/register/', userRegisterDto);
    StorageService.setToken(registerResponse.data);
  }

  /** Logout service. */
  export async function logout(): Promise<void> {
    StorageService.clearToken();
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
      return false;
    }
  }

  /** Check whether the user authenticated or not. */
  export async function checkIsAuthenticated(): Promise<boolean> {
    const accessToken = await StorageService.get<string>(Token.Access);
    if (accessToken === null) {
      return false;
    }
    return AuthService.verifyToken(accessToken);
  }

  /** Navigate user to login if user is not authenticated.*/
  export async function navigateToLoginIfNotAuthenticated(): Promise<void> {
    const isAuthenticated = await checkIsAuthenticated();
    if (!isAuthenticated) {
      navigate(Url.Login);
    }
  }

  /** Navigate user to home page if user is authenticated.*/
  export async function navigateToHomeIfIsAuthenticated(): Promise<void> {
    const isAuthenticated = await checkIsAuthenticated();
    if (isAuthenticated) {
      navigate(Url.Home);
    }
  }
}
