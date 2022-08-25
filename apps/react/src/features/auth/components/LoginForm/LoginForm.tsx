import { Login } from '@js-camp/core/models/auth/login';
import { login } from '@js-camp/react/store/auth/dispatchers';
import { selectIsAuthLoading } from '@js-camp/react/store/auth/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { LinearProgress, Grid, Button, Link } from '@mui/material';
import { useFormik, FormikProvider, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { defaultLoginValues, LoginSchema } from '../../components/LoginForm/formConfig';

import styles from './LoginForm.module.css';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);

  const onFormSubmission = (values: Login) => {
    formik.setSubmitting(false);
    dispatch(login(values));
  };

  const formik = useFormik({
    initialValues: defaultLoginValues,
    validationSchema: LoginSchema,
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
            type="submit"
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
  );
};

export const LoginForm = memo(LoginFormComponent);
