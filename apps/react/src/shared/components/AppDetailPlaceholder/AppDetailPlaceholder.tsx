import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import styles from './AppDetailPlaceholder.module.css';

const AppDetailPlaceholderComponent: FC = () => (
  <Box className={styles['placeholder-container']}>
    <Typography variant="h4">
    Select anime on the left for more details!
    </Typography>
  </Box>
);

export const AppDetailPlaceholder = memo(AppDetailPlaceholderComponent);
