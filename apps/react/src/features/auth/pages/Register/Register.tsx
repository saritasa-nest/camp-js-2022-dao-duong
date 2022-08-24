/* eslint-disable max-lines-per-function */
import * as Yup from 'yup';
import { FC, memo, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, LinearProgress, Container, Link, Grid } from '@mui/material';
import { Form, Field, useFormik, FormikProvider } from 'formik';
import { TextField } from 'formik-mui';
import {
  selectIsAuthLoading,
  selectAuthError,
  selectAuthToken,
} from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { register } from '@js-camp/react/store/auth/dispatchers';

import { HttpError } from '@js-camp/core/models/httpError';

import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';

import { MySnackbar } from '../../../../shared/components/';

import { transformError } from '../../utils/error';

import styles from './Register.module.css';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required')
    .max(254, 'Too long!'),
  firstName: Yup.string().max(30, 'Too long!'),
  lastName: Yup.string().max(30, 'Too long!'),
  password: Yup.string().required('Password required'),

  // .max(128, 'Too long!'),
  confirmPassword: Yup.string()
    .required('Confirm password required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

interface RegisterValues {

  /** Email. */
  email: string;

  /** First name. */
  firstName: string;

  /** Last name. */
  lastName: string;

  /** Password. */
  password: string;

  /** Confirm password. */
  confirmPassword: string;
}

const RegisterPageComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const httpError = useAppSelector(selectAuthError);
  const token = useAppSelector(selectAuthToken);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (httpError instanceof HttpError) {
      setIsSnackbarOpen(true);
      formik.setErrors(transformError(httpError).fieldsError);
    }
  }, [httpError]);
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  const defaultRegisterValue: RegisterValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

  const onFormSubmission = (values: RegisterValues) => {
    formik.setSubmitting(false);
    dispatch(register(values));
  };

  const formik = useFormik({
    initialValues: defaultRegisterValue,
    validationSchema: RegisterSchema,
    onSubmit: onFormSubmission,
  });
  const onSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <h1 className={styles['title']}>Register</h1>
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
      <MySnackbar
        open={isSnackbarOpen}
        duration={5000}
        onClose={onSnackbarClose}
        severity={Severity.error}
        message={httpError?.detail ?? 'Error'}
      />
    </Container>
  );
};

export const RegisterPage = memo(RegisterPageComponent);
