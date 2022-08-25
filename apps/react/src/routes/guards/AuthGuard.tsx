import { selectAuthToken } from '@js-camp/react/store/auth/selectors';
import { FC, useEffect } from 'react';
import { Navigate, Outlet, To } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { getToken } from '@js-camp/react/store/auth/dispatchers';

export const AuthGuard: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);
  useEffect(() => {
    dispatch(getToken());
  }, []);
  if (!token) {
    const redirect: To = {
      pathname: 'auth/login',
    };
    return <Navigate to={redirect} />;
  }
  return <Outlet />;
};
