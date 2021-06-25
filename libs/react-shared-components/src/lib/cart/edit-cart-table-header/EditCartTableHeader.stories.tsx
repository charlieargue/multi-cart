import React from 'react';
import { Table } from '@chakra-ui/react';
import EditCartTableHeader from './EditCartTableHeader';

export default {
  component: EditCartTableHeader,
  title: 'EditCartTableHeader',
};

export const primary = () => {




  return <Table variant="simple" colorScheme="pink" id="cart-table" size="lg" marginBottom={10}>
    <EditCartTableHeader />
  </Table>;
};
