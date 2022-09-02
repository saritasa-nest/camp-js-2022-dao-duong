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
      variant="body2"
      color="text.primary"
    >
      Type: {type}
    </Typography>
    <Typography
      variant="body2"
      color="text.primary"
    >
      Status: {status}
    </Typography>
  </>
);

export const Info = memo(AnimeInfoComponent);
