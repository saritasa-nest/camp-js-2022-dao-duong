import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeSortDirection, AnimeSortField } from '@js-camp/core/models/anime/anime';
import { fetchAnime, fetchNextAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, List } from '@mui/material';

import { FC, memo, useEffect } from 'react';

import useLastItemOnScreen from '../../../../shared/hooks/useLastItemOnScreen';
import { AnimeListControl } from '../AnimeListControls/AnimeListControl';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

import styles from './AnimeList.module.css';

const DEFAULT_PARAMS: AnimeListQueryParams = {
  page: 0,
  limit: 25,
  sort: { direction: AnimeSortDirection.Descending, field: AnimeSortField.EnglishTitle },
  type: [],
  search: '',
};

const AnimeListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const { itemRef, isItemVisible } = useLastItemOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  useEffect(() => {
    dispatch(fetchAnime(DEFAULT_PARAMS));
  }, [dispatch]);

  useEffect(() => {
    if (isItemVisible) {
      dispatch(fetchNextAnime());
    }
  }, [itemRef, isItemVisible]);

  if (animeList.length === 0) {
    return (

      // Should have a skeleton loader here!
      <div>Fetching anime...</div>
    );
  }
  return (
    <Box className={styles['anime-list']}>
      <AnimeListControl />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {animeList.map(anime =>
          <div ref={itemRef} key={anime.id}>
            <AnimeListItem anime={anime} />
          </div>)}
      </List>
      {isLoading && <div>Loading...</div>}
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
