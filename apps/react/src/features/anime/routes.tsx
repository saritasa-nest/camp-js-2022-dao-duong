import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AppDetailPlaceholder } from '../../shared/components';

export const AnimePage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.AnimePage,
  })));

export const AnimeDetailPage = lazy(() =>
  import('./pages').then(module => ({
    default: module.AnimeDetailPage,
  })));
export const animeRoutes: RouteObject[] = [
  {
    path: 'anime',
    element: <AnimePage />,
    children: [
      {
        path: '',
        element: <AppDetailPlaceholder />,
      },
      {
        path: ':id',
        element: <AnimeDetailPage />,
      },
    ],
  },
];
