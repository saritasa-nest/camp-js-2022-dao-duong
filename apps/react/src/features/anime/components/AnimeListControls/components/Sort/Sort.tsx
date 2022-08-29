import {
  AnimeSort,
  AnimeSortField,
  AnimeSortDirection,
} from '@js-camp/core/models/anime/anime';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, memo } from 'react';

interface SortProps {

  /** Title in english. */
  readonly sortValue: AnimeSort;

  /** Title in japanese. */
  readonly setSortValue: (sortValue: AnimeSort) => void;
}

const SortComponent: FC<SortProps> = ({ sortValue, setSortValue }) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortValue({ ...sortValue, field: event.target.value as AnimeSortField });
  };

  const handleDirectionChange = (event: SelectChangeEvent) => {
    setSortValue({ ...sortValue, direction: event.target.value as AnimeSortDirection });

  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120, flex: '1' }}>
        <InputLabel id="field-label">Field</InputLabel>
        <Select labelId="field-label" label="Field" value={sortValue.field} onChange={handleSortChange}>
          {Object.entries(AnimeSortField).map(([field, value]) => (
            <MenuItem value={value} key={value}>
              {field}
            </MenuItem>
          ))}
        ;
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, flex: '1' }}>
        <InputLabel id="direction-label">Direction</InputLabel>
        <Select
          labelId="direction-label"
          label="Direction"
          value={sortValue.direction}
          onChange={handleDirectionChange}
          {...(sortValue.field === AnimeSortField.None ? { disabled: true } : {})}
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
