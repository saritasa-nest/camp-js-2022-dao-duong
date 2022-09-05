import { Box, CircularProgress } from '@mui/material';
import { memo, FC } from 'react';

import styles from './AppLoadingSpinner.module.css';

const AppLoadingSpinnerComponent: FC = () => (
  <Box className={styles['loading-spinner']}>
    <CircularProgress color="secondary" />
  </Box>
);

export const AppLoadingSpinner = memo(AppLoadingSpinnerComponent);
