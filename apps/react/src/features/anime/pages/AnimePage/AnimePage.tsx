import { Grid, Typography } from '@mui/material';
import { FC, memo } from 'react';

import { AnimeList } from '../../components/AnimeList/AnimeList';

import styles from './AnimePage.module.css';

const AnimePageComponent: FC = () => (
  <Grid container>
    <Grid item xs={3} className={styles['list-grid']}>
      <AnimeList />
    </Grid>
    <Grid item xs={9}>
      <Typography variant="h2" align="center">
        Detail will be display here
      </Typography>
    </Grid>
  </Grid>

);

export const AnimePage = memo(AnimePageComponent);
