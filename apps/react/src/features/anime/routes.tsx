import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const AnimePage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.AnimePage,
  })));

export const AnimeDetail = lazy(() =>
  import('../anime/components/AnimeDetail/AnimeDetail').then(module => ({
    default: module.AnimeDetail,
  })));
export const animeRoutes: RouteObject[] = [
  {
    path: 'anime',
    element: <AnimePage />,
    children: [
      {
        path: ':id',
        element: <AnimeDetail />,
      },
    ],
  },
];
