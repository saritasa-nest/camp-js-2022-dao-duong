import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthService } from '../../api/services/authService';

import { UserService } from '../../api/services/userService';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  () => UserService.fetchUser(),
);
export const logoutUser = createAsyncThunk(
  'auth/logout',
  () => AuthService.logout(),
);
