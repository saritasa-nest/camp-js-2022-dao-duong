import { Login } from '@js-camp/core/models/auth/login';
import { HttpError } from '@js-camp/core/models/httpError';
import { login } from '@js-camp/react/store/auth/dispatchers';
import { selectAuthError, selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { LinearProgress, Grid, Button, Link } from '@mui/material';

import { useFormik, FormikProvider, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { FC, memo, SyntheticEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';
import { MySnackbar } from '../../../../shared/components/';

import { defaultLoginValues, LoginSchema } from '../../components/LoginForm/formConfig';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const httpError = useAppSelector(selectAuthError);

  const onFormSubmission = (values: Login) => {
    formik.setSubmitting(false);
    dispatch(login(values));
  };

  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (httpError instanceof HttpError) {
      setIsSnackbarOpen(true);
    }
  }, [httpError]);

  const onSnackbarClose = (
    event?: SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: defaultLoginValues,
    validationSchema: LoginSchema,
    onSubmit: onFormSubmission,
  });
  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
            margin="normal"
            fullWidth
          />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
            margin="normal"
            fullWidth
          />
          {isLoading && <LinearProgress />}
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
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
          Login
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

export const LoginForm = memo(LoginFormComponent);
