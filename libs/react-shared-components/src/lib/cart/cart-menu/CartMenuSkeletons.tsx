import {
  Box,
  Flex,
  HStack,
  MenuDivider,
  MenuItem,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import * as React from 'react';

export const CartMenuSkeletons = () => {
  const CartSkeleton = (idx: string) => {
    return (
      <MenuItem key={idx}>
        <Flex minW="100%" justify="space-between">
          <HStack width="100%" spacing="4">
            <Box width="80%">
              <SkeletonText noOfLines={2} />
            </Box>
            <Box>
              <SkeletonCircle size="10" />
            </Box>
          </HStack>
        </Flex>
        <MenuDivider />
      </MenuItem>
    );
  };
  return <>{
    [1, 2, 3, 4].map((idx) => CartSkeleton(idx.toString()))}</>
  };

export default CartMenuSkeletons;
