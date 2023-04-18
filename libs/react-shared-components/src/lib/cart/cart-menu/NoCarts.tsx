import { HStack } from '@chakra-ui/react';
import * as React from 'react';
import { RiErrorWarningFill as WarningIcon } from 'react-icons/ri';

export const NoCart = () => {
  return (
    <HStack direction="row" mr={4} spacing={1}>
      <WarningIcon />
      <span>You have no carts!</span>
    </HStack>
  );
};

export default NoCart;
