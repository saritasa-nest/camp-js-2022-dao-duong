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
  CircularProgress,
  Container,
  Modal,
  Typography,
} from '@mui/material';

import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './AnimeDetail.module.css';
import { AnimeDetailContent } from './components/AnimeDetailContent/AnimeDetailContent';
import { AnimeDetailControls } from './components/AnimeDetailControls/AnimeDetailControls';

const AnimeDetailComponent: FC = () => {
  const params = useParams();
  const animeId = Number(params['id']);
  const dispatch = useAppDispatch();
  const animeDetail = useAppSelector(state =>
    selectAnimeDetail(state, animeId));
  const isAnimeDetailLoading = useAppSelector(selectIsAnimeDetailLoading);
  const [isPopUpImageOpen, setIsPopUpImageOpen] = useState<boolean>(false);
  useEffect(() => {
    if (animeId) {
      dispatch(fetchAnimeDetail(animeId));
    }
  }, [animeId, dispatch]);

  const onImageClick = () => {
    setIsPopUpImageOpen(true);
  };
  const handleModalClose = () => {
    setIsPopUpImageOpen(false);
  };

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
        <Typography variant="h4">No anime match your criteria!</Typography>
      </Box>
    );
  }

  return (
    <Container
      className={styles['anime-detail']}
      disableGutters
      maxWidth={false}
    >
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
          <Button onClick={onImageClick} type="button">
            <CardMedia
              component="img"
              className={styles['image']}
              image={animeDetail.image ?? undefined}
              alt={`${
                animeDetail.englishTitle || animeDetail.japaneseTitle
              } image`}
            />
          </Button>
          <Modal open={isPopUpImageOpen} onClose={handleModalClose}>
            <Box className={styles['modal-content']}>
              <img
                src={animeDetail.image ?? undefined}
                alt={`${
                  animeDetail.englishTitle || animeDetail.japaneseTitle
                } full size image`}
                className={styles['popup-image']}
              />
            </Box>
          </Modal>
        </Box>
        <Box className={styles['card-content']}>
          <CardContent>
            <AnimeDetailContent animeDetail={animeDetail} />
          </CardContent>
        </Box>
      </Card>
      <Box className={styles['anime-detail__controls']}>
        <AnimeDetailControls animeId={animeDetail.id} />
      </Box>
    </Container>
  );
};

export const AnimeDetail = memo(AnimeDetailComponent);
