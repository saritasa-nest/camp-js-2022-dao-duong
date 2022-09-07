import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { AppDetailPlaceholder } from '../../shared/components';

export const AnimePage = lazy(() =>
  import('./pages/').then(module => ({
    default: module.AnimePage,
  })));

export const DetailPage = lazy(() =>
  import('./pages').then(module => ({
    default: module.DetailPage,
  })));

export const AddPage = lazy(() =>
  import('./pages').then(module => ({
  default: module.AddPage,
  })));

export const EditPage = lazy(() =>
  import('./pages').then(module => ({
    default: module.EditPage,
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
        element: <DetailPage />,
      },
      {
        path: 'add',
        element: <AddPage />,
      },
      {
        path: 'edit/:id',
        element: <EditPage />,
      },
    ],
  },
];
