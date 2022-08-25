import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';
import { selectIsAuthUser } from '@js-camp/react/store/auth/selectors';

import { TokenService } from '../../api/services/tokenService';

export const NoAuthGuard: FC = () => {
  const token = TokenService.getTokens();
  const isAuth = useAppSelector(selectIsAuthUser);
  if (isAuth || token) {
    const redirect: To = {
      pathname: '/',
    };
    return <Navigate to={redirect} replace/>;
  }
  return <Outlet />;
};
