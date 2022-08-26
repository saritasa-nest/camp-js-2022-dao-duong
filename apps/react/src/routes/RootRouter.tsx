import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from '../features/auth/routes';
import { userRoutes } from '../features/user/routes';
import { animeRoutes } from '../features/anime/routes';

const routes: RouteObject[] = [
  ...animeRoutes,
  ...authRoutes,
  ...userRoutes,
  {
    path: '*',
    element: <Navigate to="/anime" />,
  },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
