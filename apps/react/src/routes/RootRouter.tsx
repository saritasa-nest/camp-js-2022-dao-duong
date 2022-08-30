import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';
import { userRoutes } from '../features/user/routes';

import { AuthGuard, NoAuthGuard } from './guards';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/genres" />,
  },
  {
    element: <AuthGuard />,
    children: [...genresRoutes, ...userRoutes],
  },
  {
    element: <NoAuthGuard />,
    children: [...authRoutes],
  },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
