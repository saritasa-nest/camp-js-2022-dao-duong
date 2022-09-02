import { FC, memo } from 'react';
import { Typography } from '@mui/material';

interface Props {

  /** Anime status. */
  readonly status: string;

  /** Anime type. */
  readonly type: string;
}

const AnimeInfoComponent: FC<Props> = ({ status, type }) => (
  <>
    <Typography
      component="span"
      variant="body2"
      color="text.primary"
    >
      Type: {type}
    </Typography>
    <Typography
      component="span"
      variant="body2"
      color="text.primary"
    >
      Status: {status}
    </Typography>
  </>
);

export const Info = memo(AnimeInfoComponent);
