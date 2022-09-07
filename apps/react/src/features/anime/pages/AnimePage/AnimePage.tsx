import { Box } from '@mui/material';
import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';

import { AnimeList } from '../../components/AnimeList/AnimeList';

import styles from './AnimePage.module.css';

const AnimePageComponent: FC = () => (
  <Box className={styles['container']}>
    <AnimeList />
    <Outlet />
  </Box>
);

export const AnimePage = memo(AnimePageComponent);
