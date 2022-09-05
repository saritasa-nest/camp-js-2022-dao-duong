import { fetchAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import { selectAnimeDetail, selectIsAnimeDetailLoading } from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, Typography } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AppLoadingSpinner } from '../../../../shared/components';

import styles from './AnimeDetail.module.css';

const AnimeDetailComponent: FC = () => {
  const [searchParams] = useSearchParams();
  const animeId = Number(searchParams.get('id'));
  const dispatch = useAppDispatch();
  const animeDetail = useAppSelector(state => selectAnimeDetail(state, animeId));
  const isAnimeDetailLoading = useAppSelector(selectIsAnimeDetailLoading);
  useEffect(() => {
    if (animeId) {
      dispatch(fetchAnimeDetail(animeId));
    }
  }, [searchParams, dispatch]);

  if (isAnimeDetailLoading) {
    return (
      <AppLoadingSpinner />
    );
  }

  if (animeDetail === undefined) {
    return (
      <Box className={styles['anime-detail']}>
        <Typography variant="h4">Select anime on the left for more details!</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles['anime-detail']}>
      <div>{JSON.stringify(animeDetail)}</div>
    </Box>
  );
};

export const AnimeDetail = memo(AnimeDetailComponent);
