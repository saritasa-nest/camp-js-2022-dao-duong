import { AnimeDetailPost, AnimeDetail } from '@js-camp/core/models/anime';
import { addAnime } from '@js-camp/react/store/anime/dispatchers';
import { useAppDispatch } from '@js-camp/react/store/store';
import { FC, memo } from 'react';

import { useAppNavigate } from '../../../../shared/hooks';

import { AnimeForm } from '../../components/AnimeForm/AnimeForm';

const AddPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { navigateWithSearchParams } = useAppNavigate();
  const onFormSubmit = (anime: AnimeDetailPost) => {
    dispatch(addAnime(anime)).then(response => {
      if (response.payload instanceof AnimeDetail) {
        navigateWithSearchParams(`/anime/${response.payload.id}`);
      }
    });
  };
  return <AnimeForm onSubmit={onFormSubmit} />;
};

export const AddPage = memo(AddPageComponent);
