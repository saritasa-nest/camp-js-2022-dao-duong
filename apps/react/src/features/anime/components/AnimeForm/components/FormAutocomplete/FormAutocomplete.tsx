import {
  AutocompleteRenderInputParams,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Field } from 'formik';
import { Autocomplete } from 'formik-mui';
import { SyntheticEvent, useState } from 'react';

import { AddOption } from '../AddOption/AddOption';

interface Props<T> {

  /** Field name. */
  readonly name: string;

  /** Field label. */
  readonly label: string;

  /** Data for select. */
  readonly options: readonly T[];

  /** Get the option label. */
  readonly getOptionLabel: (option: T) => string;

  /** Get the option label. */
  readonly onChange: (value: readonly T[]) => void;

  /** Add new option handler. */
  readonly onAddOption: (value: string) => void;

  /** Loading state. */
  readonly loading: boolean;
}

export const FormAutocomplete = <T extends object>({
  name,
  label,
  options,
  getOptionLabel,
  onChange,
  onAddOption,
  loading,
}: Props<T>) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleAutoCompleteChange = (event: SyntheticEvent, value: T[]) => {
    onChange(value);
  };

  const onInputChange = (event: SyntheticEvent, value: string) => {
    setSearchValue(value);
  };

  return (
    <Field
      component={Autocomplete}
      multiple
      noOptionsText={
        <AddOption newOption={searchValue} addOption={onAddOption} />
      }
      name={name}
      label={label}
      loading={loading}
      loadingText={<CircularProgress />}
      options={options}
      onInputChange={onInputChange}
      onChange={handleAutoCompleteChange}
      getOptionLabel={(option: T) => getOptionLabel(option)}
      isOptionEqualToValue={(option: T, value: T) =>
        getOptionLabel(option) === getOptionLabel(value)
      }
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={`Search for ${label}`}
        />
      )}
    />
  );
};
