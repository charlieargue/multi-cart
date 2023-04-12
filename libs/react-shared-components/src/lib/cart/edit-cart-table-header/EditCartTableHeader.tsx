import { Box, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react';
import { TooltipMC } from '@multi-cart/react-ui';
import React from 'react';

export const EditCartTableHeader = () => {
  return (
    <Thead>
      <Tr
        shadow="sm"
        height="12"
        color="gray.500"
        bg={mode('gray.100', 'gray.700')}
        borderBottom="1px solid #ddd"
      >
        <th align="left">
          <Box ml={7}>#</Box>
        </th>
        <th align="left">
          <Box ml={8}>Item #</Box>
        </th>
        <th align="left">
          <Box ml={8}>Description</Box>
        </th>
        <th align="left">
          <Box ml={8}>Category</Box>
        </th>
        <th align="left">
          <Box ml={8}>
            <TooltipMC label="Unit of Measurement">UOM</TooltipMC>
          </Box>
        </th>
        <th align="left">
          <Box ml={8}>Quantity</Box>
        </th>
        <th align="left">
          <Box ml={8}>Unit Price</Box>
        </th>
        <th align="left">
          <Box ml={8}>Total</Box>
        </th>
        <th></th>
      </Tr>
    </Thead>
  );
};

export default EditCartTableHeader;
