import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import styles from './AnimeDetail.module.css';

const AnimeDetailComponent: FC = () => (
  <Box className={styles['anime-detail']}>
    <Typography variant="h2" align="center">
            Detail will be display here
    </Typography>
  </Box>
);

export const AnimeDetail = memo(AnimeDetailComponent);
