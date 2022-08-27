import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AuthGuard } from '../../routes/guards';

export const ProfilePage = lazy(() =>
  import('./pages/Profile/Profile').then(module => ({
    default: module.Profile,
  })));

export const userRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    path: 'user',
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
];
