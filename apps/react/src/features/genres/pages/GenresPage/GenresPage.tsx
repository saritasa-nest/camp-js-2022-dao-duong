import { memo, useEffect, FC } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { GenreCard } from '../../components/GenreCard';
import { MyNavbar } from '../../../../shared/components/';

/** Genres page component. */
const GenresPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenres);
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <>
      <MyNavbar />
      <h1>Genres</h1>
      {genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
    </>
  );
};

export const GenresPage = memo(GenresPageComponent);
