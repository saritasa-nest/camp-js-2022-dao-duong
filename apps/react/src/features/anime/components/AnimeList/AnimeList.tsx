import { FC, memo, useEffect } from 'react';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeSortDirection, AnimeSortField } from '@js-camp/core/models/anime/anime';
import { fetchAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { List, Divider, Box } from '@mui/material';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

const DEFAULT_PARAMS: AnimeListQueryParams = {
  page: 0,
  limit: 25,
  sort: { direction: AnimeSortDirection.Descending, field: AnimeSortField.None },
  type: [],
  search: '',
};

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
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {animeList.map(anime =>
        <Box key={anime.id}>
          <AnimeListItem anime={anime}/>
          <Divider />
        </Box>)}
    </List>
  );
};

export const AnimeList = memo(AnimeListComponent);
