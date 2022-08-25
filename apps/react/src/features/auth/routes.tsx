import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { NoAuthGuard } from '../../routes/guards';

const LoginPage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.LoginPage,
  })));

const RegisterPage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.RegisterPage,
  })));
export const authRoutes: RouteObject[] = [
  {
    element: <NoAuthGuard />,
    path: 'auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
];
