import { FC } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';

import { selectIsAuthorized } from '@js-camp/react/store/auth/selectors';
import { selectUser } from '@js-camp/react/store/user/selectors';

import { fetchUser } from '@js-camp/react/store/user/dispatchers';

import { TokenService } from '../../api/services/tokenService';

export const AuthGuard: FC = () => {
  const dispatch = useAppDispatch();
  const hasToken = TokenService.hasToken();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const user = useAppSelector(selectUser);

  if (hasToken && user === null) {
    dispatch(fetchUser());
    return <div>Fetch User...</div>;
  }
  if (!isAuthorized && !hasToken) {
    const redirect: To = {
      pathname: 'auth/login',
    };
    return <Navigate to={redirect} replace/>;
  }
  return <Outlet />;
};
