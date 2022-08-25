import { selectIsAuthUser } from '@js-camp/react/store/auth/selectors';
import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';

import { TokenService } from '../../api/services/tokenService';

export const AuthGuard: FC = () => {
  const token = TokenService.getTokens();
  const isAuth = useAppSelector(selectIsAuthUser);
  if (isAuth || token) {
    return <Outlet />;
  }
  const redirect: To = {
    pathname: 'auth/login',
  };
  return <Navigate to={redirect} replace/>;
};
