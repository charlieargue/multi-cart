import { Box, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import Logo from '../logo/Logo';
import { Drawer } from './Drawer';

export default {
  component: Drawer,
  title: 'Drawer',
};

export const withNavBar: React.FC<null>  = () => {
  
  return <Drawer
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
      
  </Drawer>;
};
