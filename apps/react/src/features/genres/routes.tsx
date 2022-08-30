import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
  {
    path: 'genres',
    element: <GenresPage />,
  },
];
