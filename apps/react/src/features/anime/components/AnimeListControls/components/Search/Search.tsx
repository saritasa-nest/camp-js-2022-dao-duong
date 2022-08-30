import { FC, memo, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface SearchProps {

  /** Search value. */
  readonly searchValue: string;

  /** Set search value callback. */
  readonly setSearchValue: (searchValue: string) => void;
}

const SearchComponent: FC<SearchProps> = ({ searchValue, setSearchValue }) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      color="secondary"
      onChange={handleSearchChange}
      value={searchValue}
    />
  );
};

export const Search = memo(SearchComponent);
