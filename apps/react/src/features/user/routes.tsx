import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const ProfilePage = lazy(() =>
  import('./pages/Profile/Profile').then(module => ({
    default: module.Profile,
  })));

export const userRoutes: RouteObject[] = [
  {
    path: 'user',
    children: [
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
];
