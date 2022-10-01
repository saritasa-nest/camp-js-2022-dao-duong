import { createAsyncThunk } from '@reduxjs/toolkit';

import { S3Service } from '../../api/services/s3Service';

export const saveAnimeImage = createAsyncThunk(
  'animeImage/save',
  (image: File) => S3Service.saveAnimeImage(image),
);
