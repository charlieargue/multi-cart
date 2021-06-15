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
        <MenuItem isDisabled>Each</MenuItem>
        <MenuItem isDisabled>Case</MenuItem>
        <MenuItem isDisabled>Box</MenuItem>
        <MenuItem isDisabled>Service</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UOMDropDown;
