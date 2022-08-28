import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';

import { selectIsAuthorized } from '@js-camp/react/store/auth/selectors';

import { TokenService } from '../../api/services/tokenService';

export const NoAuthGuard: FC = () => {
  const hasTokenFromLocalStorage = TokenService.hasToken();
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized || hasTokenFromLocalStorage) {
    const redirect: To = {
      pathname: '/',
    };

    return <Navigate to={redirect} replace/>;
  }

  return <Outlet />;
};
