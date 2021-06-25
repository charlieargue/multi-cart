
import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
import FilterableAccountTable from './FilterableAccountTable';

export default {
  component: FilterableAccountTable,
  title: 'FilterableAccountTable',
};

export const primary = () => {
  return <FilterableAccountTable>
    <Tr>
      <Td>1232</Td>
      <Td>Sample</Td>
      <Td>$300</Td>
    </Tr>
  </FilterableAccountTable>;
};
