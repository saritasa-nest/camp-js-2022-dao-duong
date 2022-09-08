import { selectAnimeDetail } from '@js-camp/react/store/animeDetail/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';

import { AnimeForm } from '../../components/AnimeForm/AnimeForm';

import styles from './EditPage.module.css';

const EditPageComponent: FC = () => {


  return (
    <div>
      <AnimeForm />
    </div>
  )
}

export const EditPage = memo(EditPageComponent);
