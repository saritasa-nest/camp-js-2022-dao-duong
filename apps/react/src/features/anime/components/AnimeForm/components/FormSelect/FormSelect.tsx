import {
  AnimeStatus,
  AnimeType,
  Rating,
  Season,
  Source,
} from '@js-camp/core/models/anime';

import { MenuItem } from '@mui/material';
import { Field } from 'formik';
import { Select } from 'formik-mui';
import { FC, memo } from 'react';

type FormEnum =
  | typeof AnimeStatus
  | typeof Rating
  | typeof Season
  | typeof AnimeType
  | typeof Source;

interface Props {

  /** Field name. */
  readonly name: string;

  /** Field label. */
  readonly label: string;

  /** Data for select. */
  readonly dataSource: FormEnum;
}

const FormSelectComponent: FC<Props> = ({ name, label, dataSource }) => (
  <Field component={Select} name={name} label={label}>
    {Object.entries(dataSource).map(([key, value]) => (
      <MenuItem key={key} value={value}>{key}</MenuItem>
    ))}
  </Field>
);

export const FormSelect = memo(FormSelectComponent);
