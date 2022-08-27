import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';

import { selectIsUser } from '@js-camp/react/store/user/selector';

import { TokenService } from '../../api/services/tokenService';

export const NoAuthGuard: FC = () => {
  const hasToken = TokenService.hasToken();
  const isUser = useAppSelector(selectIsUser);
  if (isUser || hasToken) {
    const redirect: To = {
      pathname: '/',
    };

    return <Navigate to={redirect} replace/>;
  }
  return <Outlet />;
};
