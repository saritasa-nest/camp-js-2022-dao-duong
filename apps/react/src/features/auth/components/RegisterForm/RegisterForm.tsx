import { HttpError } from '@js-camp/core/models/httpError';
import { register } from '@js-camp/react/store/auth/dispatchers';
import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { LinearProgress, Grid, Button, Link } from '@mui/material';
import { useFormik, FormikProvider, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { FC, memo, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { transformError } from '../../utils/error';

import { RegisterValues, defaultRegisterValues, RegisterSchema } from './formConfig';

import styles from './RegisterForm.module.css';

interface RegisterFormProps {

  /** Error from registration process. */
  readonly errors?: HttpError;
}

const RegisterFormComponent: FC<RegisterFormProps> = ({ errors }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);

  const onFormSubmission = (values: RegisterValues) => {
    formik.setSubmitting(false);
    dispatch(register(values));
  };

  useEffect(() => {
      if (errors) {
        formik.setErrors(transformError(errors).fieldsError);
      }
  }, [errors]);

  const formik = useFormik({
    initialValues: defaultRegisterValues,
    validationSchema: RegisterSchema,
    onSubmit: onFormSubmission,
  });
  return (
    <FormikProvider value={formik}>
      <Form>
        <Field
          className={styles['input']}
          component={TextField}
          name="email"
          type="email"
          label="Email"
        />
        <Field
          className={styles['input']}
          component={TextField}
          name="firstName"
          type="text"
          label="First Name"
        />
        <Field
          className={styles['input']}
          component={TextField}
          name="lastName"
          type="text"
          label="Last Name"
        />
        <Field
          className={styles['input']}
          component={TextField}
          name="password"
          type="password"
          label="Password"
        />
        <Field
          className={styles['input']}
          component={TextField}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
        />
        {isLoading && <LinearProgress />}
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link component={RouterLink} to="/auth/login">
              Have an account?
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            onClick={formik.submitForm}
          >
              Register
          </Button>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
