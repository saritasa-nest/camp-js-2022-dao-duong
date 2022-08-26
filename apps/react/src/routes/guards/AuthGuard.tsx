import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { selectUser } from '@js-camp/react/store/user/selector';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';

import { TokenService } from '../../api/services/tokenService';

export const AuthGuard: FC = () => {
  const dispatch = useAppDispatch();
  const token = TokenService.getTokens();
  const user = useAppSelector(selectUser);
  if (token && !user) {
    dispatch(fetchUser());
  }
  if (user || token) {
    return <Outlet />;
  }
  const redirect: To = {
    pathname: 'auth/login',
  };
  return <Navigate to={redirect} replace/>;
};
