import { Genre } from '@js-camp/core/models/anime';
import { AutocompleteRenderInputParams, TextField } from '@mui/material';
import { Field } from 'formik';
import { Autocomplete } from 'formik-mui';
import { SyntheticEvent, useState } from 'react';

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
  const [searchValue, setSearchValue] = useState<string>('');

  const handleAutoCompleteChange = (event: SyntheticEvent, value: T[]) => {
    console.log(value);
    onChange(value);
  };

  const onInputChange = (event: SyntheticEvent, value: string) => {
    setSearchValue(value);
    console.log(value);
  };

  const filterOptions = (optionss: Genre[]) => {
    let isMatch = false;
    const filtered = optionss.filter(option => {
      if (option.name === searchValue) {
        isMatch = true;
      }
      return option.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    if (isMatch) {
      return filtered;
    }
    return [{ name: `Create ${searchValue}` }, ...filtered];
  };

  return (
    <Field
      component={Autocomplete}
      multiple
      freeSolo
      name={name}
      label={label}
      filterOptions={filterOptions}
      options={options}
      onInputChange={onInputChange}
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
