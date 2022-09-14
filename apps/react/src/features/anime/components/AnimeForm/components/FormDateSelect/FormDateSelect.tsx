import { FC, memo, useState } from 'react';

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { Field } from 'formik';

interface Props {

  /** Initial value. */
  readonly initialValue: Date | null;

  /** Label name. */
  readonly label: string;

  /** Field name. */
  readonly name: string;

  /** Field error. */
  readonly error?: string;

  /** Handle date change. */
  readonly onDateChange: (date: Date) => void;
}

const FormDateSelectComponent: FC<Props> = ({
  onDateChange,
  initialValue,
  name,
  label,
}) => {
  const [value, setValue] = useState<Date | null>(initialValue);

  const handleDateChange = (newValue: Date | null) => {
    setValue(newValue);
    if (newValue !== null) {
      onDateChange(newValue);
    }
  };
  return (
    <Field
      name={name}
      component={LocalizationProvider}
      dateAdapter={AdapterDayjs}
    >
      <DatePicker
        disableFuture
        label={label}
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={handleDateChange}
        renderInput={params => (
          <TextField
            {...params}
          />
        )}
      />
    </Field>
  );
};

export const FormDateSelect = memo(FormDateSelectComponent);
