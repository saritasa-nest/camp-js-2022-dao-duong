import { FC, memo, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface SearchProps {

  /** Search value. */
  readonly search: string;

  /** Set search value callback. */
  readonly setSearch: (search: string) => void;
}

const SearchComponent: FC<SearchProps> = ({ search, setSearch }) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      color="secondary"
      onChange={handleSearchChange}
      value={search}
    />
  );
};

export const Search = memo(SearchComponent);
