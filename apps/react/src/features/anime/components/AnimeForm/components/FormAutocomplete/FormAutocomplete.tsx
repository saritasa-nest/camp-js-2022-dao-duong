import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import { Field } from 'formik';
import { Autocomplete } from 'formik-mui';
import { SyntheticEvent } from 'react';

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
}

export const FormAutocomplete = <T extends object>({
  name,
  label,
  options,
  getOptionLabel,
  onChange,
}: Props<T>) => {
  const handleAutoCompleteChange = (event: SyntheticEvent, value: T[]) => {
    onChange(value);
  };

  return (
    <Field
      component={Autocomplete}
      multiple
      name={name}
      label={label}
      options={options}
      onChange={handleAutoCompleteChange}
      getOptionLabel={(option: T) => getOptionLabel(option)}
      isOptionEqualToValue={(option: T, value: T) => getOptionLabel(option) === getOptionLabel(value)}
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
