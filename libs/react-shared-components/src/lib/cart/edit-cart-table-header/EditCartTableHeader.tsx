import {
  Box,
  Thead, Tooltip, Tr, useColorModeValue as mode
} from '@chakra-ui/react';
import React from 'react';
import './EditCartTableHeader.module.scss';

/* eslint-disable-next-line */
export interface EditCartTableHeaderProps {}

export function EditCartTableHeader(props: EditCartTableHeaderProps) {
  return (
    <Thead>

          <Tr
            shadow="sm"
            height="12"
            align="left"
            valign="middle"
            color="gray.500"
            bg={mode("gray.100", "gray.700")}
            borderBottom="1px solid #ddd">
            {/* HACKY: TODO: must be a better way to align */}
            <th><Box ml={7}>#</Box></th>
            <th><Box ml={8}>Item #</Box></th>
            <th><Box ml={8}>Description</Box></th>
            <th><Box ml={8}>Category</Box></th>
            <th>
              <Box ml={8}><Tooltip hasArrow label="Unit of Measurement" bg="gray.300" color="black">
                UOM
            </Tooltip></Box>
            </th>
            <th><Box ml={8}>Quantity</Box></th>
            <th><Box ml={8}>Unit Price</Box></th>
            <th><Box ml={8}>Total</Box></th>
            <th></th>
          </Tr>
        </Thead>
  );
}

export default EditCartTableHeader;
