import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';

export interface AddLineAccountButtonProps {
  btnRef: React.MutableRefObject<undefined>;
  clickHandler(): void | React.MouseEventHandler<HTMLButtonElement>;
}

export const AddLineAccountButton = ({
  btnRef,
  clickHandler,
}: AddLineAccountButtonProps) => {
  return (
    <Button
      colorScheme="green"
      data-testid="btnAddLineAccount"
      onClick={clickHandler}
      ref={btnRef}
      size="xs"
    >
      <PlusIcon />
      <Box p={1}>Add account</Box>
    </Button>
  );
};

export default AddLineAccountButton;
