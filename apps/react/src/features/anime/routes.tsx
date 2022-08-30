import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

export const AnimePage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.AnimePage,
  })));
export const animeRoutes: RouteObject[] = [

  {
    path: 'anime',
    element: <AnimePage />,
  },

];
