import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import { Field } from 'formik';
import { Autocomplete } from 'formik-mui';

interface Props<T> {

  /** Field name. */
  readonly name: string;

  /** Field label. */
  readonly label: string;

  /** Data for select. */
  readonly options: readonly T[];

  /** Get the option label. */
  readonly getOptionLabel: (option: T) => string;
}

export const FormAutocomplete = <T extends object>({
  name,
  label,
  options,
  getOptionLabel,
}: Props<T>) => (
  <Field
    component={Autocomplete}
    multiple
    name={name}
    label={label}
    options={options}
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
