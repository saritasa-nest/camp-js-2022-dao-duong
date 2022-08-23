import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

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
