import { fetchAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import {
  selectAnimeDetail,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC, memo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './AnimeDetail.module.css';

const AnimeDetailComponent: FC = () => {
  const [searchParams] = useSearchParams();
  const animeId = Number(searchParams.get('id'));
  const dispatch = useAppDispatch();
  const animeDetail = useAppSelector(state =>
    selectAnimeDetail(state, animeId));
  const isAnimeDetailLoading = useAppSelector(selectIsAnimeDetailLoading);
  useEffect(() => {
    if (animeId) {
      dispatch(fetchAnimeDetail(animeId));
    }
  }, [searchParams.get('id'), dispatch]);

  if (isAnimeDetailLoading) {
    return (
      <Box className={styles['loader']}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (animeDetail === undefined) {
    return (
      <Box className={styles['anime-detail']}>
        <Typography variant="h4">
          Select anime on the left for more details!
        </Typography>
      </Box>
    );
  }

  const convertDate = (date: Date | null): string => {
    if (date !== null) {
      return date.toLocaleDateString('en-GB');
    }
    return 'Unknown date';
  };

  return (
    <Container className={styles['anime-detail']}>
      {JSON.stringify(animeDetail, null, 2)}
      <Card className={styles['anime-detail__card']}>
        <Box className={styles['card-media']}>
          <CardMedia
            component="img"
            className={styles['image']}
            image={animeDetail.image}
            alt={`${
              animeDetail.englishTitle || animeDetail.japaneseTitle
            } image`}
          />
          <Button
            variant="outlined"
            color="secondary"
            className={styles['trailer-button']}
          >
            Watch Trailer
          </Button>
        </Box>
        <Box>
          <CardHeader
            title={
              <Typography variant="h4">
                {animeDetail.englishTitle || '--'}
              </Typography>
            }
            subheader={
              <Typography variant="h5">
                {animeDetail.japaneseTitle || '--'}
              </Typography>
            }
          />
          <CardContent>
            <Box>
              <Typography variant="h6" align="left">
                Synopsis
              </Typography>
              <Typography variant="body1" align="left">
                {animeDetail.synopsis}
              </Typography>
            </Box>
            <Typography variant="h6" align="left">
              Type: {animeDetail.type}
            </Typography>
            <Typography variant="h6" align="left">
              Status: {animeDetail.status}
            </Typography>
            <Typography variant="h6" align="left">
              Aired: {`From ${convertDate(animeDetail.aired.start)} to ${convertDate(animeDetail.aired.end)}`}
            </Typography>
            <Typography variant="h6" align="left">
              Airing: {animeDetail.airing ? 'Yes' : 'No'}
            </Typography>
            <Box>
              <Typography variant="h6" align="left">
                Genres
              </Typography>
              <Stack direction="row" spacing={1}>
                {animeDetail.genreList.map(genre => <Chip label={genre.name} />)}
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" align="left">
                Studios
              </Typography>
              <Stack direction="row" spacing={1}>
                {animeDetail.studioList.map(studio => <Chip label={studio.name} />)}
              </Stack>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export const AnimeDetail = memo(AnimeDetailComponent);
