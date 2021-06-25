import { Box, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { LineAccount, LineAccountProps } from './LineAccount';

export default {
  component: LineAccount,
  title: 'LineAccount',
};

export const primary = () => {
  const props: LineAccountProps = {
    line: { "id": "38a17101-0a28-4437-bd6f-83cd8bac2dfa", "cartId": "32fce68b-865d-48ea-b5c0-9935f01b5cf1", "itemId": "", "description": "", "categoryId": "1", "uom": "EACH", "quantity": 2, "price": 0.75, "cartLineAccounts": [{ "id": "9e3bb49d-beeb-4674-9703-24cc046065e2", "amount": 1.5, "accountNumber": "36987-1018", "cartLineId": "38a17101-0a28-4437-bd6f-83cd8bac2dfa", "createdAt": "2021-06-25T07:27:46.491Z", "updatedAt": "2021-06-25T07:27:46.491Z", "__typename": "CartLineAccount" }], "createdAt": "2021-06-25T04:46:31.285Z", "updatedAt": "2021-06-25T04:46:31.285Z", "__typename": "CartLine" },
    lineAccount: { "id": "9e3bb49d-beeb-4674-9703-24cc046065e2", "amount": 1.5, "accountNumber": "36987-1018", "cartLineId": "38a17101-0a28-4437-bd6f-83cd8bac2dfa", "createdAt": "2021-06-25T07:27:46.491Z", "updatedAt": "2021-06-25T07:27:46.491Z", "__typename": "CartLineAccount" }
  };

  return <Box
    borderWidth="1px"
    borderRadius="lg"
    p={3}
    rounded={{ md: 'lg' }}
    shadow="base"
    mt={2}
    mb={20}>
    <Wrap spacing="5" align="center">
      <WrapItem>
        <LineAccount line={props.line} lineAccount={props.lineAccount} />
      </WrapItem>
    </Wrap>
  </Box>;
};
