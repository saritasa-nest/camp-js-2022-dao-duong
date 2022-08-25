import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AuthGuard } from '../../routes/guards/';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'genres',
        element: <GenresPage />,
      },
    ],
  },
];
