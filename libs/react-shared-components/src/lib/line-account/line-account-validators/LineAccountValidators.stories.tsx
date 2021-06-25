
import { Box, Flex, Stack } from '@chakra-ui/react';
import { CartLine } from '@multi-cart/react-data-access';
import React, { ReactNode } from 'react';
import LineAccountValidators from './LineAccountValidators';

export default {
  component: LineAccountValidators,
  title: 'LineAccountValidators',
};

const StoryBookWrapper = ({ children, label }: { children: ReactNode; label: string }) => (
  <Flex direction="column" mr={4}>
    <Box>{label}</Box>
    <Box>{children}</Box>
  </Flex>
);


export const primary = () => {
  const lines: CartLine[] = [{
    id: "ab1d457a-2610-4753-8026-754838d79286",
    cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
    categoryId: "1",
    createdAt: "2021-06-25T04:46:26.018Z",
    description: "Line 1",
    itemId: "101",
    price: 1.25,
    quantity: 1,
    uom: "EACH",
    updatedAt: "2021-06-25T04:46:26.018Z",
    cartLineAccounts: [
      {
        id: "9e3bb49d-beeb-4674-9703-24cc046065e2",
        amount: 1,
        accountNumber: "36987-1018",
        cartLineId: "ab1d457a-2610-4753-8026-754838d79286",
        createdAt: "2021-06-25T07:27:46.491Z",
        updatedAt: "2021-06-25T07:27:46.491Z"
      }
    ]
  },
  {
    id: "38a17101-0a28-4437-bd6f-83cd8bac2dfa",
    cartId: "32fce68b-865d-48ea-b5c0-9935f01b5cf1",
    categoryId: "1",
    createdAt: "2021-06-25T04:46:31.285Z",
    description: "Line 2",
    itemId: "102",
    price: 0.75,
    quantity: 1,
    uom: "EACH",
    updatedAt: "2021-06-25T04:46:31.285Z",
    cartLineAccounts: [
      {
        id: "34b49d-beeb-4674-9703-24cc046065e2",
        amount: .25,
        accountNumber: "36987-1018",
        cartLineId: "38a17101-0a28-4437-bd6f-83cd8bac2dfa",
        createdAt: "2021-06-25T07:27:46.491Z",
        updatedAt: "2021-06-25T07:27:46.491Z"
      },
      {
        id: "65b49d-beeb-4674-9703-24cc046065e2",
        amount: .5,
        accountNumber: "36987-1018",
        cartLineId: "38a17101-0a28-4437-bd6f-83cd8bac2dfa",
        createdAt: "2021-06-25T07:27:46.491Z",
        updatedAt: "2021-06-25T07:27:46.491Z"
      }
    ]
  }];

  return <Stack
    direction="row"
    spacing={4}
    align="center"
    mt={1}
    px={4}
    py={3}
    rounded="md"
    shadow="unset">
    <StoryBookWrapper label="Not Valid">
      <LineAccountValidators line={lines[0]} />
    </StoryBookWrapper>
    <StoryBookWrapper label="Valid">
      <LineAccountValidators line={lines[1]} />
    </StoryBookWrapper>
  </Stack>;
};
