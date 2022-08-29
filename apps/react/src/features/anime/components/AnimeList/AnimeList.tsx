import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import { AnimeSortDirection, AnimeSortField } from '@js-camp/core/models/anime/anime';
import { fetchAnime, fetchNextAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectIsAnimeLoading } from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, debounce, List } from '@mui/material';

import { FC, memo, useEffect, useState } from 'react';

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
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const { itemRef, isLastItemVisible } = useLastItemOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  useEffect(() => {
    dispatch(fetchAnime(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (isLastItemVisible) {
      dispatch(fetchNextAnime());
    }
  }, [itemRef, isLastItemVisible]);
  return (
    <Box className={styles['anime-list']}>
      <AnimeListControl params={params} setParams={debounce(setParams, 500)}/>
      <List sx={{ width: '100%' }}>
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
