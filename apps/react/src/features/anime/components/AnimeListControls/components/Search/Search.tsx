import { FC, memo, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface SearchProps {

  /** Set search value callback. */
  readonly setSearchValue: (searchValue: string) => void;
}

const SearchComponent: FC<SearchProps> = ({ setSearchValue }) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
      />
    </>
  );
};

export const Search = memo(SearchComponent);
