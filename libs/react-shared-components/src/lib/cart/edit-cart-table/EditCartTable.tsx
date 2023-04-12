import { Table, Tbody } from '@chakra-ui/react';
import { Cart } from '@multi-cart/react-data-access';
import { Sort } from '@multi-cart/react-ui';
import * as React from 'react';
import CartLineContainer from '../cart-line-container/CartLineContainer';
import EditCartTableFooter from '../edit-cart-table-footer/EditCartTableFooter';
import EditCartTableHeader from '../edit-cart-table-header/EditCartTableHeader';
import EmptyCart from './EmptyCart';

export interface EditCartTableProps {
  cart: Cart;
}

export const EditCartTable = ({ cart }: EditCartTableProps) => {
  return (
    <Table
      variant="simple"
      colorScheme="pink"
      id="cart-table"
      size="lg"
      marginBottom={10}
    >
      <EditCartTableHeader />
      {cart?.cartLines?.length ? (
        <Tbody>
          <Sort by="createdAt" childType="line">
            {cart.cartLines?.map((line, idx) => (
              <CartLineContainer key={idx} line={line} idx={idx} />
            ))}
          </Sort>
        </Tbody>
      ) : (
        <EmptyCart />
      )}
      <EditCartTableFooter cart={cart} />
    </Table>
  );
};

export default EditCartTable;
