import { Box, Button, Flex, Stat, StatHelpText, StatLabel, StatNumber, TableCaption, Td, Tfoot, Tr } from '@chakra-ui/react';
import { actionIsDeletingCart, store } from '@multi-cart/react-app-state';
import { Cart, useDeleteCartMutation, useUpdateUserMutation } from '@multi-cart/react-data-access';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import { useRouter } from 'next/router';
import React from 'react';
import useMyToasts from '../../_hooks/useMyToasts';
import './EditCartTableFooter.module.scss';

export interface EditCartTableFooterProps {
  cart: Cart
}

export function EditCartTableFooter({ cart }: EditCartTableFooterProps) {
  const router = useRouter();
  const [, deleteCart] = useDeleteCartMutation();
  const [, updateUser] = useUpdateUserMutation();
  const { toastInfo, toastError } = useMyToasts();

  return (
    <>
      <TableCaption>
        Prices are estimates and subject to change
            <Button
            data-testid="btnDeleteCart"
          ml={2}
          size="sm"
          onClick={async () => {
            if (cart?.id) {
              // TODO: hacky, do we need a setDeleting and unsetDeleting instead of just toggle? or ok... TBD
              store.dispatch(actionIsDeletingCart); // TOGGLE ON
              try {
                const response = await deleteCart({
                  id: cart.id
                });
                if (response.data?.deleteCart === true) {
                  // and update so NO current cart for this user
                  const { error, data: updatedUser } = await updateUser({ currentCartId: "" }); // VIP: empty string, just like on iac-side
                  if (!error && updatedUser?.updateUser?.user?.currentCartId === "") {
                    toastInfo("Deleted!");
                    router.push("/dashboard");
                  } else if (error) {
                    toastError(error.message);
                  }
                }
              } finally {
                setTimeout(() => store.dispatch(actionIsDeletingCart), 2000);  // TOGGLE OFF (with delay)
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
