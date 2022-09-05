import { FC, memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimeListQueryParams } from '@js-camp/core/models/anime-query-params';
import {
  AnimeSortDirection,
  AnimeSortField,
  AnimeType,
} from '@js-camp/core/models/anime/anime';
import {
  fetchAnimePage,
  fetchNextAnimePage,
} from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnimeList,
  selectIsAnimeLoading,
} from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box, debounce, List, Divider, CircularProgress } from '@mui/material';

import useLastItemOnScreen from '../../../../shared/hooks/useLastItemOnScreen';
import { AnimeListControl } from '../AnimeListControls/AnimeListControl';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

import styles from './AnimeList.module.css';

const DEFAULT_PARAMS: AnimeListQueryParams = {
  page: 0,
  limit: 25,
  sort: {
    direction: AnimeSortDirection.Ascending,
    field: AnimeSortField.EnglishTitle,
  },
  type: [],
  search: '',
};

const getAnimeListParamsFromUrl = (params: URLSearchParams) => {
  const page = params.get('page') ? Number(params.get('page')) : DEFAULT_PARAMS.page;
  const limit = params.get('limit') ? Number(params.get('limit')) : DEFAULT_PARAMS.limit;
  const sort = {
    field: params.get('field') as AnimeSortField ?? DEFAULT_PARAMS.sort.field,
    direction: params.get('direction') as AnimeSortDirection ?? DEFAULT_PARAMS.sort.direction,
  };
  const typeFromUrl = params.get('type');
  const type = typeFromUrl ? typeFromUrl.split(',') as AnimeType[] : DEFAULT_PARAMS.type;
  const search = params.get('search') ?? DEFAULT_PARAMS.search;
  return { page, limit, sort, type, search };
};

const AnimeListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] =
    useState<AnimeListQueryParams>(getAnimeListParamsFromUrl(searchParams));
  const { itemRef, isLastItemVisible } = useLastItemOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  const setQueryParamsToUrl = ({
    sort,
    type,
    search,
  }: AnimeListQueryParams) => {
    const paramsForUrl = {
      field: sort.field,
      direction: sort.direction,
      type: type.toString(),
      search,
    };
    const params = new URLSearchParams(paramsForUrl);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    dispatch(fetchAnimePage(queryParams));
    setQueryParamsToUrl(queryParams);
  }, [queryParams]);

  useEffect(() => {
    if (isLastItemVisible) {
      dispatch(fetchNextAnimePage());
    }
  }, [itemRef, isLastItemVisible]);

  // if (isLoading) {
  //   return (
  //     <Box className={styles['loading-spinner']}>
  //       <CircularProgress color="secondary"/>
  //     </Box>
  //   );
  // }
  return (
    <Box className={styles['anime-list']}>
      <AnimeListControl
        queryParams={queryParams}
        setQueryParams={debounce(setQueryParams, 500)}
      />
      <List className={styles['anime-list']}>
        {animeList.map(anime => (
          <Box key={anime.id} ref={itemRef}>
            <AnimeListItem anime={anime}/>
            <Divider />
          </Box>
        ))}
      </List>
      {isLoading && <Box className={styles['loading-spinner']}>
        <CircularProgress color="secondary"/>
      </Box>}
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
