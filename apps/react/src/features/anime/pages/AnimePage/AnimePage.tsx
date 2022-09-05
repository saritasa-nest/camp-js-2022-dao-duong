import { Box } from '@mui/material';
import { FC, memo } from 'react';

import { AnimeDetail } from '../../components/AnimeDetail/AnimeDetail';
import { AnimeList } from '../../components/AnimeList/AnimeList';

import styles from './AnimePage.module.css';

const AnimePageComponent: FC = () => (
  <Box className={styles['container']}>
    <AnimeList />
    <AnimeDetail />
  </Box>
);

export const AnimePage = memo(AnimePageComponent);
