// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################

import { Alert, AlertIcon, Box, Table, Tbody, Td, Tr, Wrap, WrapItem } from '@chakra-ui/react';
import { Cart, CartLine } from '@multi-cart/react-data-access';
import { Sort } from '@multi-cart/react-ui';
import * as React from 'react';
import LineAccount from '../../line-account/line-account/LineAccount';
import LineAccountsContainer from '../../line-account/line-accounts-container/LineAccountsContainer';
import CartLineRow from '../cart-line-row/CartLineRow';
import EditCartTableFooter from '../edit-cart-table-footer/EditCartTableFooter';
import EditCartTableHeader from '../edit-cart-table-header/EditCartTableHeader';

export interface EditCartTableProps {
  cart: Cart;
}

export const EditCartTable = ({ cart }: EditCartTableProps) => {
  // todo: make these all components (separate files atleast)
  const emptyCartTableBody = (
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
            {cart.cartLines?.map((line, idx) =>
              !line ? null : (
                <CartLineRow key={line.id} line={line} idx={idx}>
                  {/* 💥 WARNING: this line causes ORDER-of-HOOKS ERROR: bg={mode('white', 'gray.700')} on <Box> 
          TODO: when doing dark mode, put this elswhere, maybe on Tbody? TBD
          */}
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    p={3}
                    rounded={{ md: 'lg' }}
                    shadow="base"
                    mt={2}
                    mb={20}
                  >
                    <Wrap spacing="5" align="center">
                      <WrapItem>
                        {/* TODO: poorly named, does not actually contain line accounts! perhaps LineAccountsHeader??? */}
                        <LineAccountsContainer line={line} />
                      </WrapItem>
                      <Sort by="createdAt" childType="cla">
                        {(line as CartLine)?.cartLineAccounts?.map((cla) =>
                          !cla ? null : (
                            <WrapItem key={cla.id}>
                              <LineAccount lineAccount={cla} line={line} />
                            </WrapItem>
                          )
                        )}
                      </Sort>
                    </Wrap>
                  </Box>
                </CartLineRow>
              )
            )}
          </Sort>
        </Tbody>
      ) : (
        emptyCartTableBody
      )}

      {/* FOOTER */}
      <EditCartTableFooter cart={cart} />
    </Table>
  );
};

export default EditCartTable;
