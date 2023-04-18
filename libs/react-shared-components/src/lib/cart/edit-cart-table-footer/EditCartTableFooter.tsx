import {
  Box,
  Button,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  TableCaption,
  Td,
  Tfoot,
  Tr,
} from '@chakra-ui/react';
import {
  Cart,
  useDeleteCartMutation,
  useUpdateUserMutation,
} from '@multi-cart/react-data-access';
import { sumTotalCost, toFriendlyCurrency } from '@multi-cart/util';
import { useRouter } from 'next/router';
import React from 'react';
import useMyToasts from '../../_hooks/useMyToasts';

export interface EditCartTableFooterProps {
  cart: Cart;
  setIsDeletingCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditCartTableFooter = ({
  cart,
  setIsDeletingCart,
}: EditCartTableFooterProps) => {
  const router = useRouter();
  const [, deleteCart] = useDeleteCartMutation();
  const [, updateUser] = useUpdateUserMutation();
  const { toastInfo, toastError } = useMyToasts();

  const clickHandler = async () => {
    if (cart?.id) {
      if (window.confirm('Are you SURE you want to 🛑 DELETE this cart?')) {
        setIsDeletingCart(true);
        try {
          const response = await deleteCart({
            id: cart.id,
          });
          if (response.data?.deleteCart === true) {
            const { error, data: updatedUser } = await updateUser({
              currentCartId: '',
            });
            if (!error && updatedUser?.updateUser?.user?.currentCartId === '') {
              toastInfo('Deleted!');
              router.push('/dashboard');
            } else if (error) {
              console.log(`🚀  error:`, error);
              toastError(error.message);
            }
          }
        } catch (error) {
          console.log(`🚀  error:`, error);
          toastError(error.message);
        } finally {
          setTimeout(() => setIsDeletingCart(false), 1500);
        }
      }
    }
  };

  return (
    <>
      <TableCaption>
        Prices are estimates and subject to change.
        <Button
          data-testid="btnDeleteCart"
          ml={2}
          size="sm"
          onClick={clickHandler}
        >
          <strong>Delete</strong> Cart
        </Button>
      </TableCaption>
      <Tfoot>
        <Tr>
          <Td align="right" colSpan={28}>
            <Flex
              justifyContent="flex-end"
              mr={{ base: -3, md: -3, xl: '75px' }}
            >
              <Box textAlign="right">
                <Stat>
                  <StatLabel>Total:</StatLabel>
                  <StatNumber>
                    {toFriendlyCurrency(sumTotalCost(cart))}
                  </StatNumber>
                  <StatHelpText fontWeight="hairline">
                    not including shipping
                  </StatHelpText>
                </Stat>
              </Box>
            </Flex>
          </Td>
        </Tr>
      </Tfoot>
    </>
  );
};

export default EditCartTableFooter;
