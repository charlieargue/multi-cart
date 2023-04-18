import { Alert, AlertIcon, Tbody, Td, Tr } from '@chakra-ui/react';
import * as React from 'react';

export const EmptyCart = () => {
  return (
    <Tbody>
      <Tr>
        <Td colSpan={20}>
          <Alert
            borderRadius="4px"
            variant="left-accent"
            status="info"
            colorScheme="pink"
          >
            <AlertIcon />
            This cart is empty — <strong>please add a line</strong>!
          </Alert>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default EmptyCart;
