import {
  AnimeDetailPost,
  AnimeStatus,
  AnimeType,
  Source,
  Rating,
  Season,
  Genre,
  Studio,
} from '@js-camp/core/models/anime';
import { Box, Button, FormControlLabel, Input } from '@mui/material';
import { ChangeEventHandler, FC, memo, useCallback, useEffect, useState } from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Switch, TextField } from 'formik-mui';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectGenres } from '@js-camp/react/store/genres/selectors';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import { fetchGenres } from '@js-camp/react/store/genres/dispatchers';
import { fetchStudios } from '@js-camp/react/store/studios/dispatchers';
import { saveAnimeImage } from '@js-camp/react/store/animeImage/dispatchers';

import { FormSelect } from './components/FormSelect/FormSelect';
import { AnimeFormSchema, defaultAnimeFormValues } from './formConfig';
import { FormAutocomplete } from './components/FormAutocomplete/FormAutocomplete';

interface Props {

  /** Anime data. */
  readonly animeDetail?: AnimeDetailPost;

  /** On submit handler. */
  readonly onSubmit: (data: AnimeDetailPost) => void;
}

const AnimeFormComponent: FC<Props> = ({ animeDetail, onSubmit }) => {
  const dispatch = useAppDispatch();
  const genresList = useAppSelector(selectGenres);
  const studiosList = useAppSelector(selectStudios);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const onFormSubmission = useCallback((values: AnimeDetailPost) => {
    if (imageFile !== null) {
      dispatch(saveAnimeImage(imageFile)).then(response => {
        formik.setFieldValue('image', response.payload);
        onSubmit(values);
      });
    } else {
      onSubmit(values);
    }
    formik.setSubmitting(false);
  }, [dispatch, imageFile]);

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchStudios());
  }, []);

  const formik = useFormik({
    initialValues: animeDetail ?? defaultAnimeFormValues,
    validationSchema: AnimeFormSchema,
    onSubmit: onFormSubmission,
  });

  const onImageChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  }, []);

  const onStudiosChange = (value: readonly Studio[]) => {
    formik.setFieldValue('studioList', value);
  };

  const onGenresChange = (value: readonly Genre[]) => {
    formik.setFieldValue('genreList', value);
  };
  return (
    <>
      <Input type="file" onChange={onImageChange} />
      <FormikProvider value={formik}>
        <Form>
          <Field
            component={TextField}
            name="image"
            type="text"
            label="Image"
            margin="normal"
            fullWidth
          />
          <Field
            component={TextField}
            type="text"
            label="English Title"
            name="englishTitle"
            margin="normal"
            fullWidth
          />
          <Field
            component={TextField}
            type="text"
            label="Synopsis"
            name="synopsis"
            margin="normal"
            fullWidth
          />
          <Field
            component={TextField}
            type="text"
            label="Trailer Id"
            name="youtubeTrailerId"
            margin="normal"
            fullWidth
          />
          <Box>
            <FormSelect name="type" label="Type" dataSource={AnimeType} />
            <FormSelect name="status" label="Status" dataSource={AnimeStatus} />
          </Box>
          <FormSelect name="source" label="Source" dataSource={Source} />
          <FormSelect name="rating" label="Rating" dataSource={Rating} />
          <FormSelect name="season" label="Season" dataSource={Season} />
          <FormControlLabel
            label="Airing"
            control={<Field component={Switch} type="checkbox" name="airing" />}
          />
          <FormAutocomplete
            name="genreList"
            label="Genres"
            options={genresList}
            onChange={onGenresChange}
            getOptionLabel={(genre: Genre) => genre.name}
          />
          <FormAutocomplete
            name="studioList"
            label="Studios"
            onChange={onStudiosChange}
            options={studiosList}
            getOptionLabel={(studio: Studio) => studio.name}
          />
          <Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </>
  );
};

export const AnimeForm = memo(AnimeFormComponent);
