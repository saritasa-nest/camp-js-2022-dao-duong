import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, LinearProgress, Container, Link, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as Yup from 'yup';

import styles from './Register.module.css';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required')
    .max(254, 'Too long!'),
  firstName: Yup.string().max(30, 'Too long!'),
  lastName: Yup.string().max(30, 'Too long!'),
  password: Yup.string().required('Password required')
    .max(128, 'Too long!'),
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
  const defaultRegisterValue: RegisterValues = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  };

  const onFormSubmission = (values: RegisterValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Container maxWidth="xs">
      <h1 className={styles['title']}>Register</h1>
      <Formik
        initialValues={defaultRegisterValue}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onFormSubmission(values);
        }}
      >
        {({ submitForm, isSubmitting }) => (
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
            {isSubmitting && <LinearProgress />}
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
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export const Register = memo(RegisterPageComponent);
