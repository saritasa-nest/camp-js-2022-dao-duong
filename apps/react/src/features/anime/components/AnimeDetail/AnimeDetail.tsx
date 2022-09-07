import { fetchAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import {
  selectAnimeDetail,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import {
  Box,
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
import ReactPlayer from 'react-player/youtube';
import { convertDate } from '@js-camp/core/utils/convertDate';

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

  return (
    <Container className={styles['anime-detail']}>
      <Card className={styles['anime-detail__card']}>
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
        <Box className={styles['card-media']}>
          <CardMedia
            component="img"
            className={styles['image']}
            image={animeDetail.image}
            alt={`${
              animeDetail.englishTitle || animeDetail.japaneseTitle
            } image`}
          />
        </Box>
        <Box className={styles['card-content']}>
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
              Aired:{' '}
              {`From ${convertDate(animeDetail.aired.start)} to ${convertDate(
                animeDetail.aired.end,
              )}`}
            </Typography>
            <Typography variant="h6" align="left">
              Airing: {animeDetail.airing ? 'Yes' : 'No'}
            </Typography>
            <Box>
              <Typography variant="h6" align="left">
                Genres
              </Typography>
              <Stack direction="row" spacing={1}>
                {animeDetail.genreList.map(genre => (
                  <Chip label={genre.name} key={genre.id} />
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="h6" align="left">
                Studios
              </Typography>
              <Stack direction="row" spacing={1}>
                {animeDetail.studioList.map(studio => (
                  <Chip label={studio.name} key={studio.id} />
                ))}
              </Stack>
            </Box>
            {animeDetail.youtubeTrailerId && (
              <Box>
                <Typography variant="h6" align="left">
                  Trailer
                </Typography>
                <ReactPlayer
                  url={`https://www.youtube-nocookie.com/embed/${animeDetail.youtubeTrailerId}`}
                  controls={true}
                />
              </Box>
            )}
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export const AnimeDetail = memo(AnimeDetailComponent);
