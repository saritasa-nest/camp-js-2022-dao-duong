import { AnimeDetail, AnimeDetailPost } from '@js-camp/core/models/anime';
import { selectAnimeDetail } from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Box } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import { useFormik } from 'formik';

import styles from './AnimeForm.module.css';
import { AnimeFormSchema, defaultAnimeFormValues } from './formConfig';

interface Props {

  /** Anime data. */
  readonly animeDetail?: AnimeDetail;
}

const AnimeFormComponent: FC<Props> = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const animeId = Number(params['id']);
  const animeDetail = useAppSelector(state => selectAnimeDetail(state, animeId));
  const onFormSubmission = (values: AnimeDetailPost) => {
    formik.setSubmitting(false);
    console.log(values);
  };

  const formik = useFormik({
    initialValues: animeDetail ?? defaultAnimeFormValues,
    validationSchema: AnimeFormSchema,
    onSubmit: onFormSubmission,
  });
  useEffect(() => {
    if (params['id'] !== undefined && animeDetail === undefined) {
      dispatch(fetchAnimeDetail(animeId));
    }
  }, [dispatch]);
  return (
    <>

      <Box><pre>{JSON.stringify(animeDetail, null, 2)}</pre></Box>
    </>
  );
};

export const AnimeForm = memo(AnimeFormComponent);
