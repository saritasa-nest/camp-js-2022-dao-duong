import { memo, useEffect, FC } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres, selectAreGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { Link } from 'react-router-dom';

import { GenreCard } from '../../components/GenreCard';

/** Genres page component. */
const GenresPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(selectGenres);
  const isLoading = useAppSelector(selectAreGenresLoading);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h1>Genres</h1>
      <Link to="/user/profile">User</Link>
      {genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
    </>
  );
};

export const GenresPage = memo(GenresPageComponent);
