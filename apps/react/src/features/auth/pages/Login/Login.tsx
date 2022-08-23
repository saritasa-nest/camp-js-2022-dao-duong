import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, LinearProgress, Container, Link, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';

import styles from './Login.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

interface LoginValues {

  /** Email. */
  email: string;

  /** Password. */
  password: string;
}

const LoginPageComponent: FC = () => {
  const defaultValue: LoginValues = {
    email: '',
    password: '',
  };

  const onFormSubmission = (values: LoginValues) => {
    alert(JSON.stringify(values, null, 2));
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

export const Login = memo(LoginPageComponent);
