import { FC, memo, useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import {
  selectAuthError,
} from '@js-camp/react/store/auth/selectors';
import { useAppSelector } from '@js-camp/react/store/store';

import { HttpError } from '@js-camp/core/models/httpError';

import { Severity } from '../../../../shared/components/MySnackbar/MySnackbar';

import { MySnackbar } from '../../../../shared/components/';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

const RegisterPageComponent: FC = () => {
  const httpError = useAppSelector(selectAuthError);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  useEffect(() => {
    if (httpError instanceof HttpError) {
      setIsSnackbarOpen(true);
    }
  }, [httpError]);

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
      <Typography variant="h3" align="center" p={2}>Register</Typography>
      <RegisterForm errors={httpError}/>
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
