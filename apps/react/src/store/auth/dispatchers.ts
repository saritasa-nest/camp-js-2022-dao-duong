import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';

export const login = createAsyncThunk(
  'auth/login',
  (loginData: Login) => AuthService.login(loginData),
);

export const register = createAsyncThunk(
  'auth/register',
  (registerData: Register) => AuthService.login(registerData),
);
