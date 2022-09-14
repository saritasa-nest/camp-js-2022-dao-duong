import { FC, memo } from 'react';
import { Studio, Genre } from '@js-camp/core/models/anime';
import { addGenre } from '@js-camp/react/store/genres/dispatchers';
import { selectAreGenresLoading, selectGenres } from '@js-camp/react/store/genres/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { addStudio } from '@js-camp/react/store/studios/dispatchers';
import { selectAreStudiosLoading, selectStudios } from '@js-camp/react/store/studios/selectors';

import { FormAutocomplete } from '../FormAutocomplete/FormAutocomplete';

interface Props {

  /** Set form field value callback. */
  readonly setFieldValue: (field: string, value: readonly Genre[] | readonly Studio[]) => void;
}

const FormAutocompletesComponent: FC<Props> = ({ setFieldValue }) => {
  const dispatch = useAppDispatch();
  const genresList = useAppSelector(selectGenres);
  const studiosList = useAppSelector(selectStudios);
  const areGenresLoading = useAppSelector(selectAreGenresLoading);
  const areStudiosLoading = useAppSelector(selectAreStudiosLoading);

  const onStudiosChange = (value: readonly Studio[]) => {
    setFieldValue('studioList', value);
  };

  const onGenresChange = (value: readonly Genre[]) => {
    setFieldValue('genreList', value);
  };

  const onAddGenre = (genreName: string) => {
    dispatch(addGenre(genreName));
  };

  const onAddStudio = (studioName: string) => {
    dispatch(addStudio(studioName));
  };
  return (
    <>
      <FormAutocomplete
        name="genreList"
        label="Genres"
        options={genresList}
        onAddOption={onAddGenre}
        loading={areGenresLoading}
        onChange={onGenresChange}
        getOptionLabel={(genre: Genre) => genre.name}
      />
      <FormAutocomplete
        name="studioList"
        label="Studios"
        loading={areStudiosLoading}
        onChange={onStudiosChange}
        onAddOption={onAddStudio}
        options={studiosList}
        getOptionLabel={(studio: Studio) => studio.name}
      />
    </>
  );
};

export const FormAutocompletes = memo(FormAutocompletesComponent);
