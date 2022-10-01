import { createAsyncThunk } from '@reduxjs/toolkit';

import { StudiosService } from '../../api/services/studiosService';

export const fetchStudios = createAsyncThunk(
  'studios/fetch',
  () => StudiosService.fetchStudios(),
);

export const addStudio = createAsyncThunk(
  'studios/add',
  (studioName: string) => StudiosService.addStudio(studioName),
);
