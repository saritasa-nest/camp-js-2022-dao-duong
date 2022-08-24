import { FC, memo, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, LinearProgress, Container, Link, Grid } from '@mui/material';
import { Form, Field, useFormik, FormikProvider } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Login } from '@js-camp/core/models/auth/login';
import { login } from '@js-camp/react/store/auth/dispatchers';

import {
  selectAuthError,
  selectAuthToken,
  selectIsAuthLoading,
} from '@js-camp/react/store/auth/selectors';

import { HttpError } from '@js-camp/core/models/httpError';

import { MySnackbar } from '../../../../shared/components/';
import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';

import styles from './Login.module.css';
import { defaultLoginValues, LoginSchema } from './formConfig';
const LoginPageComponent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const httpError = useAppSelector(selectAuthError);
  const token = useAppSelector(selectAuthToken);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (httpError instanceof HttpError) {
      setIsSnackbarOpen(true);
    }
  }, [httpError]);
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const onFormSubmission = (values: Login) => {
    formik.setSubmitting(false);
    dispatch(login(values));
  };

  const formik = useFormik({
    initialValues: defaultLoginValues,
    validationSchema: LoginSchema,
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
      <h1 className={styles['title']}>Login</h1>
      <FormikProvider value={formik}>
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
              disabled={formik.isSubmitting}
              onClick={formik.submitForm}
            >
              Login
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

export const LoginPage = memo(LoginPageComponent);
