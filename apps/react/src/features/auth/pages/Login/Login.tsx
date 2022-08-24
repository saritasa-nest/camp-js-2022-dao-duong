import { FC, memo, forwardRef, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  LinearProgress,
  Container,
  Link,
  Grid,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Login } from '@js-camp/core/models/auth/login';

import { login } from '@js-camp/react/store/auth/dispatchers';

import {
  selectAuthError,
  selectIsAuthLoading,
} from '@js-camp/react/store/auth/selectors';

import { HttpError } from '@js-camp/core/models/httpError';

import styles from './Login.module.css';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

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
                Submit
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={onSnackbarClose}
      >
        <Alert
          severity="error"
          sx={{ width: '100%' }}
          onClose={onSnackbarClose}
        >
          {httpError?.detail}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export const LoginPage = memo(LoginPageComponent);
