import { FC, memo } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import { AnimeType } from '@js-camp/core/models/anime';

interface TypeProps {

  /** Filter type value. */
  readonly type: readonly AnimeType[];

  /** Set filter type value callback. */
  readonly setType: (type: readonly AnimeType[]) => void;
}

/**
 *
 * @param type Current type value.
 * @param filterType Selected type array.
 * @param theme Theme for mui.
 */
function getStyles(
  type: AnimeType,
  filterType: readonly AnimeType[],
  theme: Theme,
) {
  return {
    fontWeight: filterType.includes(type) ?
      theme.typography.fontWeightMedium :
      theme.typography.fontWeightRegular,
  };
}

const TypeComponent: FC<TypeProps> = ({ type, setType }) => {
  const theme = useTheme();
  const handleTypeChange = (event: SelectChangeEvent<typeof type>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== 'string') {
      setType(value);
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          multiple
          value={type}
          onChange={handleTypeChange}
          input={<OutlinedInput color="secondary" label="Type" />}
        >
          {Object.entries(AnimeType).map(([displayType, value]) => (
            <MenuItem
              value={value}
              key={value}
              style={getStyles(value, type, theme)}
            >
              {displayType}
            </MenuItem>
          ))}
          ;
        </Select>
      </FormControl>
    </>
  );
};
export const Type = memo(TypeComponent);
