import { Login } from '@js-camp/core/models/auth/login';
import { Register } from '@js-camp/core/models/auth/register';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';

export const login = createAsyncThunk(
  'auth/login',
  async(loginData: Login, { rejectWithValue }) => {
    try {
      return await AuthService.login(loginData);
    } catch (err: unknown) {
      return rejectWithValue(AuthService.mappingError(err));
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async(registerData: Register, { rejectWithValue }) => {
    try {
      return await AuthService.register(registerData);
    } catch (err: unknown) {
      return rejectWithValue(AuthService.mappingError(err));
    }
  },
);
