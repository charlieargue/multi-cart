// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import './DarkModeSwitch.module.scss';
import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react'


/* eslint-disable-next-line */
export interface DarkModeSwitchProps { }

export function DarkModeSwitch(props: DarkModeSwitchProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Switch
      data-testid="darkModeSwitch"
      position="fixed"
      bottom="5rem"
      right="1.5rem"
      colorScheme="pink"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );

}

export default DarkModeSwitch;
