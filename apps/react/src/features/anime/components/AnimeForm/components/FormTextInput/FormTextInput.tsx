import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { FC, memo } from 'react';

interface Props {

  /** Field name. */
  readonly name: string;

  /** Field label. */
  readonly label: string;
}

const FormTextInputComponent: FC<Props> = ({ name, label }) => (
  <Field
    component={TextField}
    type="text"
    label={label}
    name={name}
    margin="normal"
    fullWidth
  />
);

export const FormTextInput = memo(FormTextInputComponent);
