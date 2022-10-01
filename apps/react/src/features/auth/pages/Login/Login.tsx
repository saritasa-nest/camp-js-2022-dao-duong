import { FC, memo } from 'react';
import { Container, Typography } from '@mui/material';

import { LoginForm } from '../../components/LoginForm/LoginForm';

const LoginPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Typography variant="h3" align="center" p={2}>Login</Typography>
    <LoginForm />
  </Container>
);

export const LoginPage = memo(LoginPageComponent);
