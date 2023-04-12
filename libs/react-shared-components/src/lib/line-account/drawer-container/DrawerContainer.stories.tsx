import { Box } from '@chakra-ui/react';
import React from 'react';
import { DrawerContainer } from './DrawerContainer';

export default {
  component: DrawerContainer,
  title: 'DrawerContainer',
};

export const withNavBar: React.FC<null> = () => {
  // TODO:
  return (
    <DrawerContainer
      line={line}
      btnRef={btnRef}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
