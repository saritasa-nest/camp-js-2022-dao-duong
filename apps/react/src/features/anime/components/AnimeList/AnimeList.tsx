import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeSortDirection, AnimeSortField } from '@js-camp/core/models/anime/anime';
import { fetchAnime, fetchNextAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, List } from '@mui/material';

import { FC, memo, useEffect } from 'react';

import useElementOnScreen from '../../../../shared/hooks/useOnScreen';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

import styles from './AnimeList.module.css';

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
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  });

  useEffect(() => {
    dispatch(fetchAnime(DEFAULT_PARAMS));
  }, [dispatch]);

  useEffect(() => {
    if (isVisible) {
      dispatch(fetchNextAnime());
    }
  }, [containerRef, isVisible, dispatch]);

  if (isLoading) {
    return (

      // Should have a skeleton loader here!
      <div>Loading...</div>
    );
  }
  return (
    <Box className={styles['anime-list']}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {animeList.map(anime =>
          <div ref={containerRef}>
            <AnimeListItem anime={anime} key={anime.id} />
          </div>)}
      </List>
      <div className={styles['isVisible']}>{isVisible ? 'IN VIEWPORT' : 'NOT IN VIEWPORT'}</div>
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
