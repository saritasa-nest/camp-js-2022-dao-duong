import { Box, Button, Modal, Typography } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AnimeDetail } from '@js-camp/core/models/anime';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { deleteAnime } from '@js-camp/react/store/anime/dispatchers';
import { selectIsAnimeDeleting } from '@js-camp/react/store/anime/selectors';

import styles from './AnimeDetailControls.module.css';

interface Props {

  /** Id of the anime. */
  readonly animeId: AnimeDetail['id'];
}

const AnimeDetailControlsComponent: FC<Props> = ({ animeId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const isDeleting = useAppSelector(selectIsAnimeDeleting);
  const onEditButtonClick = (id: AnimeDetail['id']) => {
    navigate(
      { pathname: `../edit/${id}`, search: searchParams.toString() },
      { replace: true },
    );
  };

  const onDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const onYesButtonClick = useCallback((id: AnimeDetail['id']) => {
    dispatch(deleteAnime(id));
    if (isDeleting) {
      setIsDeleteModalOpen(false);
      navigate({ pathname: '/', search: searchParams.toString() });
    }
  }, [isDeleting, searchParams]);
  return (
    <>
      <Button
        aria-label="edit"
        color="primary"
        variant="contained"
        onClick={() => onEditButtonClick(animeId)}
      >
        Edit <EditIcon />
      </Button>
      <Button
        aria-label="delete"
        color="error"
        variant="contained"
        onClick={onDeleteButtonClick}
      >
        Delete <DeleteIcon />
      </Button>
      <Modal open={isDeleteModalOpen} onClose={handleModalClose}>
        <Box className={styles['modal-content']}>
          <Typography component="p" variant="h5">Do you want to delete this anime?</Typography>
          <Box className={styles['modal-buttons']}>
            <Button variant="contained" onClick={handleModalClose}>No</Button>
            <Button variant="contained" color="error" onClick={() => onYesButtonClick(animeId)}>Yes</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export const AnimeDetailControls = memo(AnimeDetailControlsComponent);
