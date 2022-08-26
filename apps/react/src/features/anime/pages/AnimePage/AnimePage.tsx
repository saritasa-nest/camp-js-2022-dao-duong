import { Grid, Typography } from '@mui/material';
import { FC, memo } from 'react';

import { MyNavbar } from '../../../../shared/components/';
import { AnimeList } from '../../components/AnimeList/AnimeList';
const AnimePageComponent: FC = () => {
  const test = 1;
  return (
    <>
      <MyNavbar />
      <Grid container>
        <Grid item xs={3}>
          <AnimeList />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h2" align="center">
            Detail will be display here
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export const AnimePage = memo(AnimePageComponent);
