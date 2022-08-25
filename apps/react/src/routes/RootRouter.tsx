import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';
import { userRoutes } from '../features/user/routes';

const routes: RouteObject[] = [
  ...genresRoutes,
  ...authRoutes,
  ...userRoutes,
  {
    path: '*',
    element: <Navigate to="/genres" />,
  },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
