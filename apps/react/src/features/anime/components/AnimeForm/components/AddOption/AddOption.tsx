import { Button } from '@mui/material';
import { FC, memo } from 'react';

interface Props {

  /** Option value. */
  readonly newOption: string;

  /** Add option handler. */
  readonly onAddOption: (value: string) => void;
}

const AddOptionComponent: FC<Props> = ({ newOption, onAddOption }) => {
  const onAddButtonClick = () => {
    onAddOption(newOption);
  };

  return (
    <Button onClick={onAddButtonClick}>
      <span>Add option: {newOption}</span>
    </Button>
  );
};

export const AddOption = memo(AddOptionComponent);
