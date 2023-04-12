// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { CgChevronDown as ChevronDownIcon } from 'react-icons/cg';
import './UOMDropDown.module.scss';

/* eslint-disable-next-line */
export interface UOMDropDownProps {
}

export function UOMDropDown(props: UOMDropDownProps) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        UOMs
    </MenuButton>
      <MenuList>
        <MenuItem>Each</MenuItem>
        <MenuItem>Case</MenuItem>
        <MenuItem>Box</MenuItem>
        <MenuItem>Service</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UOMDropDown;
