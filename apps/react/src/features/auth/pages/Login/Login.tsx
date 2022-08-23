import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, LinearProgress, Container, Link, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';
import { useAppDispatch } from '@js-camp/react/store';
import { Login } from '@js-camp/core/models/auth/login';

import { login } from '@js-camp/react/store/auth/dispatchers';

import styles from './Login.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

const LoginPageComponent: FC = () => {
  const dispatch = useAppDispatch();

  const defaultValue: Login = {
    email: '',
    password: '',
  };

  const onFormSubmission = (values: Login) => {
    dispatch(login(values));
    // eslint-disable-next-line no-console
    console.log(values);
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
        {({ submitForm, isSubmitting }) => (
          <Form >
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
            {isSubmitting && <LinearProgress />}
            <br />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link component={RouterLink} to="/auth/register">Don't have an account?</Link>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>);
};

export const LoginPage = memo(LoginPageComponent);
