import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppSelector } from '@js-camp/react/store';

import { selectUser } from '@js-camp/react/store/user/selector';

import { TokenService } from '../../api/services/tokenService';

export const NoAuthGuard: FC = () => {
  const token = TokenService.getTokens();
  const user = useAppSelector(selectUser);
  if (user || token) {
    const redirect: To = {
      pathname: '/',
    };

    return <Navigate to={redirect} replace/>;
  }
  return <Outlet />;
};
