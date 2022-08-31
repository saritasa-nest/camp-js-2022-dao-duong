import { Typography } from '@mui/material';
import { FC, memo } from 'react';

interface TitlesProps {

  /** Title in english. */
  readonly englishTitle: string;

  /** Title in japanese. */
  readonly japaneseTitle: string;
}

const TitlesComponent: FC<TitlesProps> = ({ englishTitle, japaneseTitle }) => (
  <>
    <Typography variant="subtitle1">{englishTitle || '--'}</Typography>
    <Typography variant="subtitle2">{japaneseTitle || '--'}</Typography>
  </>
);

export const Titles = memo(TitlesComponent);
