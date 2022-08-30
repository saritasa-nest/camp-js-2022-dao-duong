import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from '../features/auth/routes';
import { userRoutes } from '../features/user/routes';
import { animeRoutes } from '../features/anime/routes';

import { AuthGuard, NoAuthGuard } from './guards';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/genres" />,
  },
  {
    element: <AuthGuard />,
    children: [...animeRoutes, ...userRoutes],
  },
  {
    element: <NoAuthGuard />,
    children: [...authRoutes],
  },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
