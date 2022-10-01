import {
  AnimeSort,
  AnimeSortField,
  AnimeSortDirection,
} from '@js-camp/core/models/anime/anime';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC, memo } from 'react';

import styles from './Sort.module.css';

interface SortProps {

  /** Title in english. */
  readonly sort: AnimeSort;

  /** Title in japanese. */
  readonly setSort: (sort: AnimeSort) => void;
}

const SortComponent: FC<SortProps> = ({ sort, setSort }) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    setSort({ ...sort, field: event.target.value as AnimeSortField });
  };

  const handleDirectionChange = (event: SelectChangeEvent) => {
    setSort({
      ...sort,
      direction: event.target.value as AnimeSortDirection,
    });
  };

  return (
    <>
      <FormControl className={styles['sort-item']}>
        <InputLabel id="field-label">Field</InputLabel>
        <Select
          labelId="field-label"
          label="Field"
          color="secondary"
          value={sort.field}
          onChange={handleSortChange}
        >
          <MenuItem value={AnimeSortField.None}>
            None
          </MenuItem>
          <MenuItem value={AnimeSortField.EnglishTitle}>
            English Title
          </MenuItem>
          <MenuItem value={AnimeSortField.Status}>
            Status
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={styles['sort-item']}>
        <InputLabel id="direction-label">Direction</InputLabel>
        <Select
          labelId="direction-label"
          label="Direction"
          color="secondary"
          value={sort.direction}
          onChange={handleDirectionChange}
          {...(sort.field === AnimeSortField.None ?
            { disabled: true } :
            {})}
        >
          {Object.entries(AnimeSortDirection).map(([direction, value]) => (
            <MenuItem value={value} key={value}>
              {direction}
            </MenuItem>
          ))}
          ;
        </Select>
      </FormControl>
    </>
  );
};

export const Sort = memo(SortComponent);
