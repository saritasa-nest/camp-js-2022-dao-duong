import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';

import { selectIsUser } from '@js-camp/react/store/user/selector';

import { selectHasAuthToken } from '@js-camp/react/store/auth/selectors';

import { TokenService } from '../../api/services/tokenService';

export const NoAuthGuard: FC = () => {
  const hasTokenFromLocalStorage = TokenService.hasToken();
  const hasTokenFromAppStore = useAppSelector(selectHasAuthToken);
  const isUser = useAppSelector(selectIsUser);
  if (isUser || hasTokenFromLocalStorage || hasTokenFromAppStore) {
    const redirect: To = {
      pathname: '/',
    };

    return <Navigate to={redirect} replace/>;
  }
  return <Outlet />;
};
