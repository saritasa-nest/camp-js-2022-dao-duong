import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { selectIsUser } from '@js-camp/react/store/user/selector';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';

import { TokenService } from '../../api/services/tokenService';

export const AuthGuard: FC = () => {
  const dispatch = useAppDispatch();
  const hasToken = TokenService.hasToken();
  const isUser = useAppSelector(selectIsUser);
  if (hasToken && !isUser) {
    dispatch(fetchUser());
  }
  if (isUser || hasToken) {
    return <Outlet />;
  }
  const redirect: To = {
    pathname: 'auth/login',
  };
  return <Navigate to={redirect} replace/>;
};
