import { FC, memo } from 'react';
import { Container, Typography } from '@mui/material';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

const RegisterPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Typography variant="h3" align="center" p={2}>Register</Typography>
    <RegisterForm />
  </Container>
);

export const RegisterPage = memo(RegisterPageComponent);
