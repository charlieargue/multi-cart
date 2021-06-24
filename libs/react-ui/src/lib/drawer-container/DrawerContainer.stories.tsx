import { Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Logo from '../logo/Logo';
import { DrawerContainer } from './DrawerContainer';

export default {
  component: DrawerContainer,
  title: 'DrawerContainer',
};

export const withNavBar: React.FC<null>  = () => {
  
  return <DrawerContainer
      placement="left"
      size="xs"
      isOpen={true}
      onClose={null}
      showCloseButton={true}
      drawerHeader={
          <Box
              ml="-20"
              mb="-5"
              textAlign="left">
              <Logo clickHandler={null} />
          </Box>
      }>
      
  </DrawerContainer>;
};
