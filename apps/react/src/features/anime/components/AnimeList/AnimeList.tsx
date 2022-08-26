import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeSortDirection, AnimeSortField } from '@js-camp/core/models/anime/anime';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { List } from '@mui/material';
import { FC, memo, useEffect } from 'react';

const DEFAULT_PARAMS: AnimeListQueryParams = {
  page: 0,
  limit: 25,
  sort: { direction: AnimeSortDirection.Descending, field: AnimeSortField.EnglishTitle },
  type: [],
  search: '',
};

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';
const AnimeListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);
  const isLoading = useAppSelector(selectIsAnimeLoading);

  useEffect(() => {
    dispatch(fetchAnime(DEFAULT_PARAMS));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {animeList.map(anime => <AnimeListItem anime={anime} key={anime.id}/>)}
      </List>
    </>
  );
};

export const AnimeList = memo(AnimeListComponent);
