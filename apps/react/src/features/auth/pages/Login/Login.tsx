import * as Yup from 'yup';
import { FC, memo, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  LinearProgress,
  Container,
  Link,
  Grid,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Login } from '@js-camp/core/models/auth/login';

import { login } from '@js-camp/react/store/auth/dispatchers';

import {
  selectAuthError,
  selectIsAuthLoading,
} from '@js-camp/react/store/auth/selectors';

import { HttpError } from '@js-camp/core/models/httpError';

import { MySnackbar } from '../../../../shared/components/';
import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';

import styles from './Login.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

const LoginPageComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const httpError = useAppSelector(selectAuthError);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (httpError instanceof HttpError) {
      setIsSnackbarOpen(true);
    }
  }, [httpError]);
  const defaultValue: Login = {
    email: '',
    password: '',
  };

  const onFormSubmission = (values: Login) => {
    dispatch(login(values));
  };

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
      <h1 className={styles['title']}>Login</h1>
      <Formik
        initialValues={defaultValue}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onFormSubmission(values);
        }}
      >
        {({ submitForm }) => (
          <Form>
            <Field
              className={styles['input']}
              component={TextField}
              name="email"
              type="email"
              label="Email"
            />
            <br />
            <Field
              className={styles['input']}
              component={TextField}
              type="password"
              label="Password"
              name="password"
            />
            {isLoading && <LinearProgress />}
            <br />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link component={RouterLink} to="/auth/register">
                Don't have an account?
              </Link>
              <Button
                variant="contained"
                color="primary"
                disabled={isLoading}
                onClick={submitForm}
              >
                Login
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      <MySnackbar
        open={isSnackbarOpen}
        duration={5000}
        onClose={onSnackbarClose}
        severity= {Severity.error}
        message={httpError?.detail ?? 'Error'}
      />
    </Container>
  );
};

export const LoginPage = memo(LoginPageComponent);
