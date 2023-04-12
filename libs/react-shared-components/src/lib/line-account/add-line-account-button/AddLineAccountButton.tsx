import { Button } from '@chakra-ui/react';
import React from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';

export interface AddLineAccountButtonProps {
  btnRef: React.MutableRefObject<undefined>
  clickHandler(): void | React.MouseEventHandler<HTMLButtonElement>;
}

export function AddLineAccountButton(props: AddLineAccountButtonProps) {
  return (
    <Button
      colorScheme="green"
      data-testid="btnAddLineAccount"
      onClick={props.clickHandler}
      ref={props.btnRef}
      size="xs">
        <PlusIcon />
        &nbsp;Add&nbsp;<strong>account</strong>
    </Button>
  );
}

export default AddLineAccountButton;
