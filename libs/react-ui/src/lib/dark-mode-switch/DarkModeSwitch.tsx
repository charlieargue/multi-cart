import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Switch
      data-testid="darkModeSwitch"
      position="fixed"
      bottom="1.5rem"
      right="1.5rem"
      colorScheme="pink"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};

export default DarkModeSwitch;
