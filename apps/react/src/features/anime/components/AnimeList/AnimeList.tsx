import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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
import {
  Box,
  debounce,
  List,
  Divider,
  CircularProgress,
  Typography,
  Button,
} from '@mui/material';
import { AnimeDetail } from '@js-camp/core/models/anime';
import { clearAnimeList } from '@js-camp/react/store/anime/slice';

import { useLastItemOnScreen, useAppNavigate } from '../../../../shared/hooks/';
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
  return { page, limit, sort, type, search };
};

const AnimeListComponent: FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useAppSelector(selectAnimeList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const params = useParams();
  const { navigateWithSearchParams } = useAppNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<AnimeListQueryParams>(
    getAnimeListParamsFromUrl(searchParams),
  );
  const [currentAnimeId, setCurrentAnimeId] = useState<
    AnimeDetail['id'] | null
  >(Number(params['id']));
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
    const urlSearchParams = new URLSearchParams(paramsForUrl);
    setSearchParams(urlSearchParams, { replace: true });
  };

  useEffect(() => {
    setQueryParamsToUrl(queryParams);
    dispatch(clearAnimeList());
    dispatch(fetchAnimePage(queryParams));
  }, [queryParams, dispatch]);

  useEffect(() => {
    if (isLastItemVisible) {
      dispatch(fetchNextAnimePage());
    }
  }, [itemRef, isLastItemVisible]);

  const onAnimeItemClick = useCallback(
    (id: AnimeDetail['id']) => {
      navigateWithSearchParams(`/anime/${id}`);
      setCurrentAnimeId(id);
    },
    [searchParams],
  );

  const onAddButtonClick = () => {
    navigateWithSearchParams('/anime/add');
  };

  return (
    <Box className={styles['anime-list']}>
      <AnimeListControl
        queryParams={queryParams}
        setQueryParams={debounce(setQueryParams, 500)}
      />
      <Button
        className={styles['add-button']}
        type="button"
        variant="outlined"
        color="info"
        onClick={onAddButtonClick}
      >
        Add
      </Button>
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
