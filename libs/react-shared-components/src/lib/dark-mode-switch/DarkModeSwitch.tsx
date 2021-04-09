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
      position="fixed"
      bottom="2rem"
      right="8rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );

}

export default DarkModeSwitch;
