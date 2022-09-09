import { createAsyncThunk } from '@reduxjs/toolkit';

import { S3Service } from '../../api/services/s3Service';

export const saveAnimeImage = createAsyncThunk(
  'animeImage/save',
  (saveData: {image: File; imageUrl: string;}) => S3Service.saveAnimeImage(saveData.image, saveData.imageUrl),
);
