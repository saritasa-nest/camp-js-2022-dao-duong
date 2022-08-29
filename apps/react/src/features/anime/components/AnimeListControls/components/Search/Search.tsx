import { FC, memo, ChangeEvent } from 'react';
import { debounce, TextField } from '@mui/material';

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
        onChange={debounce(handleSearchChange, 500)}
      />
    </>
  );
};

export const Search = memo(SearchComponent);
