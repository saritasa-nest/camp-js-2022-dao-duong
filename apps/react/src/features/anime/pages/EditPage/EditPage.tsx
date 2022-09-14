import { AnimeDetail, AnimeDetailPost } from '@js-camp/core/models/anime';
import { updateAnime } from '@js-camp/react/store/anime/dispatchers';
import { fetchAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import { selectAnimeDetail, selectIsAnimeDetailLoading } from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppNavigate } from '../../../../shared/hooks';
import { AnimeForm } from '../../components/AnimeForm/AnimeForm';

import styles from './EditPage.module.css';

const transformToPostData = (animeDetail: AnimeDetail): AnimeDetailPost => {
  // Disable because "id" is not a part of AnimeDetailPost.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...postData } = animeDetail;
  return postData;
};

const EditPageComponent: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isAnimeDetailLoading = useAppSelector(selectIsAnimeDetailLoading);
  const animeId = Number(params['id']);
  const { navigateWithSearchParams } = useAppNavigate();
  const animeDetail = useAppSelector(state => selectAnimeDetail(state, animeId));
  useEffect(() => {
    if (params['id'] !== undefined && animeDetail === undefined) {
      dispatch(fetchAnimeDetail(animeId));
    }
  }, []);

  const onFormSubmit = (data: AnimeDetailPost) => {
    dispatch(updateAnime({ id: animeId, animeData: data })).then(() => {
      navigateWithSearchParams(`/anime/${animeId}`);
    });
  };

  if (isAnimeDetailLoading) {
    return (
      <Box className={styles['loader']}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (animeDetail === undefined) {
    return (
      <Box className={styles['anime-edit']}>
        <Typography variant="h4">
          No anime found!
        </Typography>
      </Box>
    );
  }

  return (
    <AnimeForm animeDetail={transformToPostData(animeDetail)} onSubmit={onFormSubmit} />
  );
};

export const EditPage = memo(EditPageComponent);
