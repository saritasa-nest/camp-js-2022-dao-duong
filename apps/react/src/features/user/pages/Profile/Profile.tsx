import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { fetchUser } from '@js-camp/react/store/user/dispatchers';
import { selectIsUserLoading, selectUser } from '@js-camp/react/store/user/selector';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

import { FC, memo, useEffect } from 'react';

import { MyNavbar } from '../../../../shared/components/';

const ProfileComponent: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsUserLoading);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  if (isLoading || !user) {
    return (
      <div>Loading...</div>
    );
  }
  return (
    <>
      <MyNavbar />
      <Card sx={{ maxWidth: 345, mx: 'auto' }}>
        <CardMedia
          component="img"
          image={ user.avatar ?? '' }
          alt={`${user.firstName} avatar`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export const Profile = memo(ProfileComponent);
