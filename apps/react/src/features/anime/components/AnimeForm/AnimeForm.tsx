import {
  AnimeDetailPost,
  AnimeStatus,
  AnimeType,
  Source,
  Rating,
  Season,
} from '@js-camp/core/models/anime';
import { Box, Button, FormControlLabel, Input } from '@mui/material';
import {
  ChangeEventHandler,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Switch } from 'formik-mui';
import { useAppDispatch } from '@js-camp/react/store/store';
import { fetchGenres } from '@js-camp/react/store/genres/dispatchers';
import { fetchStudios } from '@js-camp/react/store/studios/dispatchers';
import { saveAnimeImage } from '@js-camp/react/store/animeImage/dispatchers';

import { FormSelect } from './components/FormSelect/FormSelect';
import { AnimeFormSchema, defaultAnimeFormValues } from './formConfig';
import { FormTextInput } from './components/FormTextInput/FormTextInput';
import { FormAutocompletes } from './components/FormAutocompletes/FormAutocompletes';
import { FormDateSelect } from './components/FormDateSelect/FormDateSelect';

interface Props {

  /** Anime data. */
  readonly animeDetail?: AnimeDetailPost;

  /** On submit handler. */
  readonly onSubmit: (data: AnimeDetailPost) => void;
}

const convertNullToUndefined = (data: AnimeDetailPost): AnimeDetailPost => {
  const dataMap: Record<string, undefined> = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value === null) {
      dataMap[key] = undefined;
    }
  });
  return {
    ...data,
    ...dataMap,
  };
};

const AnimeFormComponent: FC<Props> = ({ animeDetail, onSubmit }) => {
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const onFormSubmission = useCallback(
    (values: AnimeDetailPost) => {
        if (imageFile !== null) {
          dispatch(saveAnimeImage(imageFile)).then(response => {
            if (typeof response.payload === 'string') {
              onSubmit({ ...values, image: response.payload });
            }
          });
        } else {
          onSubmit(values);
        }
        formik.setSubmitting(false);
      }, [dispatch, imageFile],
  );

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchStudios());
  }, []);

  const formik = useFormik({
    initialValues: convertNullToUndefined(
      animeDetail ?? defaultAnimeFormValues,
    ),
    validationSchema: AnimeFormSchema,
    onSubmit: onFormSubmission,
  });

  const onImageChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    event => {
      if (event.target.files) {
        const file = event.target.files[0];
        setImageFile(file);
        formik.setFieldValue('image', URL.createObjectURL(file));
      }
    },
    [],
  );

  const handleStartDateChange = (date: Date) => {
    formik.setFieldValue('aired.start', date);
  };

  const handleEndDateChange = (date: Date) => {
    formik.setFieldValue('aired.end', date);
  };

  const initialAiredStart = formik.getFieldMeta('aired.start').value ?
    new Date(formik.getFieldMeta('aired.start').value) :
    null;

  const initialAiredEnd = formik.getFieldMeta('aired.end').value ?
    new Date(formik.getFieldMeta('aired.end').value) :
    null;

  return (
    <>
      <img src={formik.values.image ?? undefined} alt="Amime image" />
      <Input type="file" onChange={onImageChange} />
      <FormikProvider value={formik}>
        <Form>
          <FormTextInput name="englishTitle" label="English Title" />
          <FormTextInput name="japaneseTitle" label="Japansese Title" />
          <FormTextInput name="synopsis" label="synopsis" />
          <FormTextInput name="youtubeTrailerId" label="Trailer Id" />
          <Box>
            <FormSelect name="type" label="Type" dataSource={AnimeType} />
            <FormSelect name="status" label="Status" dataSource={AnimeStatus} />
          </Box>
          <FormSelect name="source" label="Source" dataSource={Source} />
          <FormSelect name="rating" label="Rating" dataSource={Rating} />
          <FormSelect name="season" label="Season" dataSource={Season} />
          <FormDateSelect
            name="aired.start"
            label="Aired start"
            initialValue={initialAiredStart}
            onDateChange={handleStartDateChange}
          />
          <FormDateSelect
            name="aired.end"
            label="Aired end"
            initialValue={initialAiredEnd}
            onDateChange={handleEndDateChange}
            error={formik.errors.aired?.end}
          />
          <FormControlLabel
            label="Airing"
            control={<Field component={Switch} type="checkbox" name="airing" />}
          />
          <FormAutocompletes setFieldValue={formik.setFieldValue} />
          <Box>
            <Button
              type="button"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              onClick={() => onFormSubmission(formik.values)}
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
