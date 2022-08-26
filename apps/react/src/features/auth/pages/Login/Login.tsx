import { FC, memo, useState, useEffect, SyntheticEvent } from 'react';
import { Container, Typography } from '@mui/material';
import { useAppSelector } from '@js-camp/react/store';
import {
  selectAuthError,
} from '@js-camp/react/store/auth/selectors';

import { HttpError } from '@js-camp/core/models/httpError';

import { LoginForm } from '../../components/LoginForm/LoginForm';

import { MySnackbar } from '../../../../shared/components/';
import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';

const LoginPageComponent: FC = () => {
  const httpError = useAppSelector(selectAuthError);
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

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center" p={2}>Login</Typography>
      <LoginForm />
      <MySnackbar
        isOpen={isSnackbarOpen}
        duration={5000}
        onClose={onSnackbarClose}
        severity={Severity.error}
        message={httpError?.detail ?? 'Error'}
      />
    </Container>
  );
};

export const LoginPage = memo(LoginPageComponent);
