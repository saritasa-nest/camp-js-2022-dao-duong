import { AnimeDetail, AnimeDetailPost } from '@js-camp/core/models/anime';
import { fetchAnimeDetail, updateAnime } from '@js-camp/react/store/animeDetail/dispatchers';
import { selectAnimeDetail, selectIsAnimeDetailLoading } from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, CircularProgress } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AnimeForm } from '../../components/AnimeForm/AnimeForm';

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
  const animeDetail = useAppSelector(state => selectAnimeDetail(state, animeId));
  useEffect(() => {
    if (params['id'] !== undefined && animeDetail === undefined) {
      dispatch(fetchAnimeDetail(animeId));
    }
  }, []);

  const onFormSubmit = (data: AnimeDetailPost) => {
    dispatch(updateAnime({ id: animeId, animeData: data }));
  };

  if (isAnimeDetailLoading) {
    return (
      <CircularProgress />
    );
  }

  // Still! Fix this, add loader or sth.
  if (animeDetail === undefined) {
    return (
      <Box>
        No data
      </Box>
    );
  }

  return (
    <AnimeForm animeDetail={transformToPostData(animeDetail)} onSubmit={onFormSubmit} />
  );
};

export const EditPage = memo(EditPageComponent);
