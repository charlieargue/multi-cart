// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { TextMuted } from '@multi-cart/react-ui';
import React from 'react';
import './FilterableAccountTable.module.scss';

export interface FilterableAccountTableProps {
  children?: React.ReactNode;
}

export function FilterableAccountTable({ children }: FilterableAccountTableProps) {
  return (
    <Table
      variant="simple"
      colorScheme="gray">
      <Thead>
        <Tr>
          <Th><TextMuted style={{ "textAlign": "left" }}>Account #</TextMuted></Th>
          <Th><TextMuted style={{ "textAlign": "left" }}>Name</TextMuted></Th>
          <Th><TextMuted style={{ "textAlign": "left" }}>Amount Remaining</TextMuted></Th>
        </Tr>
      </Thead>
      <Tbody>
        {children}
      </Tbody>
    </Table>
  );
}

export default FilterableAccountTable;
