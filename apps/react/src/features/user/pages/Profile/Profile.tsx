import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/user/selector';
import { FC, memo, useEffect } from 'react';

const ProfileComponent: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsUserLoading);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export const Profile = memo(ProfileComponent);
