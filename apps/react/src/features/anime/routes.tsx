import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AuthGuard } from '../../routes/guards';

export const AnimePage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.AnimePage,
  })));
export const animeRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'anime',
        element: <AnimePage />,
      },
    ],
  },
];
