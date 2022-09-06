import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimeListQueryParamsWithId } from '@js-camp/core/models/anime-query-params';
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
import {
  Box,
  debounce,
  List,
  Divider,
  CircularProgress,
  Typography,
} from '@mui/material';
import { AnimeDetail } from '@js-camp/core/models/anime';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';

import useLastItemOnScreen from '../../../../shared/hooks/useLastItemOnScreen';
import { AnimeListControl } from '../AnimeListControls/AnimeListControl';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

import styles from './AnimeList.module.css';

const DEFAULT_PARAMS: AnimeListQueryParamsWithId = {
  page: 0,
  limit: 25,
  sort: {
    direction: AnimeSortDirection.Ascending,
    field: AnimeSortField.EnglishTitle,
  },
  type: [],
  search: '',
  id: null,
};

const getAnimeListParamsFromUrl = (params: URLSearchParams) => {
  const page = params.get('page') ?
    Number(params.get('page')) :
    DEFAULT_PARAMS.page;
  const limit = params.get('limit') ?
    Number(params.get('limit')) :
    DEFAULT_PARAMS.limit;
  const sort = {
    field: (params.get('field') as AnimeSortField) ?? DEFAULT_PARAMS.sort.field,
    direction:
      (params.get('direction') as AnimeSortDirection) ??
      DEFAULT_PARAMS.sort.direction,
  };
  const typeFromUrl = params.get('type');
  const type = typeFromUrl ?
    (typeFromUrl.split(',') as AnimeType[]) :
    DEFAULT_PARAMS.type;
  const search = params.get('search') ?? DEFAULT_PARAMS.search;
  const id = params.get('id') ? Number(params.get('id')) : DEFAULT_PARAMS.id;
  return { page, limit, sort, type, search, id };
};

const AnimeListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<AnimeListQueryParamsWithId>(
    getAnimeListParamsFromUrl(searchParams),
  );
  const [currentAnimeId, setCurrentAnimeId] = useState<
    AnimeDetail['id'] | null
  >(queryParams.id);
  const { itemRef, isLastItemVisible } = useLastItemOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  const setQueryParamsToUrl = ({
    sort,
    type,
    search,
    id,
  }: AnimeListQueryParamsWithId) => {
    const paramsForUrl = {
      field: sort.field,
      direction: sort.direction,
      type: type.toString(),
      search,
      id: id ? id.toString() : '',
    };
    const params = new URLSearchParams(paramsForUrl);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    setQueryParamsToUrl({ ...queryParams, id: currentAnimeId });
    dispatch(clearAnimeList());
    dispatch(fetchAnimePage(queryParams));
  }, [queryParams]);

  useEffect(() => {
    if (isLastItemVisible) {
      dispatch(fetchNextAnimePage());
    }
  }, [itemRef, isLastItemVisible]);

  const onAnimeItemClick = useCallback(
    (id: AnimeDetail['id']) => {
      setQueryParamsToUrl({ ...queryParams, id });
      setCurrentAnimeId(id);
    },
    [queryParams],
  );

  return (
    <Box className={styles['anime-list']}>
      <AnimeListControl
        queryParams={queryParams}
        setQueryParams={debounce(setQueryParams, 500)}
      />
      <List>
        {animeList.map(anime => (
          <div key={anime.id} ref={itemRef}>
            <AnimeListItem
              isSelected={anime.id === currentAnimeId}
              anime={anime}
              onClick={() => onAnimeItemClick(anime.id)}
            />
            <Divider />
          </div>
        ))}
      </List>
      {isLoading && (
        <Box className={styles['anime-list__loader']}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {animeList.length === 0 && !isLoading && (
        <Typography variant="h5" align="center">
          There are no anime matching your criteria
        </Typography>
      )}
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
