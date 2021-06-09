import { Box, Button, Flex, Stat, StatHelpText, StatLabel, StatNumber, TableCaption, Td, Tfoot, Tr } from '@chakra-ui/react';
import { Cart, useDeleteCartMutation } from '@multi-cart/react-data-access';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import React from 'react';
import './EditCartTableFooter.module.scss';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface EditCartTableFooterProps {
  cart: Cart
}

export function EditCartTableFooter({ cart }: EditCartTableFooterProps) {
  const router = useRouter();
  const [, deleteCart] = useDeleteCartMutation();

  return (
    <>
      <TableCaption>
        Prices are estimates and subject to change
            <Button
          ml={2}
          size="sm"
          onClick={async () => {
            if (cart?.id) {
              const response = await deleteCart({
                id: cart.id
              });
              if (response.data?.deleteCart === true) {
                router.push("/dashboard");
              }
            }
          }}>
          <strong>Delete</strong> Cart
              </Button>
      </TableCaption>
      <Tfoot>
        <Tr>
          <Td
            align="right"
            colSpan={28}>
            <Flex
              justifyContent="flex-end"
              mr={{ base: -3, md: -3, xl: "75px" }}>
              <Box>
                <Stat align="right">
                  <StatLabel>Total:</StatLabel>
                  <StatNumber>{toFriendlyCurrency(sumTotalCost(cart))}</StatNumber>
                  <StatHelpText fontWeight="hairline">not including shipping</StatHelpText>
                </Stat>
              </Box>
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </>
  );
}

export default EditCartTableFooter;
