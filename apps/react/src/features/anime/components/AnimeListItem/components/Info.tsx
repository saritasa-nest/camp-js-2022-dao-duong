import { FC, memo } from 'react';
import { Typography } from '@mui/material';
import { AnimeStatus, AnimeType } from '@js-camp/core/models/anime/anime';

interface Props {

  /** Anime status. */
  readonly status: AnimeStatus;

  /** Anime type. */
  readonly type: AnimeType;
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
