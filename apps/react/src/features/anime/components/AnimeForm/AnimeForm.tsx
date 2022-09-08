import {
  AnimeDetail,
  AnimeDetailPost,
  AnimeStatus,
  AnimeType,
  Source,
  Rating,
  Season,
  Genre,
} from '@js-camp/core/models/anime';
import { Box, Button, FormControlLabel } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Switch, TextField } from 'formik-mui';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectGenres } from '@js-camp/react/store/genres/selectors';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import { fetchGenres } from '@js-camp/react/store/genres/dispatchers';
import { fetchStudios } from '@js-camp/react/store/studios/dispatchers';

import { FormSelect } from './components/FormSelect/FormSelect';
import { AnimeFormSchema, defaultAnimeFormValues } from './formConfig';
import { FormAutocomplete } from './components/FormAutocomplete/FormAutocomplete';

interface Props {

  /** Anime data. */
  readonly animeDetail?: AnimeDetail;
}

const AnimeFormComponent: FC<Props> = ({ animeDetail }) => {
  const dispatch = useAppDispatch();
  const genresList = useAppSelector(selectGenres);
  const studiosList = useAppSelector(selectStudios);
  const onFormSubmission = (values: AnimeDetailPost) => {
    console.log(values);
    formik.setSubmitting(false);
  };

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchStudios());
  }, []);

  const formik = useFormik({
    initialValues: animeDetail ?? defaultAnimeFormValues,
    validationSchema: AnimeFormSchema,
    onSubmit: onFormSubmission,
  });

  return (
    <>
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
          <Box>
            <FormAutocomplete
              name="genreList"
              label="Genres"
              options={genresList}
              getOptionLabel={(option: Genre) => option.name}
            />
          </Box>
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
      <Box>
        <pre>{JSON.stringify(animeDetail, null, 2)}</pre>
      </Box>
    </>
  );
};

export const AnimeForm = memo(AnimeFormComponent);
