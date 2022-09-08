import { fetchAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import { selectAnimeDetail, selectIsAnimeDetailLoading } from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { CircularProgress } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AnimeForm } from '../../components/AnimeForm/AnimeForm';

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

  if (isAnimeDetailLoading) {
    return (
      <CircularProgress />
    );
  }

  return (
    <div>
      <AnimeForm animeDetail={animeDetail}/>
    </div>
  )
}

export const EditPage = memo(EditPageComponent);
