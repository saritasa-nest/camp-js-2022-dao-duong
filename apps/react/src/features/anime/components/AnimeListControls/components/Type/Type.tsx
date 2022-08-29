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
import { AnimeType } from '@js-camp/core/models/anime/anime';

interface TypeProps {

  /** Filter type value. */
  readonly typeValue: readonly AnimeType[];

  /** Set filter type value callback. */
  readonly setTypeValue: (typeValue: readonly AnimeType[]) => void;
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

const TypeComponent: FC<TypeProps> = ({ typeValue, setTypeValue }) => {
  const theme = useTheme();
  const handleTypeChange = (event: SelectChangeEvent<typeof typeValue>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== 'string') {
      setTypeValue(value);
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          multiple
          value={typeValue}
          onChange={handleTypeChange}
          input={<OutlinedInput color="secondary" label="Type" />}
        >
          {Object.entries(AnimeType).map(([type, value]) => (
            <MenuItem
              value={value}
              key={value}
              style={getStyles(value, typeValue, theme)}
            >
              {type}
            </MenuItem>
          ))}
          ;
        </Select>
      </FormControl>
    </>
  );
};
export const Type = memo(TypeComponent);
