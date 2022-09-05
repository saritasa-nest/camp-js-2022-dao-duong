import { Box, Typography } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './AnimeDetail.module.css';

const AnimeDetailComponent: FC = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    console.log(searchParams.get('id'));
  }, [searchParams]);
  return (
    <Box className={styles['anime-detail']}>
      <Typography variant="h2" align="center">
        Detail will be display here
      </Typography>
    </Box>
  );
};

export const AnimeDetail = memo(AnimeDetailComponent);
