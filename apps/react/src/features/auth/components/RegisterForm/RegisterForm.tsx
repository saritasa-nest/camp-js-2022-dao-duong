import { HttpError } from '@js-camp/core/models/httpError';
import { register } from '@js-camp/react/store/auth/dispatchers';
import {
  selectAuthError,
  selectIsAuthLoading,
} from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { LinearProgress, Grid, Button, Link } from '@mui/material';
import { useFormik, FormikProvider, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { FC, memo, SyntheticEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';
import { MySnackbar } from '../../../../shared/components/';
import { transformError } from '../../utils/error';

import {
  RegisterValues,
  defaultRegisterValues,
  RegisterSchema,
} from './formConfig';

const RegisterFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const httpError = useAppSelector(selectAuthError);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const onFormSubmission = (values: RegisterValues) => {
    formik.setSubmitting(false);
    dispatch(register(values));
  };

  useEffect(() => {
    if (httpError instanceof HttpError) {
      setIsSnackbarOpen(true);
      formik.setErrors(transformError(httpError).fieldsError);
    }
  }, [httpError]);

  const onSnackbarClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: defaultRegisterValues,
    validationSchema: RegisterSchema,
    onSubmit: onFormSubmission,
  });
  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <Field
            margin="normal"
            fullWidth
            component={TextField}
            name="email"
            type="email"
            label="Email"
            required
          />
          <Field
            margin="normal"
            fullWidth
            component={TextField}
            name="firstName"
            type="text"
            label="First Name"
          />
          <Field
            margin="normal"
            fullWidth
            component={TextField}
            name="lastName"
            type="text"
            label="Last Name"
          />
          <Field
            margin="normal"
            fullWidth
            component={TextField}
            name="password"
            type="password"
            label="Password"
            required
          />
          <Field
            margin="normal"
            fullWidth
            component={TextField}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            required
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
            >
              Register
            </Button>
          </Grid>
        </Form>
      </FormikProvider>
      <MySnackbar
        isOpen={isSnackbarOpen}
        duration={5000}
        onClose={onSnackbarClose}
        severity={Severity.error}
        message={httpError?.detail ?? 'Error'}
      />
    </>
  );
};

export const RegisterForm = memo(RegisterFormComponent);
