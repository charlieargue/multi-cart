import { Box, Fade, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import * as React from 'react';

export const CartSkeletons = () => {
  return (
    <Fade in={true}>
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white" mt={8}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box padding="6" boxShadow="lg" bg="white" mt={8}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </Fade>
  );
};

export default CartSkeletons;
