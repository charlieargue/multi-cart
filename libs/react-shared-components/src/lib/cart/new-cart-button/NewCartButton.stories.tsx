import React from 'react';
import { Flex, Table } from '@chakra-ui/react';
import NewCartButton from './NewCartButton';

export default {
  component: NewCartButton,
  title: 'NewCartButton',
};

export const primary = () => {

  return <Flex justifyContent={'flex-end'} px={3} py={2}>
    <NewCartButton className="ml-3 align-baseline" />
  </Flex>;
};
