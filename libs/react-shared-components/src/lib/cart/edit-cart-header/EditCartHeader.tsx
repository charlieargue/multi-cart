import { Badge, Box, Button, Flex, HStack } from '@chakra-ui/react';
import { Cart, useBlankCartLineMutation } from '@multi-cart/react-data-access';
import { toDaysAgo } from '@multi-cart/util';
import React from 'react';
import { ImPlus as PlusIcon } from 'react-icons/im';
import CartNameEditable from '../cart-name-editable/CartNameEditable';
import './EditCartHeader.module.scss';

export interface EditCartHeaderProps {
  cart: Cart
}

export function EditCartHeader({ cart }: EditCartHeaderProps) {
  const [, blankCartLine] = useBlankCartLineMutation();

  // 🛍 cart header
  return (
    <Flex
      justify="space-between"
      py={6}>
      <HStack spacing="5">
        <CartNameEditable name={cart?.name} id={cart?.id} />
        <Badge colorScheme="pink" style={{ "opacity": ".5" }}>
          <strong>created </strong> {toDaysAgo(cart?.createdAt)}
        </Badge>
      </HStack>
      <Box className="text-right">
        <Button
          data-testid="btnAddCartLine"
          size="sm"
          colorScheme="green"
          onClick={() => blankCartLine({ cartId: cart?.id })}>
          <PlusIcon />
          &nbsp;Add&nbsp;<strong>line</strong>
        </Button>
      </Box>
    </Flex >
  );
}

export default EditCartHeader;
