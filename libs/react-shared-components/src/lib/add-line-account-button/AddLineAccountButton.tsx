import { Button } from '@chakra-ui/react';
import React from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';
import './AddLineAccountButton.module.scss';

/* eslint-disable-next-line */
export interface AddLineAccountButtonProps {
  btnRef: React.MutableRefObject<undefined>
  clickHandler()
}

export function AddLineAccountButton(props: AddLineAccountButtonProps) {
  return (
    <Button
          ref={props.btnRef}
          onClick={props.clickHandler}
          size="xs"
          colorScheme="green">
          <PlusIcon />
              &nbsp;Add&nbsp;<strong>account</strong>
        </Button>
  );
}

export default AddLineAccountButton;
