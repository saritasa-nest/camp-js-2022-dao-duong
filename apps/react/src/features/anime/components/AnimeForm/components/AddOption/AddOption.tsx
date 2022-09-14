import { Button } from '@mui/material';
import { FC, memo } from 'react';

interface Props {

  /** Option value. */
  readonly newOption: string;

  /** Add option handler. */
  readonly addOption: (value: string) => void;
}

const AddOptionComponent: FC<Props> = ({ newOption, addOption }) => {
  const onAddButtonClick = () => {
    addOption(newOption);
  };

  return (
    <Button onClick={onAddButtonClick}>
      <span>Add option: {newOption}</span>
    </Button>
  );
};

export const AddOption = memo(AddOptionComponent);
