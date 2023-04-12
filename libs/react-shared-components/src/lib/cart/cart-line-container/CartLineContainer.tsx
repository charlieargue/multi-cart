// ##################################################################################
// ℹ️ NOT READY YET or NOT MY CODE (chakra templates) ----- please ignore this file, thanks!
// ##################################################################################
import { Box, Td, Tr, Wrap, WrapItem } from '@chakra-ui/react';
import {
  CartLine
} from '@multi-cart/react-data-access';
import { Sort } from '@multi-cart/react-ui';
import React from 'react';
import LineAccount from '../../line-account/line-account/LineAccount';
import LineAccountsContainer from '../../line-account/line-accounts-container/LineAccountsContainer';
import CartLineForm from '../cart-line-form/CartLineForm';

export interface CartLineContainerProps {
  line: CartLine;
  idx: number;
  children?: React.ReactNode;
}

export const CartLineContainer = ({
  line,
  children,
  idx,
}: CartLineContainerProps) => {
  if (!line) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CartLineForm idx={idx} line={line} />
      <Tr>
        <Td colSpan={20}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={3}
            rounded={{
              md: 'lg',
            }}
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
                {line?.cartLineAccounts?.map((cla) =>
                  !cla ? null : (
                    <WrapItem key={cla.id}>
                      <LineAccount lineAccount={cla} line={line} />
                    </WrapItem>
                  )
                )}
              </Sort>
            </Wrap>
          </Box>
        </Td>
      </Tr>
    </>
  );
};

export default CartLineContainer;
